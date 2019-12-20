export type Item = {
  wrapperType: string;
  trackId: number;
  artistId: number;
}

interface IExtendedItem extends Item {
  id: number;
  isFavorite: boolean;
}

export const getItemId = (item: Item): number => {
  const { wrapperType, trackId, artistId } = item;
  return wrapperType === 'track' ? trackId : artistId;
};

export const mapWithFavorites = (
  items: Array<Item>,
  favorites: Array<number>
): Array<IExtendedItem> => {
  return items
    .map(item => {
      const id = getItemId(item);
      const isFavorite = favorites.includes(id);
      return { ...item, id, isFavorite };
    })
    .sort(item => (item.isFavorite ? -1 : 0));
};
