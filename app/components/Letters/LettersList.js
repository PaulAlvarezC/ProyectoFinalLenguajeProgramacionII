import React, { useState, useCallback } from "react";
import { ScrollView } from "react-native";
import { Button, Text } from 'react-native-elements';
import { useFocusEffect } from "@react-navigation/native";
import { Avatar, Card, Paragraph, Dialog, Portal, Provider, } from 'react-native-paper';
import * as firebase from "firebase";
import "firebase/firestore";
import { firebaseApp } from "../../utils/firebase";

const LeftContent = props => <Avatar.Icon {...props} size={50} icon="book-outline" color="#FFF" style={{ backgroundColor: "#21ACFC" }} />

const db = firebase.firestore(firebaseApp);

export default function LettersList(props) {
    const [letters, setLetters] = useState([]);
    const [visible, setVisible] = useState(false);
    const [totalLetters, setTotalLetters] = useState(0);

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
        console.log('Eliminando');
        setVisible(false);
    }

    const showLetter = (id) => {
        console.log('Abrir Carta ', id);
    }

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

    return (
        <>
            <ScrollView vertical style={{ backgroundColor: '#FFF' }}>
                <Provider>
                    <Text style={{ margin: 5, padding: 5, }}>Cantidad: {totalLetters}</Text>
                    {
                        letters.map(t =>
                            <Card key={t.letterId}>
                                <Card.Title title={t.title} subtitle={t.createAt} style={{backgroundColor: "#21ACFC",}}/>
                                <Card.Content>
                                </Card.Content>
                                <Card.Cover source={require('../../../assets/navidad.jpg')} />
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
                                        onPress={showDialog}
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
        </>
    );
}