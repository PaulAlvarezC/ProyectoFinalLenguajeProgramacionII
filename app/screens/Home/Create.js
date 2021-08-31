import React from "react";
import { ScrollView } from "react-native";
import LetterForm from '../../components/Letters/LetterForm';

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
            <LetterForm />
        </ScrollView>
    );
}