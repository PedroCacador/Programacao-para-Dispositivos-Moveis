import React, { useState } from 'react';
import { StyleSheet, Text, Button, View, Modal, TextInput, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AddItem() {
    const [modalVisivel, setModalVisivel] = useState(false);

    const [items, setItems] = useState([]);
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [urlImagem, setImagemUrl] = useState('');

    function adicionarItem() {
        if (titulo.trim() && descricao.trim() && urlImagem.trim()) {
            const novoItem = { 
                titulo, 
                descricao, 
                urlImagem };
            setItems([...items, novoItem]);
            setTitulo('');
            setDescricao('');
            setImagemUrl('');
            setModalVisivel(false);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={items}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.titulo}>{item.titulo}</Text>
                        <Text style={styles.descricao}>{item.descricao}</Text>
                        <Image source={{ uri: item.urlImagem }} style={styles.imagem} />
                    </View>
                )}
                contentContainerStyle={{ paddingBottom: 100 }}
            />

            <Button title="Adicionar item!" onPress={() => setModalVisivel(true)} />

            <Modal
                visible={modalVisivel}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setModalVisivel(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TextInput
                            placeholder="Digite o título"
                            value={titulo}
                            onChangeText={setTitulo}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Digite a descrição"
                            value={descricao}
                            onChangeText={setDescricao}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="URL da imagem"
                            value={urlImagem}
                            onChangeText={setImagemUrl}
                            style={styles.input}
                        />
                        <Button title="Adicionar na lista" onPress={adicionarItem} />
                        <Button title="Fechar" onPress={() => setModalVisivel(false)} />
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#ffffffff'
    },
    card: {
        backgroundColor: '#fff',
        padding: 12,
        marginBottom: 10,
        borderRadius: 8,
        elevation: 2
    },
    titulo: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    descricao: {
        fontSize: 14,
        marginBottom: 6
    },
    imagem: {
        width: '100%',
        height: 150,
        borderRadius: 6
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalContent: {
        backgroundColor: '#fff',
        margin: 20,
        padding: 20,
        borderRadius: 10
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
        padding: 8,
        borderRadius: 6
    },
});
