import { useState, Alert } from "react";
import Item from '../models/Item';
import ItemService from "../services/ItemService";

export const useItemController = () => {

    const [items, setItems] = useState<Item[]>([]);

    const [modalVisible, setModalVisible] = useState(false);
    const [editingItem, setEditingItem] = useState<Item | null>(null);
    const [inputText, setInputText] = useState('');


    const addItem = () => {
        if (!inputText.trim()) {
            Alert.alert('Erro', 'Digite um título');
            return;
        }

        const newItem: Item = ItemService.addItem(inputText.trim());

        setItems([...items, newItem]);
        closeModal();
    };

    const updateItem = () => {
        if (!inputText.trim() || !editingItem) {
            Alert.alert('Erro', 'Digite um título');
            return;
        }

        const itemUpdate: Item = { id: editingItem.id, title: inputText.trim() };

        setItems([...ItemService.updateItem(itemUpdate)]);

        closeModal();
    };

    const deleteItem = () => {
        if (!editingItem) return;

        setItems([...ItemService.deleteItem(editingItem.id)]);
        closeModal();
    };

    const closeModal = () => {
        setInputText('');
        setEditingItem(null);
        setModalVisible(false);
    };

    const openAddModal = () => {
        setInputText('');
        setEditingItem(null);
        setModalVisible(true);
    };

    const openEditModal = (item: Item) => {
        setInputText(item.title);
        setEditingItem(item);
        setModalVisible(true);
    };

    return {
        items,
        editingItem,
        setItems,
        openEditModal,
        modalVisible,
        deleteItem,
        updateItem,
        addItem,
        closeModal,
        openAddModal,
        inputText,
        setInputText,
        setEditingItem
    }

}