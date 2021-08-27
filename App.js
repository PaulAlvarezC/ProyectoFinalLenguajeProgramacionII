import React from 'react';
import { YellowBox } from "react-native";
import Navigation from "./app/navigations/Navigation";
import { decode, encode } from "base-64";

console.ignoredYellowBox = [
  'Animated: `useNativeDriver` is not',
];

if(!global.btoa) global.btoa = encode;
if(!global.atob) global.atob = decode;

export default function App() {
  YellowBox.ignoreWarnings(['VirtualizedLists should never be nested', 
      'Setting a timer', 
      'Animated: `useNativeDriver`',
      'Warning: componentWillReceiveProps has been renamed',
      'Warning: componentWillMount has been renamed'
  ]);
  return <Navigation/>;
}