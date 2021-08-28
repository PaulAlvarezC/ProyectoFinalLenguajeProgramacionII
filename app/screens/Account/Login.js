import React, {useRef} from "react";
import {StyleSheet, View, ScrollView,Text, Image} from "react-native";
import Toast from "react-native-easy-toast";
import {useNavigation} from "@react-navigation/native";
import LoginForm from "../../components/Account/LoginForm";

export default function Login() {
    const toastRef = useRef();
    return (
        <ScrollView>
            <Image source={require("../../../assets/logoDear.png")}
                resizeMode="contain"
                style={styles.logo}
            />
            <View style={styles.viewContainer}>
                <LoginForm toastRef={toastRef}/>
                <CreateAccount/>
            </View>
            <Toast ref={toastRef} position="center" opacity={0.9}/>
        </ScrollView>
    );
}

function CreateAccount(){
    const navigation = useNavigation();
    return(
        <Text style={styles.textRegister}>
            Aun no tienes una cuenta?{" "}
            <Text 
            style={styles.btnRegister}
            onPress={() => navigation.navigate("register")}>Registrate</Text>
        </Text>
    );
}

const styles = StyleSheet.create({
    logo: {
        width: "100%",
        height: 150,
        marginTop: 20,
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
    btnRegister: {
        color: "#21ACFC",
        fontWeight: "bold",
        borderRadius: 10,
    },
    divider: {
        backgroundColor: "#21ACFC",
        margin: 40,
    },
});