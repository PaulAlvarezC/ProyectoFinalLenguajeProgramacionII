import React, {useState, useEffect, useRef} from "react";
import {StyleSheet, View} from "react-native";
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";
import * as firebase from "firebase";
import "firebase/firestore";
import { firebaseApp } from "../../utils/firebase";
import InfoUser from "../../components/Account/InfoUser";
import AccountOptions from "../../components/Account/AccountOptions";
import {useNavigation} from "@react-navigation/native";

const db = firebase.firestore(firebaseApp);

export default function UserLogged(){
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState(false);
    const [profile, setProfile] = useState(null);
    const [reloadUserInfo, setReloadUserInfo] = useState(false);
    const toastRef = useRef();
    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
            const user = await firebase.auth().currentUser;
            setUserInfo(user);
        })();
        setReloadUserInfo(false);
    }, [reloadUserInfo]);

    useEffect(() => {
        db.collection("users")
        .where("idUser", "==", firebase.auth().currentUser.uid)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                //console.log(doc.id, " => ", doc.data().profile);
                setProfile(doc.data().profile);
            });
        })
        .catch(function(error) {
            console.log("Error getting userInfo: ", error);
        });
      }, []);

    return(
        <View style={styles.viewUserInfo}>
            {userInfo && <InfoUser 
                            userInfo={userInfo} 
                            toastRef={toastRef}
                            setLoading={setLoading}
                            setLoadingText={setLoadingText}
                        />}
            <AccountOptions 
                userInfo={userInfo} 
                toastRef={toastRef} 
                setReloadUserInfo={setReloadUserInfo} 
                navigation={navigation}/>
            <Toast 
                ref={toastRef} 
                position="center" 
                opacity={0.9}/>
            <Loading text={loadingText} isVisible={loading} />
        </View>
    );
}

const styles = StyleSheet.create({
    viewUserInfo:{
        minHeight: "100%",
        backgroundColor: "#f2f2f2",
    },
    btnCloseSesion:{
        marginTop: 30,
        borderRadius: 0,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#e3e3e3",
        borderBottomWidth: 1,
        borderBottomColor: "#e3e3e3",
        paddingTop: 10,
        paddingBottom: 10,
    },
});