import React from "react";
import { ScrollView } from "react-native";
import { Button } from 'react-native-elements';
import { Avatar, Card, Paragraph, Dialog, Portal, Provider, } from 'react-native-paper';
import * as firebase from "firebase";
import "firebase/firestore";
import { firebaseApp } from "../../utils/firebase";

const LeftContent = props => <Avatar.Icon {...props} size={50} icon="book-outline" color="#FFF" style={{ backgroundColor: "#21ACFC" }} />

const db = firebase.firestore(firebaseApp);

export default function LettersList(props) {
    const { userId } = props;
    const [letters, setLetters] = React.useState([]);
    const [visible, setVisible] = React.useState(false);

    React.useEffect(() => {
        const letterList = [];

        db.collection("letters")
            .where("userId", "==", userId)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    letterList.push(doc.data());
                });
                console.log(letterList);
                setLetters(letterList);
            })
            .catch(function (error) {
                console.log("Error getting userInfo: ", error);
            });
    }, []);

    const deleteLetter = () => {
        console.log('Eliminando');
        setVisible(false);
    }

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

    return (
        <>
            <ScrollView vertical style={{ backgroundColor: '#FFF' }}>
                <Provider>

                {
                    letters.map(t =>
                        <Card key={t.letterId}>
                            <Card.Title title={t.title} subtitle="" left={LeftContent} />
                            <Card.Content>
                                <Paragraph style={{ fontWeight: 'bold' }}>{t.createAt}</Paragraph>
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
                                    style={{marginRight: 5,}}
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