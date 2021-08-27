import React, { useState }  from 'react';
import {StyleSheet, View, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';
import { map } from 'lodash';
import Modal from '../Modal';
import ChangeDisplayNameForm from "../Account/ChangeDisplayNameForm";
import ChangeEmailForm from "../Account/ChangeEmailForm";
import ChangePasswordForm from "../Account/ChangePasswordForm";
import firebase from "firebase/app";
import "firebase/firestore";

export default function AccountOptions(props) {
    const { userInfo, toastRef, setReloadUserInfo} = props;
    const [ showModal, setShowModal] = useState(false);
    const [renderComponent, setRenderComponent] = useState(null)
    
    const selectedComponent = (key) => {
        switch (key) {
            case "displayName":
                setRenderComponent(
                    <ChangeDisplayNameForm 
                        displayName={userInfo.displayName}
                        setShowModal={setShowModal}
                        toastRef={toastRef}
                        setReloadUserInfo={setReloadUserInfo}
                    />);
                setShowModal(true);
                break;
            case "email":
                setRenderComponent(
                    <ChangeEmailForm 
                        email={userInfo.email}
                        setShowModal={setShowModal}
                        toastRef={toastRef}
                        setReloadUserInfo={setReloadUserInfo}
                    />
                );
                setShowModal(true);
                break;
            case "password":
                setRenderComponent(
                    <ChangePasswordForm 
                        email={userInfo.password}
                        setShowModal={setShowModal}
                        toastRef={toastRef}
                        setReloadUserInfo={setReloadUserInfo}
                    />
                );
                setShowModal(true);
                break;
            case "close":
                firebase.auth().signOut();
                break;
            default:
                setRenderComponent(null);
                break;
        }
    };

    const menuOptions = generateOptions(selectedComponent);

    return (
        <ScrollView stye={styles.scrollView}>
            <View>
                {map(menuOptions, (menu, index) => (
                    <ListItem
                        key={index}
                        title={menu.title}
                        leftIcon={{
                            type: menu.iconType,
                            name: menu.iconNameLeft,
                            color: menu.iconColorLeft,
                        }}
                        rightIcon={{
                            type: menu.iconType,
                            name: menu.iconNameRight,
                            color: menu.iconColorRight,
                        }}
                        containerStyle={styles.menuItem}
                        onPress= {menu.onPress}
                    />
                ))}

                {renderComponent && (
                    <Modal isVisible={showModal} setIsVisible={setShowModal}>
                        {renderComponent}
                    </Modal>
                )}
            </View>
        </ScrollView>
    );
}

function generateOptions(selectedComponent){
    return [
        {
            title: "Cambiar Nombre y Apellidos",
            iconType: "material-community",
            iconNameLeft: "account-circle",
            iconColorLeft: "#000",
            iconNameRight: "chevron-right",
            iconColorRight: "#000",
            onPress: () => selectedComponent("displayName"),
        },
        {
            title: "Cambiar Email",
            iconType: "material-community",
            iconNameLeft: "at",
            iconColorLeft: "#000",
            iconNameRight: "chevron-right",
            iconColorRight: "#000",
            onPress: () => selectedComponent("email"),
        },
        {
            title: "Cambiar Contraseña",
            iconType: "material-community",
            iconNameLeft: "lock-reset",
            iconColorLeft: "#000",
            iconNameRight: "chevron-right",
            iconColorRight: "#000",
            onPress: () => selectedComponent("password"),
        },
        {
            title: "Cerrar Sesión",
            iconType: "material-community",
            iconNameLeft: "lock",
            iconColorLeft: "#000",
            iconColorRight: "#000",
            onPress: () => selectedComponent("close"),
        }
    ]
}

const styles = StyleSheet.create({
    menuItem:{
        borderBottomWidth: 1,
        borderBottomColor: "#e3e3e3",
    },
    scrollView: {
        height: "100%",
    },
});