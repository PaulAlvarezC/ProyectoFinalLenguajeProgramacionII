import React, { useCallback } from "react";
import { View, ImageBackground, StyleSheet, TextInput, Text } from "react-native";
import { Input } from 'react-native-elements';
import frameChrismas from '../../../assets/frameChrismas.jpg';
import frameBirthday from '../../../assets/frameBirthday.jpg';
import frameValentin from '../../../assets/frameValentin.jpg';
import frameDefault from '../../../assets/cartaDefault.jpeg';
import Toast from "react-native-easy-toast";
import { useFocusEffect } from "@react-navigation/native";
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

export default function LetterById(props) {
    const toastRef = React.useRef();
    const [title, setTitle] = React.useState(null);
    const [message, setMessage] = React.useState(null);
    const [type, setType] = React.useState(null);
    const [email, setEmail] = React.useState(null);
    const [date, setDate] = React.useState(null);

    useFocusEffect(
        useCallback(() => {
            db.collection("letters")
            .where("letterId", "==", props.route.params.letterById)
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    setTitle(doc.data().title);
                    setMessage(doc.data().message);
                    setEmail(doc.data().email);
                    setType(doc.data().type);
                    setDate(doc.data().createAt);
                });
            })
            .catch(function(error) {
                console.log("Error getting userInfo: ", error);
            });
        }, [])
    );

    return (
        <View style={styles.container}>
            <Toast ref={toastRef} position="center" opacity={0.9} />
            <ImageBackground source={type == 1 ? frameChrismas : (type == 2 ? frameBirthday : (type == 3 ? frameValentin : frameDefault))} resizeMode="cover" style={styles.image}>
                <Text style={styles.fecha}>{date}</Text>
                <Input
                    containerStyle={styles.inputForm}
                    value={title || ""}
                    readOnly
                />
                <TextInput
                    multiline
                    numberOfLines={10}
                    style={styles.inputMultiple}
                    value={message || ""}
                    readOnly
                />
                <Input
                    containerStyle={styles.containerStyleForm}
                    labelStyle={styles.labelStyleForm}
                    inputStyle={styles.inputStyleForm}
                    value={email || ""}
                    readOnly
                />
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    fecha: {
        fontSize: 16,
        padding: 10,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    image: {
        flex: 1,
        justifyContent: "center"
    },
    inputForm: {
        flex: 1,
        width: 200,
        padding: 50,
        alignItems: 'center',
        marginTop: 10,
        marginLeft: 110,
    },
    containerStyleForm: {
        flex: 1,
        marginTop: 20,
        padding: 50,
        width: 250,
        marginLeft: 20,
    },
    labelStyleForm: {
        color: '#000',
    },
    inputStyleForm: {
        backgroundColor: '#FFF',
        borderRadius: 5,
        height: 40,
        fontSize: 12,
        padding: 10,
        color: '#000',
    },
    inputMultiple: {
        flex: 30,
        width: 295,
        marginLeft: 60,
        marginRight: 60,
        backgroundColor: 'transparent',
        lineHeight: 28,
        //backgroundColor: 'red',
    },
    btnContainer: {
        position: "absolute",
        bottom: 10,
        right: 10,
        shadowColor: "black",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
    },
    btnContainer2: {
        position: "absolute",
        bottom: 10,
        right: 70,
        shadowColor: "black",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
    },
    text: {
        textAlign: 'center',
    },
});