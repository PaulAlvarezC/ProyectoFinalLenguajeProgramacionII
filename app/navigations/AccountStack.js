import React from 'react';
import { createStackNavigator} from "@react-navigation/stack";
import Account from "../screens/Account/Account";
import Login from "../screens/Account/Login";
import Register from "../screens/Account/Register";
import Forgot from "../screens/Account/Forgot";

const Stack = createStackNavigator();

export default function AccountStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="account"
                component={Account}
                options={{ title: "Perfil", headerShown: true,}}
            />
            <Stack.Screen
                name="login"
                component={Login}
                options={{ title: "Inicio de Sesión"}}/>
            <Stack.Screen
                name="register"
                component={Register}
                options={{ title: "Registrar Usuario"}}/>
            <Stack.Screen
                name="forgot"
                component={Forgot}
                options={{ title: "Recuperar Contraseña"}}/>
        </Stack.Navigator>
    );
}