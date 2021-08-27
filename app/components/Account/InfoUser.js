import React from 'react';
import {StyleSheet, View, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import * as firebase from 'firebase';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

export default function InfoUser(props){
    const { 
        userInfo: { uid, photoURL, displayName, email, phone}, 
        toastRef,
        setLoading, setLoadingText,
    } = props;
    const changeAvatar = async () => {
        const resultPermission = await Permissions.askAsync(
            Permissions.CAMERA_ROLL
        );
        const resultPermissionCamera = 
            resultPermission.permissions.cameraRoll.status;
        if(resultPermissionCamera === "denied"){
            toastRef.current.show("Es necesario aceptar los permisos de la galería");
        } else {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3],
            });
            if(result.cancelled){
                toastRef.current.show("Has cerrado la selección de imagenes");
            } else {
                uploadImage(result.uri)
                .then(() => {
                    updatePhotoUrl();
                }).catch (() => {
                    setLoading(false);
                    toastRef.current.show("Error al actualizar el avatar.");
                });
            }
        }
    };

    const uploadImage = async (uri) => {
        setLoadingText("Actualizando Avatar");
        setLoading(true);

        const responser = await fetch(uri);
        const blob = await responser.blob();
        const ref = firebase.storage().ref().child(`avatar/${uid}`);
        
        return ref.put(blob);
    };

    const updatePhotoUrl = () => {
        firebase
            .storage()
            .ref(`avatar/${uid}`)
            .getDownloadURL()
            .then( async (response) => {
                const update = {
                    photoURL: response,
                };
                await firebase.auth().currentUser.updateProfile(update);
                setLoading(false);
            }).catch( () => {
                toastRef.current.show("Error al actualizar el avatar.");
            });
    };

    return (
        <View style={styles.viewUserInfo}>
            <Avatar 
                rounded
                size="large"
                showEditButton
                onEditPress={changeAvatar}
                containerStyle={styles.userInfoAvatar}
                source={
                    photoURL ? { uri: photoURL } : require("../../../assets/userDefault.jpg")
                }
            />
            <View>
                <Text style={styles.displayName}>
                    { displayName ? displayName : "Anónimo"}
                </Text>
                <Text style={styles.displayEmail}>
                    { email ? email : "Social Login"}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    viewUserInfo: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "#21ACFC",
        paddingTop: 20,
        paddingBottom: 20,
    },
    userInfoAvatar: {
        marginRight: 30,
        height: 100,
        width: 100,
    },
    displayName: {
        fontWeight: "bold",
        fontSize: 18,
        paddingBottom: 5, 
        color: "#fff",
    },
    displayEmail: {
        fontSize: 15,
        paddingBottom: 5, 
        color: "#fff",
    }
});