import React from "react";
import { View, ImageBackground, StyleSheet, TextInput } from "react-native";
import { Input } from 'react-native-elements';
import { FAB, Portal, Provider } from 'react-native-paper';
import frameChrismas from '../../../assets/frameChrismas.jpg';
import Toast from "react-native-easy-toast";
import { useNavigation } from "@react-navigation/native";
import { isEmpty } from 'lodash';
import { fullDate, validateEmail } from '../../utils/validations';
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

export default function Cat1() {
    const toastRef = React.useRef();
    const [formData, setFormData] = React.useState(defaultFormValue());
    const [userId, setUserId] = React.useState(false);
    const navigation = useNavigation();
    const [state, setState] = React.useState({ open: false });

    const onStateChange = ({ open }) => setState({ open });

    const { open } = state;

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            setUserId(user.uid);
        }
    });

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text });
    }

    const addSquare = (x, y) => {
        console.log('Add Square: ', x, y);
    }

    const save = () => {
        if (isEmpty(formData.title)) {
            toastRef.current.show("Debes agregar el título de tu carta!", 4000);
        } else if (isEmpty(formData.message)) {
            toastRef.current.show("Debes agregar el contenido del mensaje!", 4000);
        } else if (isEmpty(formData.email)) {
            toastRef.current.show("Debes agregar el correo electrónico de la persona que deseas que reciba tu carta!", 4000);
        } else if (!validateEmail(formData.email)) {
            toastRef.current.show("Email no es correcto.", 4000);
        } else {
            const letterId = generateLetterId(10);
            const data = {
                letterId: letterId,
                userId: userId,
                title: formData.title,
                email: formData.email.toLocaleLowerCase(),
                message: formData.message,
                type: 1,
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
            <Toast ref={toastRef} position="center" opacity={0.9} />
            <ImageBackground source={frameChrismas} resizeMode="cover" style={styles.image}>
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

                <Provider>
                    <Portal>
                        <FAB.Group
                            color={"#FFF"}
                            fabStyle={{ backgroundColor: "#21ACFC" }}
                            open={open}
                            icon={open ? 'close' : 'settings-outline'}
                            actions={[
                                {
                                    icon: 'plus',
                                    onPress: () => console.log('Pressed add')
                                },
                                {
                                    icon: 'star',
                                    label: 'Colocar Figúra',
                                    onPress: () => addSquare(100, 100),
                                },
                                {
                                    icon: 'text',
                                    label: 'Colocar Texto',
                                    onPress: () => console.log('Pressed email'),
                                },
                                {
                                    icon: 'content-save',
                                    label: 'Guardar',
                                    onPress: () => save(),
                                    small: false,
                                },
                            ]}
                            onStateChange={onStateChange}
                            onPress={() => {
                                if (open) {
                                    // do something if the speed dial is open
                                }
                            }}
                        />
                    </Portal>
                </Provider>
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
    square: {
        width: 100,
        height: 100,
        backgroundColor: 'rgba(0,0,256, 0.5)',
        borderRadius: 20,

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