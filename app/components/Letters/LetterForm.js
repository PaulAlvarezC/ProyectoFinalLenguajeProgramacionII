import React, { useState } from "react";
import { StyleSheet, View, Dimensions, Alert } from "react-native";
import *  as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { Input, Icon, Button, Avatar, Image } from "react-native-elements";
import { fullDate } from "../../utils/validations";
import Loading from "../Loading";
import uuid from "random-uuid-v4";
import { size, isEmpty, map, filter } from "lodash";
import { useNavigation } from "@react-navigation/native";
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);
const widthScreen = Dimensions.get("window").width;

export default function LetterForm(props) {
    const { toastRef } = props;
    const [imagesSelected, setImagesSelected] = useState([]);

    const [formData, setFormData] = useState(defaultFormValue);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const onSubmit = () => {
        if (isEmpty(formData.name) || isEmpty(formData.description)) {
            toastRef.current.show("Todos los campos son obligatorios.");
        } else if(size(imagesSelected) === 0){
            toastRef.current.show("El evento debe tener una imagen.");
        } else {
            setLoading(true);
            uploadImageStorage().then(response => {
                db.collection("event")
                .add({
                    name: formData.name,
                    description: formData.description,
                    image: response,
                    createAt: fullDate(),
                    createBy: firebase.auth().currentUser.uid,
                })
                .then(() => {
                    setLoading(false);
                    navigation.navigate("home");
                })
                .catch(() => {
                    setIsLoading(false);
                    toastRef.current.show("Error al crear el evento, inténtalo mas tarde.");
                });
            });
        }
    };

    const uploadImageStorage = async () => {
        const imageBlob = [];

        await Promise.all(
            map(imagesSelected, async (image) => {
                const response = await fetch(image);
                const blob = await response.blob();
                const ref = firebase.storage().ref("event").child(uuid());
                await ref.put(blob).then(async(result) => {
                    await firebase
                        .storage().ref(`event/${result.metadata.name}`)
                        .getDownloadURL()
                        .then((photoUrl) => {
                            imageBlob.push(photoUrl);
                        });
                });
            })
        );
        return imageBlob;
    }

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text });
    }

    return (
        <View style={styles.formContainer}>
            <Input
                placeholder="Nombre"
                containerStyle={styles.inputForm}
                onChange={e => onChange(e, "name")}
                rightIcon={
                    <Icon
                        type="material-community"
                        name="at"
                        iconStyle={styles.icon} />
                } />
            <Input
                placeholder="Descripción"
                containerStyle={styles.inputForm}
                onChange={e => onChange(e, "description")}
                rightIcon={
                    <Icon
                        type="material-community"
                        name="at"
                        iconStyle={styles.icon} />
                } />
            <ImageProduct imageProduct = { imagesSelected[0]}/>
            <UploadImage
                toastRef={toastRef}
                imagesSelected={imagesSelected}
                setImagesSelected={setImagesSelected} />

            <Button
                title="Crear Evento"
                buttonStyle={styles.btnRegister}
                containerStyle={styles.btnContainserRegister}
                onPress={onSubmit} />
            <Loading isVisible={loading} text="La cuenta se esta validando..." />
        </View>
    );
}

function ImageProduct(props){
    const { imageProduct } = props;

    return (
        <View style={styles.viewPhoto}>
            <Image 
                source={ imageProduct ? {uri: imageProduct} : require("../../../assets/no-image.png")}
                style={{ width: widthScreen, height: 200 }}
            />
        </View>
    );
}

function UploadImage(props){
    const {toastRef, imagesSelected, setImagesSelected} = props;

    const imageSelect = async () => {
        const resultPermissions = await Permissions.askAsync(
            Permissions.CAMERA_ROLL
        );

        if(resultPermissions === "denied"){
            toastRef.current.show(
                "Es necesario aceptar los permisos de la galería, si los has rechazado tienes que ir a ajustes de la aplicación y activar los permisos.",
                3000
            );
        }else {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true, 
                aspect: [4, 3],
            });

            if(result.cancelled){
                toastRef.current.show(
                    "Galería cerrada sin seleccionar ninguna imagen.",
                    3000
                );
            }else {
                setImagesSelected([...imagesSelected, result.uri]);
            }
        }
    };

    const removeImage = (image) => {
        Alert.alert(
            "Eliminar Imagen",
            "Estas seguro que deseas eliminar la imagen?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Eliminar",
                    onPress: () => { 
                        setImagesSelected(
                            filter(
                                imagesSelected, 
                                (imageUrl) => imageUrl !== image
                            )
                        );
                    },
                },
            ],
            { cancelable: false}
        )
    };

    return(
        <View style={styles.viewImage}>
            {size(imagesSelected) < 1 && (
                <Icon
                    type="material-community"
                    name="camera"
                    color="#7a7a7a" 
                    containerStyle={styles.containerIcon}
                    onPress={imageSelect}
                />
            )}
            {map(imagesSelected , (imageProduct, index) => (
               <Avatar
                    key={index} 
                    style={styles.miniatureStyle}
                    source={{ uri: imageProduct}}
                    onPress={() => removeImage(imageProduct)}
               />
            ))}
        </View>
    );
}

function defaultFormValue() {
    return {
        name: "",
        description: "",
        image: "",
    };
}

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
        padding: 10,
    },
    containerIcon: {
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
        height: 60,
        width: 60,
        backgroundColor: "#e3e3e3"
    },
    miniatureStyle: {
        width: 60,
        height: 60,
        marginRight: 8
    },
    viewPhoto: {
        marginTop: 40,
        alignItems: "center",
        height: 200,

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