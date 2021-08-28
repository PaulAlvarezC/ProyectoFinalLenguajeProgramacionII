import React from "react";
import { View, ImageBackground, StyleSheet, TextInput, Text, Button } from "react-native";
import { Input, Icon } from 'react-native-elements';
import frameChrismas from '../../../assets/frameChrismas.jpg';
import Modal from "react-native-modal";

export default function Cat1() {
    const [formData, setFormData] = React.useState(defaultFormValue());
    const [isModalVisible, setModalVisible] = React.useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text });
    }

    const openModal = () => {
        setModalVisible(true);
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={frameChrismas} resizeMode="cover" style={styles.image}>
                <Input
                    onChange={e => onChange(e, "titulo")}
                    containerStyle={styles.inputForm}
                    placeholder='Título'
                />
                <TextInput
                    multiline
                    numberOfLines={10}
                    onChange={e => onChange(e, 'mensaje')}
                    style={styles.inputMultiple}
                    placeholder='Tu mensaje'
                />
                <Icon
                    reverse
                    type="material-community"
                    name="settings-outline"
                    color="#21ACFC"
                    containerStyle={styles.btnContainer}
                    onPress={openModal}
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
        titulo: "",
        mensaje: "",
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
    inputMultiple: {
        flex: 30,
        width: 295,
        marginLeft: 60,
        marginRight: 60,
        backgroundColor: 'transparent',
        lineHeight: 30,
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
    modal: {
        backgroundColor: '#FFF',
        borderRadius: 20,
    },
    text: {
        textAlign: 'center',
    },
});