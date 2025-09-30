import React, { createContext, useReducer, useContext, useState } from "react";
import {
  Text,
  StyleSheet,
  Button,
  View,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import { Card } from "react-native-paper";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

type RootStackParamList = {
  Tabs: undefined;
  PageStack: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

type Item = { id: string; image: string };
type State = { items: Item[]; theme: "light" | "dark" };
type Action =
  | { type: "ADD_ITEM"; payload: Item }
  | { type: "TOGGLE_THEME" }
  | { type: "CLEAR" };

const initialState: State = {
  items: [],
  theme: "light",
};

function appReducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_ITEM":
      return { ...state, items: [...state.items, action.payload] };
    case "TOGGLE_THEME":
      return { ...state, theme: state.theme === "light" ? "dark" : "light" };
    case "CLEAR":
      return { ...state, items: [] };
    default:
      return state;
  }
}

const AppContext = createContext<any>(null);
const useAppContext = () => useContext(AppContext);

function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { state, dispatch } = useAppContext();
  const [loading, setLoading] = useState(false);

  async function fetchDog() {
    setLoading(true);
    try {
      const res = await fetch("https://dog.ceo/api/breeds/image/random");
      const data = await res.json();
      dispatch({
        type: "ADD_ITEM",
        payload: { id: String(Date.now()), image: data.message },
      });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={[styles.container, state.theme === "dark" && { backgroundColor: "#333" }]}>
      <Text style={[styles.paragraph, { color: state.theme === "dark" ? "#fff" : "#000" }]}>
        Tela Inicial
      </Text>
      <Button title={loading ? "Carregando..." : "Adicionar cachorro"} onPress={fetchDog} />
      <Button title="Ir para Detalhes" onPress={() => navigation.navigate("PageStack")} />
      <Button title="Alternar Tema" onPress={() => dispatch({ type: "TOGGLE_THEME" })} />
    </View>
  );
}

function PageStack() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { state, dispatch } = useAppContext();
  const { width } = Dimensions.get("window");

  return (
    <SafeAreaView style={[styles.container, state.theme === "dark" && { backgroundColor: "#222" }]}>
      <Text style={[styles.paragraph, { color: state.theme === "dark" ? "#fff" : "#000" }]}>
        Página dois com STACK! Lista de cachorros da API:
      </Text>

      <FlatList
        data={state.items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Image
              source={{ uri: item.image }}
              style={{ width: width * 0.8, height: width * 0.5, borderRadius: 10 }}
              resizeMode="cover"
            />
          </Card>
        )}
      />

      <Button title="Limpar lista" onPress={() => dispatch({ type: "CLEAR" })} />
      <Button title="Voltar" onPress={() => navigation.goBack()} />
    </SafeAreaView>
  );
}

function PageTab() {
  const { state } = useAppContext();
  return (
    <SafeAreaView style={[styles.container, state.theme === "dark" && { backgroundColor: "#222" }]}>
      <Text style={[styles.paragraph, { color: state.theme === "dark" ? "#fff" : "#000" }]}>
        Página com TAB - Tema atual: {state.theme}
      </Text>
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

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Tabs" component={Tabs} />
          <Stack.Screen name="PageStack" component={PageStack} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  card: {
    margin: 10,
    padding: 10,
    elevation: 3,
    borderRadius: 10,
  },
});
