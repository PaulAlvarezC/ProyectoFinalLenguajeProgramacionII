import React from "react";
import { ScrollView } from "react-native";
import LetterForm from '../../components/Letters/LetterForm';

export default function Create(){

    return(
        <ScrollView vertical>
            <LetterForm />
        </ScrollView>
    );
}