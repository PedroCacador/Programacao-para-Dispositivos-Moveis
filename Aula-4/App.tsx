import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ItemView } from "./src/view/ItemView";
import { useBatteryLevel } from "expo-battery";
import Checkbox from "expo-checkbox";

export default function App() {

  const nivelBateria = useBatteryLevel();
  const [isChecked, setChecked] = useState(false);


  return (
    <View style={styles.container}>
      <ItemView />
      <View>
        <Text>Nivel de bateria: {nivelBateria} %</Text>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
