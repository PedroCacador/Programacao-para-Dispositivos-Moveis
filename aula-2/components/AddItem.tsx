import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, Button, View, Modal, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AddItem() {
    const [modalVisivel, setModalVisivel] = useState(false);

    const [items, setItems] = useState([]);
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [urlImagem, setImagemUrl] = useState('');

    const criarItem(){
        const novoItem = {
        titulo: titulo,
        descricao: descricao,
        imagem: urlImagem,
      };
    }

    return (
        <SafeAreaView>
            <Button title="Adicionar item!" onPress={() => setModalVisivel(true)} />
            <Modal visible={modalVisivel}
                transparent={true}
                animationType='fade'
                onRequestClose={() => setModalVisivel(false)}>
                <View>
                    <Text>Titulo</Text>
                    <TextInput placeholder="Digite o título" />
                    <TextInput placeholder="Digite a descrição" />
                    <TextInput placeholder="URL da imagem" />
                    <Button title="Fechar" onPress={() => setModalVisivel(false)} />
                </View>
            </Modal>
        </SafeAreaView>

    );
}