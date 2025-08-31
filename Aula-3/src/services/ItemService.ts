import Item from "../models/Item";

class ItemService {
    private items: Item[] = [
        { id: '1', title: 'Item Exemplo 1' },
        { id: '2', title: 'Item Exemplo 2' },
    ]

    generateId = () => Date.now().toString();

    addItem(título: string) {
        const item: Item = { id: this.generateId(), title: título };
        this.items.push(item);

        return item;
    }

    updateItem(item: Item) {
        const index = this.items.findIndex(i => i.id === item.id);
        if (index >= 0) {
            this.items[index] = item;
        }

        return this.items;
    }

    getAllItems() {
        return this.items;
    }

    deleteItem(id: string) {
        this.items = this.items.filter(item => item.id !== id)

        return this.items;
    }



}
export default new ItemService();