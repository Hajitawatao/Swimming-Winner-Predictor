import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Button, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import WinnerInput from '../../components/WinnerInput';
import { RootStackParamList } from '../navigation/RootStack';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'LastWinners'>;
};

export default function TabOneScreen({ navigation }: Props) {
  // Initialize 10 winner fields
  const [lastWinners, setLastWinners] = useState<string[]>(Array(10).fill(''));
  const router = useRouter();

  // Check if all fields have values (not empty)
  const allFieldsFilled = lastWinners.every((winner) => winner.trim() !== '');

  const goToMultiplier = () => {
    if (!allFieldsFilled) {
      Alert.alert('Incomplete Input', 'Please fill in all previous winners before proceeding.');
      return;
    }

    // Pass winners as a comma-separated string to MultiplierScreen
    router.push({
      pathname: '/screens/MultiplierScreen',
      params: { lastWinners: lastWinners.join(',') },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Winner inputs component */}
        <WinnerInput lastWinners={lastWinners} setLastWinners={setLastWinners} />

        {/* Next button is disabled until all inputs are filled */}
        <Button title="Next" onPress={goToMultiplier} disabled={!allFieldsFilled} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 16,
  },
});
