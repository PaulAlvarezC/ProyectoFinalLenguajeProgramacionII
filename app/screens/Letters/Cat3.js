import React from "react";
import { View, ImageBackground, StyleSheet, TextInput, Text, Button } from "react-native";
import { Input, Icon } from 'react-native-elements';
import frameValentin from '../../../assets/frameValentin.jpg';
import Modal from "react-native-modal";
import Toast from "react-native-easy-toast";
import {useNavigation} from "@react-navigation/native";
import {isEmpty} from 'lodash';
import {fullDate, validateEmail} from '../../utils/validations';
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

export default function Cat3() {
    const toastRef = React.useRef();
    const [formData, setFormData] = React.useState(defaultFormValue());
    const [isModalVisible, setModalVisible] = React.useState(false);
    const [userId, setUserId] = React.useState(false);
    const navigation = useNavigation();

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            setUserId(user.uid);
        }
    });

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text });
    }

    const openModal = () => {
        setModalVisible(true);
    }

    const save = () => {
        if(isEmpty(formData.title)){
            toastRef.current.show("Debes agregar el título de tu carta!", 4000);
        } else if(isEmpty(formData.message)){
            toastRef.current.show("Debes agregar el contenido del mensaje!", 4000);
        } else if(isEmpty(formData.email)){
            toastRef.current.show("Debes agregar el correo electrónico de la persona que deseas que reciba tu carta!", 4000);
        } else if(!validateEmail(formData.email)){
            toastRef.current.show("Email no es correcto.", 4000);
        } else {
            const letterId = generateLetterId(10);
            const data = {
                letterId: letterId,
                userId: userId,
                title: formData.title,
                email: formData.email.toLocaleLowerCase(),
                message: formData.message,
                type: 3,
                createAt: fullDate(),
            };
            db.collection("letters")
            .doc(letterId)
            .set(data)
            .then(() => {
                toastRef.current.show("Carta creada correctamente", 4000);
                navigation.navigate("letters");
            })
            .catch(() => {
                toastRef.current.show("Ups, algo salio mal!");
            });              
        }
    } 

    return (
        <View style={styles.container}>
            <Toast ref={toastRef} position="center" opacity={0.9}/>
            <ImageBackground source={frameValentin} resizeMode="cover" style={styles.image}>
                <Input
                    onChange={e => onChange(e, "title")}
                    containerStyle={styles.inputForm}
                    placeholder='Título'                    
                />
                <TextInput
                    multiline
                    numberOfLines={10}
                    onChange={e => onChange(e, 'message')}
                    style={styles.inputMultiple}
                    placeholder='Tu mensaje'
                />
                <Input
                    placeholder='Email'
                    onChange={e => onChange(e, "email")}
                    containerStyle={styles.containerStyleForm}
                    labelStyle={styles.labelStyleForm}
                    inputStyle={styles.inputStyleForm}
                />
                <Icon
                    reverse
                    type="material-community"
                    name="settings-outline"
                    color="#21ACFC"
                    containerStyle={styles.btnContainer}
                    onPress={openModal}
                />
                <Icon
                    reverse
                    type="material-community"
                    name="content-save"
                    color="#21ACFC"
                    containerStyle={styles.btnContainer2}
                    onPress={save}
                />
                <Modal isVisible={isModalVisible} style={styles.modal}>
                    <View>
                        <Text style={styles.text}>Hello!</Text>

                        <Button title="Hide modal" onPress={toggleModal} />
                    </View>
                </Modal>
            </ImageBackground>
        </View>
    );
}

function defaultFormValue() {
    return {
        title: "",
        message: "",
        email: "",
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: "center"
    },
    inputForm: {
        flex: 1,
        width: 200,
        padding: 20,
        alignItems: 'center',
        marginTop: 80,
        marginLeft: 110,
    },
    containerStyleForm: {
        //marginTop: -80,
        padding: 20,
        width: 250,
        marginLeft: 10,
        alignItems: 'center',
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
        flex: 3,
        marginTop: -80,
        width: 320,
        marginLeft: 40,
        marginRight: 40,
        backgroundColor: 'transparent',
        lineHeight: 28,
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
    modal: {
        backgroundColor: '#FFF',
        borderRadius: 20,
    },
    text: {
        textAlign: 'center',
    },
});

function generateLetterId(n) {
    var add = 1, max = 10 - add;
  
    if (n > max) {
        return generateLetterId(max) + generateLetterId(n - max);
    }
  
    max = Math.pow(10, n + add);
    var min = max / 10;
    var number = Math.floor(Math.random() * (max - min + 1)) + min;
  
    return ("" + number).substring(add);
  }