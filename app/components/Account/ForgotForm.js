import React, {useState} from "react";
import {StyleSheet, View} from "react-native";
import {Input, Icon, Button, Text} from "react-native-elements";
import { isEmpty } from "lodash";
import * as firebase from "firebase";
import {validateEmail} from "../../utils/validations";
import Loading from "../Loading";

export default function ForgotForm(props){
    const { toastRef, navigation } = props;
    const [formData, setFormData] = useState(defaultFormValue());
    const [loading,setLoading] = useState(false);

    const onChange = (e, type) => {
        setFormData({ ...formData,  [type]: e.nativeEvent.text });
    }

    const goBack = () => {
        navigation.navigate("login");
    }
    
    const onSubmit = async () => {
        if(isEmpty(formData.email)){
            toastRef.current.show("Por favor, ingresa tu correo electrónico para restablecer tu contraseña.", 3000);
        }else if(!validateEmail(formData.email)){
            toastRef.current.show("Por favor, ingresa una dirección de correo electrónico válida.", 3000);
        }else{
            setLoading(true);
            await firebase.auth().sendPasswordResetEmail(formData.email)
            .then(() => {
                setLoading(false);
                navigation.navigate("login");
                toastRef.current.show("Tu solicitud de restablecimiento de contraseña se ha generado, revisa tu correo.", 3000);
            })
            .catch(() => {
                if(error.code === "auth/user-not-found"){
                    toastRef.current.show("Tu solicitud de restablecimiento de contraseña no pudo ser generada, intenta más tarde.", 3000);
                    setLoading(false);
                }
            });
        }
    }

    return (
        <View style={StyleSheet.formContainer}>
            <Text style={styles.texto}>Un enlace será enviado a tu correo electrónico para poder restablecer tu contraseña.</Text>
            <Input
                placeholder="Correo electrónico"
                containerStyle={styles.inputForm}
                inputStyle={styles.inputLabel}
                onChange={e => onChange(e, "email")}
                rightIcon={
                    <Icon 
                        type="material-community" 
                        name="at"
                        iconStyle={styles.icon}/>
                }/>
            <Button 
                title="Recuperar contraseña"
                containerStyle={styles.btnContainerLogin}
                buttonStyle={styles.btnLogin}
                onPress={onSubmit}/>
            <Text style={styles.texto} onPress={goBack}>Regresar</Text>
            <Loading isVisible={loading} text="Generando solicitud..."/>
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
        marginTop: 30,
    },
    inputForm: {
        width: "100%",
        marginTop: 20,
    },
    inputLabel: {
        color: "#fff"
    },
    btnContainerLogin:{
        marginTop: 50,
        width: "100%",
    },
    btnLogin:{
        backgroundColor: "#21ACFC",
        borderRadius: 10,
        height: 60,
    },
    texto: {
        color: "#fff",
        fontSize: 14,
        marginTop: 40,
        textAlign: 'center',
    },
    cuenta: {
        color: "#2596be",
        fontSize: 14,
        marginTop: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    icon: {
        color: "#c1c1c1"
    }
});