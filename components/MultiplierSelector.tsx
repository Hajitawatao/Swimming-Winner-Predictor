import { Picker } from '@react-native-picker/picker';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const multipliersTable = [
  { round: 1, Hati: 3, Alligator: 3, Tiger: 9, Panda: 12, Hippo: 16, KingKong: 24 },
  { round: 2, Hati: 2, Alligator: 3, Tiger: 4, Panda: 6, Hippo: 8, KingKong: 12 },
  { round: 3, Hati: 2, Alligator: 4, Tiger: 6, Panda: 10, Hippo: 12, KingKong: 15 },
];

const characters = ['Hati', 'Alligator', 'Tiger', 'Panda', 'Hippo', 'KingKong'] as const;

export interface MultiplierSelectorProps {
  selectedRound: number;
  setSelectedRound: (round: number) => void;
  selectedMultiplier: {
    Hati: number;
    Alligator: number;
    Tiger: number;
    Panda: number;
    Hippo: number;
    KingKong: number;
  };
  setSelectedMultiplier: React.Dispatch<
    React.SetStateAction<{
      Hati: number;
      Alligator: number;
      Tiger: number;
      Panda: number;
      Hippo: number;
      KingKong: number;
    }>
  >;
}

export default function MultiplierSelector({
  selectedRound,
  setSelectedRound,
  selectedMultiplier,
  setSelectedMultiplier,
}: MultiplierSelectorProps) {
  useEffect(() => {
    const roundData = multipliersTable.find((r) => r.round === selectedRound);
    if (roundData) {
      // Only pick the character multipliers to avoid including `round` in state
      const { round, ...charMultipliers } = roundData;
      setSelectedMultiplier(charMultipliers);
    }
  }, [selectedRound]);

  return (
    <View>
      <Text style={styles.title}>Select Round & Multipliers</Text>

      <Picker
        selectedValue={selectedRound}
        onValueChange={(value) => setSelectedRound(Number(value))}
        style={styles.picker}
      >
        {multipliersTable.map((r) => (
          <Picker.Item key={r.round} label={`Round ${r.round}`} value={r.round} />
        ))}
      </Picker>

      {characters.map((char) => (
        <View key={char} style={styles.pickerRow}>
          <Text style={styles.char}>{char}</Text>
          <Picker
            selectedValue={selectedMultiplier[char]}
            onValueChange={(value) =>
              setSelectedMultiplier({ ...selectedMultiplier, [char]: Number(value) })
            }
            style={styles.picker}
          >
            <Picker.Item
              label={`${selectedMultiplier[char]}`}
              value={selectedMultiplier[char]}
            />
          </Picker>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  pickerRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 4 },
  char: { width: 100, fontSize: 16 },
  picker: { flex: 1, height: 50 },
});
