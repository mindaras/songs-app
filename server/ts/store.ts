interface IStore {
  add(id: number): void;
  remove(id: number): void;
  getItems(): number[]
}

class Store implements IStore {
  private _items: number[] = [];

  add(id: number): void {
    this._items = [...this._items, id];
  }
  
  remove(id: number): void {
    this._items = this._items.filter(itemId => itemId !== id);
  }

  getItems(): number[] {
    return [...this._items];
  }
}

export default Store;
