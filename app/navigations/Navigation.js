import React from 'react';
import { StyleSheet } from "react-native";
import { NavigationContainer} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {Icon} from "react-native-elements";
import HomeStack from "./HomeStack";
import AccountStack from "./AccountStack";
import LettersStack from "./LettersStack";

const Tab = createBottomTabNavigator();

export default function Navigation(){
    
    return(
        <NavigationContainer
            style={styles.nav}
        >
            <Tab.Navigator 
                initialRouteName="home"
                tabBarOptions={{
                    inactiveTintColor: "#fff",
                    activeTintColor: "#000",
                    activeBackgroundColor:"#21ACFC",
                    style: {
                        padding: 4,
                        backgroundColor: '#21ACFC'
                    }
                }}
                screenOptions={({route }) => ({
                    tabBarIcon: ({color}) => screenOptions(route,color),
                })}    
            >
                <Tab.Screen 
                    name="home" 
                    component={HomeStack}
                    options={{ title: "Inicio"}}
                />
                <Tab.Screen 
                    name="letters" 
                    component={LettersStack}
                    options={{ title: "Mis Tarjetas"}}
                />
                <Tab.Screen 
                    name="account" 
                    component={AccountStack}
                    options={{ title: "Mi Cuenta"}}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

function screenOptions(route, color){
    let iconName;

    switch(route.name){
        case "home":
            iconName = "home"
            break;
        case "letters":
            iconName = "anchor"
            break;
        case "account":
            iconName = "account"
                break;
        default:
            break;
    }
    return(
        <Icon 
            type="material-community" 
            name={iconName}
            size={30}
            color={color}/>
    );
}

const styles = StyleSheet.create({
    nav:{
        backgroundColor: "#000",
    },
});