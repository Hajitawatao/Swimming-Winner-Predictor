// app/navigation/RootStack.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import LastWinnersScreen from '../screens/LastWinnersScreen';
import MultiplierScreen from '../screens/MultiplierScreen';

export type RootStackParamList = {
  LastWinners: undefined;
  Multiplier: { lastWinners: string[] };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStack() {
  return (
    <Stack.Navigator initialRouteName="LastWinners">
      <Stack.Screen name="LastWinners" component={LastWinnersScreen} />
      <Stack.Screen name="Multiplier" component={MultiplierScreen} />
    </Stack.Navigator>
  );
}
