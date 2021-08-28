import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
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

    const goCreate = () => {
      navigation.navigate('create', {
        navigation: navigation,
      });
    }

    return(
        <View style={styles.viewBody}>
            <Icon
              reverse
              type="material-community"
              name="plus"
              color="#21ACFC"
              containerStyle={styles.btnContainer}
              onPress={goCreate}
            />
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

  const styles = StyleSheet.create({
    viewBody: {
      flex: 1,
      flexDirection: "row",
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    btnContainer: {
      position: "absolute",
      bottom: 10,
      right: 10,
      shadowColor: "black",
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.5,
    },
  });