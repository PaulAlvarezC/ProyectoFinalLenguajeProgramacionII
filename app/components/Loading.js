import React from "react";
import {StyleSheet } from "react-native";
import BounceLoader from "react-spinners/BounceLoader";

export default function Loading(props){
    const {loading} = props;

    return(
        <>
            {

            //<BounceLoader color={"#21ACFC"} loading={loading} size={50} />
            }
        </>
    );
}

const styles = StyleSheet.create({
    overlay: {
        height: 100,
        width: 200,
        backgroundColor: "#fff",
        borderRadius: 10,
    },
    view: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: 100,
        height: 100,
    },
    text: {
        color: "#21ACFC",
        textTransform: "uppercase",
        marginTop: 10,
    }
});
