import React from "react";
import { ScrollView } from "react-native";
import { Avatar, Button, Card, Paragraph } from 'react-native-paper';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

export default function Create({route}){
    const { navigation } = route.params;

    const goCat1 = () => {
      navigation.navigate("categoria1");
    }
    const goCat2 = () => {
        navigation.navigate("categoria2");
    }
    const goCat3 = () => {
        navigation.navigate("categoria3");
    }

    return(
        <ScrollView vertical>
            <Card>
                <Card.Title title="Navidad" subtitle="" left={LeftContent} />
                <Card.Content>
                    <Paragraph>Card content</Paragraph>
                </Card.Content>
                <Card.Cover source={require('../../../assets/navidad.jpg')} />
                <Card.Actions>
                    <Button onPress={goCat1}>Crear</Button>
                </Card.Actions>
            </Card>

            <Card>
                <Card.Title title="Cumpleaños" subtitle="" left={LeftContent} />
                <Card.Content>
                    <Paragraph>Card content</Paragraph>
                </Card.Content>
                <Card.Cover source={require('../../../assets/cumpleanos.jpg')} />
                <Card.Actions>
                    <Button onPress={goCat2}>Crear</Button>
                </Card.Actions>
            </Card>

            <Card>
                <Card.Title title="San Valentin" subtitle="" left={LeftContent} />
                <Card.Content>
                    <Paragraph>Card content</Paragraph>
                </Card.Content>
                <Card.Cover source={require('../../../assets/sanvalentin.jpg')} />
                <Card.Actions>
                    <Button onPress={goCat3}>Crear</Button>
                </Card.Actions>
            </Card>
        </ScrollView>
    );
}