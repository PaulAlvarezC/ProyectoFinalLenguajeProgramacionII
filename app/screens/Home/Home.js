import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Icon } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import { Avatar, Button, Card, Paragraph } from 'react-native-paper';
import * as firebase from "firebase";
import "firebase/firestore";
import { firebaseApp } from "../../utils/firebase";

const LeftContent = props => <Avatar.Icon {...props} icon="book-outline" color="#FFF" style={{ backgroundColor: "#21ACFC" }} />

const db = firebase.firestore(firebaseApp);

export default function Home(props) {
  const { navigation } = props;
  const [events, setEvents] = useState([]);
  const [userLogged, setUserLogged] = useState(false);
  const [totalEvents, setTotalEvents] = useState(0);

  useFocusEffect(
    useCallback(() => {
      db.collection("event")
        .get()
        .then((snap) => {
          setTotalEvents(snap.size);
        });

      const eventList = [];

      db.collection("event")
        .get()
        .then((response) => {
          response.forEach((doc) => {
            const event = doc.data();
            eventList.push(event);
          });
          setEvents(eventList);
          console.log(eventList);
        });
    }, [])
  );

  const goCat1 = () => {
    navigation.navigate("categoria1");
  }
  const goCat2 = () => {
    navigation.navigate("categoria2");
  }
  const goCat3 = () => {
    navigation.navigate("categoria3");
  }

  const goCatDefault = () => {
    navigation.navigate("default");
  }


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

  return (
    <>
    <Text style={{ margin: 5, padding: 5, }}>Personalizadas: {totalEvents}</Text>
      <ScrollView vertical>
        {
          events.map(t =>
            <Card key={t.letterId}>
              <Card.Title title={t.name} subtitle={t.description} left={LeftContent} />
              <Card.Cover
                source={
                  { uri: t.image[0] }
                }
              />
              <Card.Actions>
                <Button onPress={goCatDefault}>Crear</Button>
              </Card.Actions>
            </Card>
          )
        }

        <Card>
          <Card.Title title="Navidad" subtitle="" left={LeftContent} />
          <Card.Content>
            <Paragraph>Escribele a Santa y dile como te has portado.</Paragraph>
          </Card.Content>
          <Card.Cover source={require('../../../assets/navidad.jpg')} />
          <Card.Actions>
            <Button onPress={goCat1}>Crear</Button>
          </Card.Actions>
        </Card>

        <Card>
          <Card.Title title="Cumpleaños" subtitle="" left={LeftContent} />
          <Card.Content>
            <Paragraph>Escribe y envia tus mejores deseos a un familiar o amigo por su cumpleaños.</Paragraph>
          </Card.Content>
          <Card.Cover source={require('../../../assets/cumpleanos.jpg')} />
          <Card.Actions>
            <Button onPress={goCat2}>Crear</Button>
          </Card.Actions>
        </Card>

        <Card>
          <Card.Title title="San Valentin" subtitle="" left={LeftContent} />
          <Card.Content>
            <Paragraph>Expresa tu amor a tu crush a traves de una carta!</Paragraph>
          </Card.Content>
          <Card.Cover source={require('../../../assets/sanvalentin.jpg')} />
          <Card.Actions>
            <Button onPress={goCat3}>Crear</Button>
          </Card.Actions>
        </Card>
      </ScrollView>
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
    </>
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
        buttonStyle={{ backgroundColor: "#21ACFC", borderRadius: 10, height: 60, }}
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