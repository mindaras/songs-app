import React, { useCallback } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {
  addToFavorites,
  removeFromFavorites,
  Song,
  FavoritesAction
} from '../actions';
import { State as SongsState } from '../reducers'

type ActionTypes = {
  addToFavorites: (id: number) => FavoritesAction;
  removeFromFavorites: (id: number) => FavoritesAction;
}

interface IRowProps extends Song, ActionTypes { }

const Row = ({
  trackPrice,
  artistName,
  releaseDate,
  id,
  isFavorite,
  addToFavorites,
  removeFromFavorites
}: IRowProps) => {
  const onClick = useCallback(() => {
    if (isFavorite) removeFromFavorites(id);
    else addToFavorites(id);
  }, [id, isFavorite, addToFavorites, removeFromFavorites]);

  return (
    <RowContainer>
      {trackPrice && <Cell>{trackPrice}</Cell>}
      <Cell>{artistName}</Cell>
      {releaseDate && <Cell>{new Date(releaseDate).toLocaleDateString()}</Cell>}
      <FavoritesButton onClick={onClick}>
        {isFavorite ? 'Not favorite' : 'Mark as favorite'}
      </FavoritesButton>
    </RowContainer>
  );
};

interface IRenderRowsProps extends ActionTypes {
  items: Array<Song>
}

const renderRows = ({ items, ...rest }: IRenderRowsProps): Array<JSX.Element> => {
  return items.map((item, i) => <Row key={`${item.id}-${i}`} {...item} {...rest} />);
};

interface ISongsProps extends ActionTypes {
  loading: boolean,
  items: Array<Song>
}

const Songs = ({ loading, items, addToFavorites, removeFromFavorites }: ISongsProps): JSX.Element | null => {
  if (loading || !items.length) return null;
  return (
    <Container>
      {renderRows({ items, addToFavorites, removeFromFavorites })}
    </Container>
  );
};

const mapStateToProps = ({ songs }: { songs: SongsState }) => ({
  loading: songs.loading,
  items: songs.items
});

export default connect(
  mapStateToProps,
  {
    addToFavorites,
    removeFromFavorites
  }
)(Songs);

const Container = styled.main`
  border: 1px solid #000;
`;

const RowContainer = styled.div`
  display: flex;
  padding: 10px 20px;
  &:not(:last-of-type) {
    border-bottom: 1px solid #000;
  }
`;

const Cell = styled.span`
  display: block;
  flex: 1;
  padding: 0 20px;
`;

const FavoritesButton = styled.button`
  outline: none;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;
