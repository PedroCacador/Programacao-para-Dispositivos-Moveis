import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ItemView } from "./src/view/ItemView";
import { useBatteryLevel } from "expo-battery";
import Checkbox from "expo-checkbox";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";

export default function App() {
  const nivelBateria = useBatteryLevel();
  const [isChecked, setChecked] = useState(false);

  const handleCheckbox = (value: boolean) => {
    setChecked(value);
    if (value) {
      Haptics.selectionAsync();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ItemView />

      <Text style={styles.text}>Nível de bateria: {nivelBateria} %</Text>

      <View style={styles.checkbox}>
        <Checkbox value={isChecked} onValueChange={handleCheckbox} />
        <Text style={styles.text}>Checkbox que vibra muito pouco kkkkkk</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 20, 
  },
  text: {
    marginVertical: 10,
    fontSize: 16,
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
});
