import React from 'react';
import { createStackNavigator} from "@react-navigation/stack";
import Home from "../screens/Home/Home";
import Create from "../screens/Home/Create";
import Template from "../screens/Home/Template";
import Cat1 from "../screens/Letters/Cat1";
import Cat2 from "../screens/Letters/Cat2";
import Cat3 from "../screens/Letters/Cat3";

const Stack = createStackNavigator();

export default function HomeStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="home"
                component={Home}
                options={{ title: "Inicio", headerShown: true,}}
            />
            <Stack.Screen
                name="template"
                component={Template}
                options={{ title: "Crear Evento"}}/>
            <Stack.Screen
                name="create"
                component={Create}
                options={{ title: "Crear Evento"}}/>
            <Stack.Screen
                name="categoria1"
                component={Cat1}
                options={{ title: "Navidad" }} />
            <Stack.Screen
                name="categoria2"
                component={Cat2}
                options={{ title: "Cumpleaños" }} />
            <Stack.Screen
                name="categoria3"
                component={Cat3}
                options={{ title: "San Valentín" }} />
        </Stack.Navigator>
    );
}