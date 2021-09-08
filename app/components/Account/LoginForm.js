import React, {useState} from "react";
import {StyleSheet, View} from "react-native";
import {Input, Icon, Button, Text} from "react-native-elements";
import { isEmpty } from "lodash";
import {validateEmail} from "../../utils/validations";
import * as firebase from "firebase";
import Loading from "../Loading";
import {useNavigation} from "@react-navigation/native";

export default function LoginForm(props){
    const { toastRef } = props;
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(defaultFormValue());
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);

    const onChange = (e, type) => {
        setFormData({ ...formData,  [type]: e.nativeEvent.text });
    }
    
    const goForgot = () => {
        navigation.navigate("forgot");
    }

    const onSubmit = () => {
        if(isEmpty(formData.email) || isEmpty(formData.password)){
            toastRef.current.show("Todos los campos son obligatorios.");
        }else if(!validateEmail(formData.email)){
            toastRef.current.show("Email no es correcto.");
        }else{
            firebase
            .auth()
            .signInWithEmailAndPassword(formData.email, formData.password)
            .then(() => {
                setLoading(false);
                navigation.navigate("home");
            })
            .catch(() => {
                setLoading(false);
                toastRef.current.show("Email o contraseña incorrecta.");
            });
        }
    }

    return (
        <View style={StyleSheet.formContainer}>
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
                containerStyle={styles.inputForm}
                password="true"
                onChange={e => onChange(e, "password")}
                secureTextEntry={showPassword ? false : true}
                rightIcon={
                    <Icon 
                        type="material-community" 
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={styles.icon}
                        onPress={() => setShowPassword(!showPassword)}/>
                }/>
            <Button 
                title="Iniciar Sesión"
                containerStyle={styles.btnContainerLogin}
                buttonStyle={styles.btnLogin}
                onPress={onSubmit}/>
            {//<Loading loading={loading} text="Iniciando sesión..."/>
            }
            <Text style={styles.texto} onPress={goForgot}>Olvidaste tu contraseña?</Text>
        </View>
    );
}

function defaultFormValue(){
    return {
        email: "",
        password: "",
    };
}

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30
    },
    texto: {
        color: "#000",
        fontSize: 14,
        marginTop: 40,
        textAlign: 'center',
    },
    inputForm: {
        width: "100%",
        marginTop: 30,
    },
    btnContainerLogin:{
        marginTop: 40,
        width: "100%",
    },
    btnLogin:{
        backgroundColor: "#21ACFC",
        borderRadius: 10,
        height: 60,
    },
    icon: {
        color: "#c1c1c1"
    }
});