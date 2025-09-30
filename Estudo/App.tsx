import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CardMain from './CardMain';


const DATA = [
  {
    id: '1',
    title: 'Primeiro Item',
  },
  {
    id: '2',
    title: 'Segundo Item',
  }
];


export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <CardMain
          title="Pelé – O Rei do Futebol"
          content="Considerado um dos maiores jogadores de todos os tempos, tricampeão mundial com a Seleção Brasileira."
          imageUrl="https://sismf.museudofutebol.org/anexos/imagem/475622/w:640/h:640/c:0"
        />
        <CardMain
          title="Pelé – O Rei do Futebol"
          content="Considerado um dos maiores jogadores de todos os tempos, tricampeão mundial com a Seleção Brasileira."
          imageUrl="https://sismf.museudofutebol.org/anexos/imagem/475622/w:640/h:640/c:0"
        />
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
