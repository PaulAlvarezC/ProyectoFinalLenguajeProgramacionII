import React from "react";
import { View, ImageBackground, StyleSheet, TextInput } from "react-native";
import { Input } from 'react-native-elements';
import frameValentin from '../../../assets/frameValentin.jpg';

export default function Cat3() {
    const [formData, setFormData] = React.useState(defaultFormValue());

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text });
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={frameValentin} resizeMode="cover" style={styles.image}>
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
        padding: 150,
        alignItems: 'center',
        marginTop: 10,
        marginLeft: 110,
    },
    inputMultiple: {
        flex: 4,
        width: 295,
        marginLeft: 60,
        marginRight: 60,

        marginTop: -150,
        backgroundColor: 'transparent',
        lineHeight: 30,
        //backgroundColor: 'red',
    },
});