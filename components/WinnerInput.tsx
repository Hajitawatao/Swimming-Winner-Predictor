import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface WinnerInputProps {
  lastWinners: string[];
  setLastWinners: (winners: string[]) => void;
}

const characters = ['Hati', 'Alligator', 'Tiger', 'Panda', 'Hippo', 'KingKong'];

const WinnerInput: React.FC<WinnerInputProps> = ({ lastWinners, setLastWinners }) => {
  const handleChange = (value: string, index: number) => {
    const updated = [...lastWinners];
    updated[index] = value;
    setLastWinners(updated);
  };

  return (
    <View>
      <Text style={styles.title}>Last 10 Winners (latest → oldest):</Text>
      {lastWinners.map((winner, index) => (
        <Picker
          key={index}
          selectedValue={winner}
          onValueChange={(value) => handleChange(value, index)}
          style={styles.picker}
        >
          <Picker.Item label="Select Winner" value="" />
          {characters.map((char) => (
            <Picker.Item key={char} label={char} value={char} />
          ))}
        </Picker>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 8, color: '#000' },
  picker: {
    height: 50,
    width: '100%',
    marginVertical: 4,
    color: '#000', // text color
  },
});

export default WinnerInput;
