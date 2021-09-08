import React, { useState, useCallback, useRef } from "react";
import { ScrollView } from "react-native";
import { Button, Text } from 'react-native-elements';
import { useFocusEffect } from "@react-navigation/native";
import { Card, Paragraph, Dialog, Portal, Provider, } from 'react-native-paper';
import * as firebase from "firebase";
import { useNavigation } from "@react-navigation/native";
import "firebase/firestore";
import { firebaseApp } from "../../utils/firebase";
import fondo1 from '../../../assets/navidad.jpg';
import fondo2 from '../../../assets/cumpleanos.jpg';
import fondo3 from '../../../assets/sanvalentin.jpg';
import fondo4 from '../../../assets/default.jpg';

const db = firebase.firestore(firebaseApp);

export default function LettersList(props) {
    const [letters, setLetters] = useState([]);
    const [letterId, setLetterId] = useState(null);
    const [visible, setVisible] = useState(false);
    const [totalLetters, setTotalLetters] = useState(0);
    const navigation = useNavigation();
    const toastRef = useRef();

    useFocusEffect(
        useCallback(() => {
            db.collection("letters")
                .where("userId", "==", firebase.auth().currentUser.uid)
                .get()
                .then((snap) => {
                    setTotalLetters(snap.size);
                });

            const letterList = [];

            db.collection("letters")
                .where("userId", "==", firebase.auth().currentUser.uid)
                //.orderBy("createAt")
                .get()
                .then((response) => {
                    response.forEach((doc) => {
                        const letter = doc.data();
                        letterList.push(letter);
                    });
                    setLetters(letterList);
                });
        }, [])
    );

    const deleteLetter = () => {
        console.log('Eliminando', letterId); 
        db.collection("letters")
        .where("letterId", "==", letterId)
        .get()
        .then((response) => {
            response.forEach((doc) => {
                const id = doc.id;
                db.collection("letters")
                    .doc(id)
                    .delete()
                    .then(() => {
                        setVisible(false);
                        navigation.navigate("home");
                        toastRef.current.show("Carta eliminada correctamente!");
                    })
                    .catch(() => {
                        setVisible(false);
                        toastRef.current.show("Error al eliminar la carta!");
                    });
            });
        });

    }

    const showLetter = (id) => {
        navigation.navigate('letterById',{letterById:id});
    }

    const showDialog = (id) => {
        setVisible(true);
        setLetterId(id);
    }

    const hideDialog = () => setVisible(false);

    return (
        <>
            {
                totalLetters > 0 ? (

                    <ScrollView vertical style={{ backgroundColor: '#FFF' }}>
                        <Provider>
                            <Text style={{ margin: 5, padding: 5, }}>Cantidad: {totalLetters}</Text>
                            {
                                letters.map(t =>
                                    <Card key={t.letterId}>
                                        <Card.Title title={t.title} subtitle={t.createAt} style={{backgroundColor: t.type === 1 ? "#21ACFC" : (t.type === 2 ? "#F4F73E" : (t.type === 3 ? "#E6361D" : "#3AA91E"))}}/>
                                        <Card.Cover source={t.type === 1 ? fondo1 : (t.type === 2 ? fondo2 : (t.type === 3 ? fondo3 : fondo4))} />
                                        <Card.Actions>
                                            <Button
                                                icon={{
                                                    name: 'delete',
                                                    type: 'material-community',
                                                    size: 20,
                                                    color: 'white',
                                                }}
                                                buttonStyle={{
                                                    backgroundColor: '#21ACFC',
                                                    borderColor: 'transparent',
                                                    borderWidth: 0,
                                                    borderRadius: 80,
                                                    width: 45,
                                                    height: 45,
                                                }}
                                                onPress={()=> showDialog(t.letterId)}
                                            />
                                            <Button
                                                icon={{
                                                    name: 'eye',
                                                    type: 'material-community',
                                                    size: 20,
                                                    color: 'white',
                                                }}
                                                buttonStyle={{
                                                    backgroundColor: '#21ACFC',
                                                    borderColor: 'transparent',
                                                    borderWidth: 0,
                                                    borderRadius: 80,
                                                    width: 45,
                                                    height: 45,
                                                    marginLeft: 10,
                                                }}
                                                onPress={() => showLetter(t.letterId)}
                                            />
                                        </Card.Actions>
                                    </Card>
                                )
                            }

                            <Portal>
                                <Dialog visible={visible} onDismiss={hideDialog}>
                                    <Dialog.Title>Confirmación de Eliminación</Dialog.Title>
                                    <Dialog.Content>
                                        <Paragraph>Estas seguro que deseas eliminar?</Paragraph>
                                    </Dialog.Content>
                                    <Dialog.Actions>
                                        <Button
                                            icon={{
                                                name: 'cancel',
                                                type: 'material-community',
                                                size: 20,
                                                color: 'white',
                                            }}
                                            buttonStyle={{
                                                backgroundColor: '#21ACFC',
                                                borderColor: 'transparent',
                                                borderWidth: 0,
                                                borderRadius: 80,
                                                width: 45,
                                                height: 45,
                                            }}
                                            onPress={hideDialog}
                                            style={{ marginRight: 5, }}
                                        />
                                        <Button
                                            icon={{
                                                name: 'delete',
                                                type: 'material-community',
                                                size: 20,
                                                color: 'white',
                                            }}
                                            buttonStyle={{
                                                backgroundColor: '#21ACFC',
                                                borderColor: 'transparent',
                                                borderWidth: 0,
                                                borderRadius: 80,
                                                width: 45,
                                                height: 45,
                                            }}
                                            onPress={deleteLetter}
                                        />
                                    </Dialog.Actions>
                                </Dialog>
                            </Portal>
                        </Provider>

                    </ScrollView>
                ) : (
                    <Text style={{textAlign: 'center', fontSize: 18, marginTop: 60, fontWeight: 'bold'}}>No tienes aun ninguna carta!</Text>
                )
            }
        </>
    );
}