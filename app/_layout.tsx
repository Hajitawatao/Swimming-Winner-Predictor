import { Stack } from 'expo-router';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: true,
        }}
      >
        <Stack.Screen name="(tabs)/_layout" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  );
}
