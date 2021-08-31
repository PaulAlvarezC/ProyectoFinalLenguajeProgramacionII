import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import Letters from "../screens/Letters/Letters";

const Stack = createStackNavigator();

export default function LettersStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="letters"
                component={Letters}
                options={{ title: "Mis Cartas", headerShown: true, }}
            />
        </Stack.Navigator>
    );
}