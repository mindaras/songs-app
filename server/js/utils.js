"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getItemId = (item) => {
    const { wrapperType, trackId, artistId } = item;
    return wrapperType === 'track' ? trackId : artistId;
};
exports.mapWithFavorites = (items, favorites) => {
    return items
        .map(item => {
        const id = exports.getItemId(item);
        const isFavorite = favorites.includes(id);
        return Object.assign(Object.assign({}, item), { id, isFavorite });
    })
        .sort(item => (item.isFavorite ? -1 : 0));
};
