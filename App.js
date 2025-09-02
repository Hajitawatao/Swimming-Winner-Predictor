import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import WinnerInput from './components/WinnerInput';

export default function App() {
  const [lastWinners, setLastWinners] = useState(Array(10).fill('')); // 10 empty winners

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <WinnerInput lastWinners={lastWinners} setLastWinners={setLastWinners} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
  },
});
