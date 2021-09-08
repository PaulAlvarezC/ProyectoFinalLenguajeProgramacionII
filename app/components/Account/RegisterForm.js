import React, {useState} from "react";
import {StyleSheet, View} from "react-native";
import {Input, Icon, Button} from "react-native-elements";
import {validateEmail} from "../../utils/validations";
import Loading from "../Loading";
import { size, isEmpty } from "lodash";
import {useNavigation} from "@react-navigation/native";
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

export default function RegisterForm(props){
    const { toastRef } = props;
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const [formData, setFormData] = useState(defaultFormValue);
    const [loading,setLoading] = useState(false);
    const navigation = useNavigation();

    const onSubmit= () => {
        if(isEmpty(formData.email) || isEmpty(formData.password) || isEmpty(formData.repetPassword)){
            toastRef.current.show("Todos los campos son obligatorios.");
        }else if(!validateEmail(formData.email)){
            toastRef.current.show("Email no es correcto.");
        }else if(formData.password !== formData.repetPassword){
            toastRef.current.show("Las contraseñas tienen que ser iguales.");
        }else if(size(formData.password) < 6){
            toastRef.current.show("La contraseña debe tener 6 caracteres.");
        }else{
            setLoading(true);
            firebase
                .auth()
                .createUserWithEmailAndPassword(formData.email, formData.password)
                .then(responser => {
                    setLoading(false);
                    navigation.navigate("home");

                    const data = {
                        idUser: responser.user.uid,
                        name: "",
                        phone: "",
                        email: formData.email,
                        profile: 2,
                        createAt: new Date(),
                    };
                    db.collection("users")
                    .doc(responser.user.uid)
                    .set(data)
                    .then(() => {
                        setLoading(false);
                    })
                    .catch(() => {
                        setLoading(false);
                    });
                })
                .catch(() => {
                    setLoading(false);
                    toastRef.current.show("El email ya esta en uso, pruebe con otro.");
                });
        }
    };

    const onChange = (e, type) => {
        setFormData({ ...formData,  [type]: e.nativeEvent.text });
    }

    return(
        <View style={styles.formContainer}>
            <Input
            placeholder="Correo electrónico"
            containerStyle={styles.inputForm}
            onChange={e => onChange(e, "email")}
            rightIcon={
                <Icon 
                    type="material-community" 
                    name="at"
                    iconStyle={styles.icon}/>
            }/>
            <Input
            placeholder="Contraseña"
            password="true"
            onChange={e => onChange(e, "password")}
            secureTextEntry={showPassword ? false : true}
            containerStyle={styles.inputForm}
            rightIcon={
                <Icon 
                    type="material-community" 
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    iconStyle={styles.icon}
                    onPress={() => setShowPassword(!showPassword)}/>
            }/>
            <Input
            placeholder="Repetir contraseña"
            password="true"
            onChange={e => onChange(e, "repetPassword")}
            secureTextEntry={showRepeatPassword ? false : true}
            containerStyle={styles.inputForm}
            rightIcon={
                <Icon 
                    type="material-community" 
                    name={showRepeatPassword ? "eye-off-outline" : "eye-outline"}
                    iconStyle={styles.icon}
                    onPress={() => setShowRepeatPassword(!showRepeatPassword)}/>
            }/>
            <Button
            title="Registrar"
            buttonStyle={styles.btnRegister}
            containerStyle={styles.btnContainserRegister}
            onPress={onSubmit}/>
            <Loading isVisible={loading} text="La cuenta se esta validando..."/>
        </View>
    );
}

function defaultFormValue(){
    return {
        email: "",
        password: "",
        repetPassword: "",
    };
}

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
    },
    inputForm: {
        width: "100%",
        marginTop: 20,
    },
    btnContainserRegister: {
        marginTop: 30,
        width: "100%"
    },
    btnRegister: {
        backgroundColor: "#21ACFC",
        borderRadius: 10,
        height: 60,
    },
    icon: {
        color: "#c1c1c1"
    }
});