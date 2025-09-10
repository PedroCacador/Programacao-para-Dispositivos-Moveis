import React from "react";
import { Text, StyleSheet, SafeAreaView, Button, View } from 'react-native';
import { Card } from 'react-native-paper';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

type RootStackParamList = {
  Tabs: undefined;
  PageStack: undefined;
};

  const Stack = createNativeStackNavigator<RootStackParamList>();
  const Tab = createBottomTabNavigator();


function HomeScreen() {

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Text>Tela Inicial</Text>
      <Button
        title="Ir para Detalhes"
        onPress={() => navigation.navigate('PageStack')} 
      />
    </View>
  );
}

function PageStack() {

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView>
      <Text style={styles.paragraph}>Pagina dois aqui com STACK!</Text>
      <Button
        title="Voltar"
        onPress={() => navigation.goBack()}
      />
    </SafeAreaView>
  );
}

function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Tab" component={PageTab} />
    </Tab.Navigator>
  );
}


function PageTab() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.paragraph}>Pagina com o TAB</Text>
    </SafeAreaView>
  );
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Tabs"
          component={Tabs}
        />
        <Stack.Screen name="PageStack" component={PageStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
