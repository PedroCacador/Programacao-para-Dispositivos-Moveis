import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  StyleSheet,
} from "react-native";
import { useItemController } from "../controllers/ItemController";
import Item from "../models/Item";

export const ItemView: React.FC = () => {
  const { items, addItem, deleteItem } = useItemController();
  const [modalVisible, setModalVisible] = useState(false);
  const [newItemName, setNewItemName] = useState("");

  const handleAddItem = () => {
    if (newItemName.trim().length > 0) {
      const newItem: Item = {
        id: Math.random().toString(),
        name: newItemName,
      };
      addItem(newItem);
      setNewItemName("");
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Itens</Text>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.name}</Text>
            <TouchableOpacity
              style={[styles.button, styles.deleteButton]}
              onPress={() => deleteItem(item.id)}
            >
              <Text style={[styles.buttonText, styles.deleteButtonText]}>
                Excluir
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity
        style={[styles.button, styles.addButton]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={[styles.buttonText, styles.addButtonText]}>Adicionar</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.input}
              placeholder="Nome do item"
              value={newItemName}
              onChangeText={setNewItemName}
            />

            <TouchableOpacity
              style={[styles.button, styles.addButton]}
              onPress={handleAddItem}
            >
              <Text style={[styles.buttonText, styles.addButtonText]}>
                Salvar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={[styles.buttonText, styles.cancelButtonText]}>
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  itemText: {
    fontSize: 16,
  },
  button: {
    padding: 10,
    borderRadius: 8,
  },
  addButton: {
    backgroundColor: "#4CAF50",
    marginTop: 20,
  },
  addButtonText: {
    color: "#fff",
  },
  deleteButton: {
    backgroundColor: "#f44336",
  },
  deleteButtonText: {
    color: "#fff",
  },
  cancelButton: {
    backgroundColor: "#9e9e9e",
    marginTop: 10,
  },
  cancelButtonText: {
    color: "#fff",
  },
  buttonText: {
    fontSize: 16,
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    margin: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
});
