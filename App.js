import React from 'react';
import { YellowBox } from "react-native";
import Navigation from "./app/navigations/Navigation";
import { decode, encode } from "base-64";

console.ignoredYellowBox = [
  'Animated: `useNativeDriver` is not',
];

if(!global.btoa) global.btoa = encode;
if(!global.atob) global.atob = decode;

console.disableYellowBox = true;

export default function App() {
  YellowBox.ignoreWarnings(['VirtualizedLists should never be nested', 
      'Setting a timer', 
      'Non-serializable values were found in the navigation state',
      'Animated: `useNativeDriver`',
      'Warning: componentWillReceiveProps has been renamed',
      'Warning: componentWillMount has been renamed',
      'Warning: perform a react state update on an unmounted component'
  ]);
  return <Navigation/>;
}