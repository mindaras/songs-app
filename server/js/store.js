"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Store {
    constructor() {
        this._items = [];
    }
    add(id) {
        this._items = [...this._items, id];
    }
    remove(id) {
        this._items = this._items.filter(itemId => itemId !== id);
    }
    getItems() {
        return [...this._items];
    }
}
exports.default = Store;
