import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import Letters from "../screens/Letters/Letters";
import LetterById from "../screens/Letters/LetterById";

const Stack = createStackNavigator();

export default function LettersStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="letters"
                component={Letters}
                options={{ title: "Mis Cartas", headerShown: true, }}
            />
            <Stack.Screen
                name="letterById"
                component={LetterById}
                options={{ title: "Ver carta", headerShown: true, }}
            />
        </Stack.Navigator>
    );
}