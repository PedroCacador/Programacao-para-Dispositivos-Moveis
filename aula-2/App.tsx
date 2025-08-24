import React, { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, StyleSheet, Text, View } from 'react-native';
import AddItem from "./components/AddItem";

export default function App() {
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text>Lista de itens muito fera!</Text>
        <AddItem />
      </SafeAreaView>
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
