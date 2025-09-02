import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { Button, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import MultiplierSelector from '../../components/MultiplierSelector';

type MultiplierType = {
  Hati: number;
  Alligator: number;
  Tiger: number;
  Panda: number;
  Hippo: number;
  KingKong: number;
};

type MultiplierScreenProps = {
  lastWinners?: string[];
};

const defaultMultiplier: MultiplierType = {
  Hati: 0.5,
  Alligator: 1,
  Tiger: 1.5,
  Panda: 2,
  Hippo: 3,
  KingKong: 5,
};

const characters = ['Hati', 'Alligator', 'Tiger', 'Panda', 'Hippo', 'KingKong'];

export default function MultiplierScreen({ lastWinners }: MultiplierScreenProps) {
  const initialWinners = lastWinners && lastWinners.length === 10 ? lastWinners : Array(10).fill('');

  const [selectedRound, setSelectedRound] = useState(1);
  const [selectedMultiplier, setSelectedMultiplier] = useState<MultiplierType>(defaultMultiplier);
  const [predictedWinner, setPredictedWinner] = useState<string>('');
  const [recentWinners, setRecentWinners] = useState<string[]>([...initialWinners]);
  const [actualWinner, setActualWinner] = useState<string | undefined>(undefined);

  const predictWinner = () => {
    const scores: MultiplierType = { ...selectedMultiplier };

    characters.forEach((char) => {
      const count = recentWinners.filter((w) => w === char).length;
      scores[char as keyof MultiplierType] =
        selectedMultiplier[char as keyof MultiplierType] / (count + 1);
    });

    const totalScore = Object.values(scores).reduce((sum, val) => sum + val, 0);
    let cumulative = 0;
    const rand = Math.random();
    let nextWinner = characters[0];

    for (const char of characters) {
      cumulative += scores[char as keyof MultiplierType] / totalScore;
      if (rand <= cumulative) {
        nextWinner = char;
        break;
      }
    }

    setPredictedWinner(nextWinner);
  };

  const recordActualWinner = () => {
    if (!actualWinner) return;
    setRecentWinners((prev) => [...prev.slice(1), actualWinner]);
    setPredictedWinner('');
    setActualWinner(undefined);
  };

  const resetAll = () => {
    setRecentWinners([...initialWinners]);
    setPredictedWinner('');
    setActualWinner(undefined);
    setSelectedRound(1);
    setSelectedMultiplier(defaultMultiplier);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <MultiplierSelector
          selectedRound={selectedRound}
          setSelectedRound={setSelectedRound}
          selectedMultiplier={selectedMultiplier}
          setSelectedMultiplier={setSelectedMultiplier}
        />

        <View style={styles.section}>
          <Button
            title="Predict Next Winner"
            onPress={predictWinner}
            disabled={predictedWinner !== ''}
          />
          {predictedWinner !== '' && (
            <Text style={styles.output}>Next Possible Winner: {predictedWinner}</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Record Actual Winner:</Text>
          <Picker
            selectedValue={actualWinner}
            onValueChange={(value: string) => setActualWinner(value)}
            style={styles.picker}
          >
            <Picker.Item label="Select Winner..." value={undefined} />
            {characters.map((char) => (
              <Picker.Item key={char} label={char} value={char} />
            ))}
          </Picker>
          <Button
            title="Record Actual Winner"
            onPress={recordActualWinner}
            disabled={!actualWinner}
          />
        </View>

        <View style={styles.section}>
          <Button title="Reset" color="red" onPress={resetAll} />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Recent 10 Winners:</Text>
          {recentWinners.map((w, i) => (
            <Text key={i}>
              {i + 1}. {w}
            </Text>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', margin: 16 },
  section: { marginVertical: 16 },
  label: { fontWeight: 'bold', marginBottom: 8 },
  output: { fontSize: 16, fontWeight: 'bold', marginTop: 8 },
  picker: { height: 50, width: '100%' },
});
