import React, {useRef} from 'react';
import {StyleSheet, View, ScrollView, Image} from "react-native";
import Toast from "react-native-easy-toast";
import ForgotForm from '../../components/Account/ForgotForm';

const ForgotScreen = ({navigation}) => {
    const toastRef = useRef();
    return (
        <ScrollView style={styles.background}>
            <Image source={require("../../../assets/logoDear.png")}
                resizeMode="contain"
                style={styles.logo}
            />
            <View style={styles.viewContainer}>
                <ForgotForm toastRef={toastRef} navigation={navigation}/>
            </View>
            <Toast ref={toastRef} position="center" opacity={0.9}/>
        </ScrollView>
    );
};

export default ForgotScreen;

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#000'
    },
    logo: {
        width: "100%",
        height: 150,
        marginTop: 50,
        marginBottom: 50,
    },
    viewContainer: {
        marginRight: 10,
        marginLeft: 10,
    },
    textRegister: {
        marginTop:20,
        marginLeft: 10,
        marginRight: 10,
        textAlign: "center",
    },
});