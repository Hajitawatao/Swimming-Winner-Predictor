import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Button, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import WinnerInput from '../../components/WinnerInput';

type RootStackParamList = {
  LastWinners: undefined;
  Multiplier: { lastWinners: string[] };
};

type Props = NativeStackScreenProps<RootStackParamList, 'LastWinners'>;

export default function LastWinnersScreen({ navigation }: Props) {
  const [lastWinners, setLastWinners] = useState<string[]>(Array(10).fill(''));

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <WinnerInput lastWinners={lastWinners} setLastWinners={setLastWinners} />
        <Button
          title="Next"
          onPress={() =>
            navigation.navigate('Multiplier', {
              lastWinners: lastWinners,
            })
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', margin: 16 },
});
