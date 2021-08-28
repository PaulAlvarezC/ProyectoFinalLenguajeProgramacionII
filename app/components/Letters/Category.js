import React from "react";
import { Avatar, Button, Card, Paragraph } from 'react-native-paper';
import { ScrollView } from "react-native";

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

export default function Category(props){
    const {navigation} = props;

    const goCat1 = () => {
        navigation.navigate("cat1");
    }
    const goCat2 = () => {
        navigation.navigate("cat2");
    }
    const goCat3 = () => {
        navigation.navigate("cat3");
    }
    const goCat4 = () => {
        navigation.navigate("cat4");
    }
    const goCat5 = () => {
        navigation.navigate("cat5");
    }

    return(
        <ScrollView vertical>
            <Card>
                <Card.Title title="Navidad" subtitle="" left={LeftContent} />
                <Card.Content>
                    <Paragraph>Card content</Paragraph>
                </Card.Content>
                <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                <Card.Actions>
                    <Button onPress={goCat1}>Crear</Button>
                </Card.Actions>
            </Card>

            <Card>
                <Card.Title title="Cumpleaños" subtitle="" left={LeftContent} />
                <Card.Content>
                    <Paragraph>Card content</Paragraph>
                </Card.Content>
                <Card.Cover source={{ uri: 'https://picsum.photos/200/300/?blur' }} />
                <Card.Actions>
                    <Button onPress={goCat2}>Crear</Button>
                </Card.Actions>
            </Card>

            <Card>
                <Card.Title title="Aniversario" subtitle="" left={LeftContent} />
                <Card.Content>
                    <Paragraph>Card content</Paragraph>
                </Card.Content>
                <Card.Cover source={{ uri: 'https://picsum.photos/id/237/200/300' }} />
                <Card.Actions>
                    <Button onPress={goCat3}>Crear</Button>
                </Card.Actions>
            </Card>

            <Card>
                <Card.Title title="Aniversario" subtitle="" left={LeftContent} />
                <Card.Content>
                    <Paragraph>Card content</Paragraph>
                </Card.Content>
                <Card.Cover source={{ uri: 'https://picsum.photos/seed/picsum/200/300' }} />
                <Card.Actions>
                    <Button onPress={goCat4}>Crear</Button>
                </Card.Actions>
            </Card>

            <Card>
                <Card.Title title="San Valentin" subtitle="" left={LeftContent} />
                <Card.Content>
                    <Paragraph>Card content</Paragraph>
                </Card.Content>
                <Card.Cover source={{ uri: 'https://picsum.photos/id/870/200/300?grayscale&blur=2' }} />
                <Card.Actions>
                    <Button onPress={goCat5}>Crear</Button>
                </Card.Actions>
            </Card>

        </ScrollView>
    );
}