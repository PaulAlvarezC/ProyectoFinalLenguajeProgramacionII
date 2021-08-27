import React, { useState } from "react";
import { View, Text } from "react-native";
import { Icon, Button } from "react-native-elements";
import firebase from "firebase";

export default function Home(props){
    const { navigation } = props;
    const [userLogged, setUserLogged] = useState(false);
    
    firebase.auth().onAuthStateChanged((user) => {
        user ? setUserLogged(true) : setUserLogged(false);
    });

    if (!userLogged) {
        return <UserNoLogged navigation={navigation} />;
    }

    return(
        <View>
            <Text>Inicio</Text>
        </View>
    );
}

function UserNoLogged(props) {
    const { navigation } = props;
  
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Icon type="material-community" name="alert-outline" size={50} />
        <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>
          Necesitas estar logueado para ver esta sección
        </Text>
        <Button
          title="Iniciar Sesión"
          containerStyle={{ marginTop: 20, width: "90%" }}
          buttonStyle={{ backgroundColor: "#21ACFC", borderRadius: 10, height: 60,}}
          onPress={() => navigation.navigate("account", { screen: "login" })}
        />
      </View>
    );
  }