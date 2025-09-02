import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8e8e93',
        tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold' },
      }}
    >
      <Tabs.Screen
        name="LastWinnersScreen"
        options={{
          title: 'Last Winners',
          tabBarLabel: 'Last Winners',
        }}
      />
      <Tabs.Screen
        name="MultiplierScreen"
        options={{
          title: 'Multiplier',
          tabBarLabel: 'Multiplier',
        }}
      />
    </Tabs>
  );
}
