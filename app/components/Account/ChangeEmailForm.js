import React, {useState} from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { validateEmail } from "../../utils/validations";
import { reauthenticate } from "../../utils/api";
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

export default function ChangeEmailForm(props) {
    const { email, setShowModal, toastRef, setReloadUserInfo }= props;
    const [formData, setFormData] = useState(defaultValue());
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const onChange = (e, type) => {
        setFormData({...formData, [type]: e.nativeEvent.text});
    };

    const onSubmit = () => {
        setError({});
        if(!formData.email || email === formData.email){
            setError({
                email: "El Email no ha cambiado."
            })
        }else if(!validateEmail(formData.email)){
            setError({
                email: "Email incorrecto!"
            });
        } else if (!formData.password){
            setError({
                password: "La contraseña no puede estar vacia.",
            });
        } else {
            setLoading(true);
            reauthenticate(formData.password)
            .then(response => {
                firebase.auth().currentUser.updateEmail(formData.email)
                .then(() => {
                    setLoading(false);
                    setReloadUserInfo(true);
                    toastRef.current.show("Email actualizado correctamente!");
                    setShowModal(false);
                    
                    db.collection("users")
                    .doc(firebase.auth().currentUser.uid)
                    .update({
                        email: formData.email
                    })
                    .then(() => {
                        setLoading(false);
                    })
                    .catch(() => {
                        setLoading(false);
                    });
                }).catch(() => {
                    setError({email: "Error al actualizar el Email."});
                    setLoading(false);
                })
            }).catch(() => {
                setLoading(false);
                setError({password: "La contraseña no es correcta."});
            })
        }
    };

    return (
        <View style = {styles.view}>
            <Input 
                placeholder="Email"
                containerStyle={styles.input}
                rightIcon= {{
                    type: "material-community",
                    name: "at",
                    color: "#c2c2c2"
                }}
                defaultValue={ email || ""}
                onChange={ (e) => onChange(e, "email")}
                errorMessage={error.email}
            />
            <Input 
                placeholder="Contraseña"
                containerStyle={styles.input}
                password="true"
                secureTextEntry={showPassword ? false : true}
                rightIcon={{
                    type: "material-community",
                    name: showPassword ? "eye-off-outline" : "eye-outline",
                    color: "#c2c2c2",
                    onPress: () => setShowPassword(!showPassword)
                }}
                onChange={ (e) => onChange(e, "password")}
                errorMessage={error.password}
            />
            <Button 
                title="Cambiar Email"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={loading}
            />
        </View>
    );
}

function defaultValue(){
    return {
        email: "",
        password: ""
    }
}

const styles = StyleSheet.create({
    view: {
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 10,
    },
    input: {
        marginBottom: 10,
    },
    btnContainer: {
        marginTop: 20,
        width: "100%",
    },
    btn: {
        backgroundColor: "#21ACFC",
        borderRadius: 10,
        height: 60,
    }
});