import React, { useRef } from "react";
import { View, ImageBackground, StyleSheet, TextInput, Share } from "react-native";
import { Input, Icon, Image } from 'react-native-elements';
import { FAB, Portal, Provider } from 'react-native-paper';
import frameChrismas from '../../../assets/cartaDefault.jpeg';
import Toast from "react-native-easy-toast";
import { useNavigation } from "@react-navigation/native";
import { isEmpty } from 'lodash';
import ViewShot from "react-native-view-shot";
import { fullDate, validateEmail } from '../../utils/validations';
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

export default function Default() {
    const toastRef = React.useRef();
    const [formData, setFormData] = React.useState(defaultFormValue());
    const [userId, setUserId] = React.useState(false);
    const [figure1, setFigure1] = React.useState(false);
    const [figure2, setFigure2] = React.useState(false);
    const [state, setState] = React.useState({ open: false });
    const viewShotRef = useRef();
    const navigation = useNavigation();

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
                type: 0,
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

    const addEmoji1 = () => {
        if (figure1) {
            setFigure1(false);
        } else {
            setFigure1(true);
        }
    }

    const addEmoji2 = () => {
        if (figure2) {
            setFigure2(false);
        } else {
            setFigure2(true);
        }
    };

    const captureViewShot = async () => {
        const imageURI = await viewShotRef.current.capture();
        Share.share({ title: 'Image', url: imageURI });
    };

    const sendEmail = async (mail) => {
        if (isEmpty(mail)) {
            toastRef.current.show("Debes agregar el correo electrónico de la persona que deseas que reciba tu carta!", 4000);
        } else if (!validateEmail(mail)) {
            toastRef.current.show("Email no es correcto.", 4000);
        } else {

        }
    };

    return (
        <View style={styles.container}>
            <Toast ref={toastRef} position="center" opacity={0.9} />
            <ViewShot ref={viewShotRef} style={{ flex: 1 }} options={{ format: 'jpg', quality: 1.0 }}>

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

                    {
                        figure1 ? (
                            <Image
                                source={require("../../../assets/figure1.png")}
                                style={{ width: 100, height: 100, marginTop: 80, position: "relative" }}
                            />
                        ) : (<></>)
                    }

                    {
                        figure2 ? (
                            <Image
                                source={require("../../../assets/figure2.png")}
                                style={{ width: 100, height: 100, marginTop: 100, position: "relative", }}
                            />
                        ) : (
                            <>
                            </>
                        )
                    }

                    <Provider>
                        <Portal>
                            <FAB.Group
                                color={"#FFF"}
                                fabStyle={{ backgroundColor: "#21ACFC" }}
                                open={open}
                                icon={open ? 'close' : 'settings-outline'}
                                actions={[
                                    {
                                        icon: 'mail',
                                        label: 'Enviar Correo',
                                        onPress: () => sendEmail(formData.email),
                                    },
                                    {
                                        icon: 'star',
                                        label: figure1 ? 'Retirar Emoji 1' : 'Colocar Emoji 1',
                                        onPress: () => addEmoji1(),
                                    },
                                    {
                                        icon: 'text',
                                        label: figure2 ? 'Retirar Emoji 2' : 'Colocar Emoji 2',
                                        onPress: () => addEmoji2(),
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
            </ViewShot>


            <View style={styles.viewBody}>
                <Input
                    placeholder='Para: (Ingresa el email)'
                    onChange={e => onChange(e, "email")}
                    containerStyle={styles.emailInputForm}
                    labelStyle={styles.labelStyleForm}
                    inputStyle={styles.inputStyleForm}
                />
                <Icon
                    reverse
                    type="material-community"
                    name="camera"
                    color="#21ACFC"
                    containerStyle={styles.btnContainer}
                    onPress={() => captureViewShot(formData.email)}
                />
            </View>

        </View>
    );
}

function defaultFormValue() {
    return {
        title: "",
        message: "",
        email: "",
        from: "",
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
        padding: 5,
        width: '100%',
        marginTop: 5,
    },
    inputFromForm: {
        flex: 1,
        width: 200,
        padding: 50,
        alignItems: 'center',
        marginTop: 10,
        marginLeft: 20,
    },
    emailInputForm: {
        //flex: 1,
        marginTop: -60,
        width: 220,
        marginLeft: 20,
    },
    labelStyleForm: {
        color: '#000',
    },
    inputStyleForm: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        height: 40,
        fontSize: 12,
        padding: 10,
        color: '#000',
    },
    inputMultiple: {
        flex: 30,
        width: '100%',
        marginTop: 28,
        padding: 20,
        backgroundColor: 'transparent',
        lineHeight: 27,
    },
    btnContainer: {
        position: "absolute",
        bottom: 10,
        right: 80,
        shadowColor: "black",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
    },
    viewBody: {
        flexDirection: "row",
        backgroundColor: "#fff",
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