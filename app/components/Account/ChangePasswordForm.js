import React, {useState} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';
import * as firebase from 'firebase';
import { reauthenticate } from "../../utils/api";
import { size } from "lodash";

export default function ChangePasswordForm(props) {

    const { setShowModal }= props;
    const [formData, setFormData] = useState(defaultValue());
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const onChange = (e, type) => {
        setFormData({...formData, [type]: e.nativeEvent.text});
    };

    const onSubmit = async () => {
        let isSetErrors = true;
        let errorsTemp = {};
        setError({});

        if(!formData.password || !formData.newPassword || !formData.repeatNewPassword){
            errorsTemp = {
                password: !formData.password ? "La contraseña no puede estar vacia." : "",
                newPassword: !formData.newPassword ? "La contraseña no puede estar vacia." : "",
                repeatNewPassword: !formData.repeatNewPassword ? "La contraseña no puede estar vacia." : "",
            };
        }else if(formData.newPassword !== formData.repeatNewPassword){
            errorsTemp = {
                newPassword: "Las contraseñas no son iguales.",
                repeatNewPassword: "Las contraseñas no son iguales.",
            };
        } else if (size(formData.newPassword) < 6 ){
            errorsTemp = {
                newPassword: "La contraseña debe tener al menos 6 caracteres.",
                repetNewPassword: "La contraseña debe tener al menos 6 caracteres.",
            };
        } else {
            setLoading(true);
            await reauthenticate(formData.password)
            .then(async () => {
                await firebase.auth().currentUser.updatePassword(formData.newPassword)
                .then(() => {
                    isSetErrors = false;
                    setLoading(false);
                    setShowModal(false);
                    firebase.auth().signOut();
                }).catch(() => {
                    errorsTemp = {other: "Error al actualizar la contraseña."};
                    setLoading(false);
                })
            }).catch(() => {
                errorsTemp = {password: "La contraseña no es correcta."};
                setLoading(false);
            })
        }

        isSetErrors && setError(errorsTemp);
    };

    return (
        <View style = {styles.view}>
            <Input 
                placeholder="Contraseña actual"
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
            <Input 
                placeholder="Contraseña nueva"
                containerStyle={styles.input}
                password="true"
                secureTextEntry={showPassword ? false : true}
                rightIcon={{
                    type: "material-community",
                    name: showPassword ? "eye-off-outline" : "eye-outline",
                    color: "#c2c2c2",
                    onPress: () => setShowPassword(!showPassword)
                }}
                onChange={ (e) => onChange(e, "newPassword")}
                errorMessage={error.newPassword}
            />
            <Input 
                placeholder="Repetir nueva contraseña"
                containerStyle={styles.input}
                password="true"
                secureTextEntry={showPassword ? false : true}
                rightIcon={{
                    type: "material-community",
                    name: showPassword ? "eye-off-outline" : "eye-outline",
                    color: "#c2c2c2",
                    onPress: () => setShowPassword(!showPassword)
                }}
                onChange={ (e) => onChange(e, "repeatNewPassword")}
                errorMessage={error.repeatNewPassword}
            />
            <Button 
                title="Cambiar Contraseña"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={loading}
            />
            <Text>{error.other}</Text>
        </View>
    );
}

function defaultValue(){
    return {
        password: "",
        newPassword: "",
        repeatNewPassword: ""
    }
}

const styles = StyleSheet.create({
    view: {
        alignItems: "center",
        paddingTop: 10,
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