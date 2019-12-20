import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { fetchSongs, FetchSongsAction, FetchSongsProps as State } from "../actions";
import { State as SongsState } from '../reducers'

type SearchProps = {
  loading: boolean,
  fetchSongs: (props: State) => FetchSongsAction
}

const Search = ({ fetchSongs, loading }: SearchProps): JSX.Element => {
  const [state, setState] = useState<State>({ searchType: "term", input: "" });
  const onInputChange = useCallback(
    e => setState({ ...state, input: e.target.value }),
    [state]
  );
  const onTypeChange = useCallback(
    e => setState({ ...state, searchType: e.target.value }),
    [state]
  );
  const onSubmit = useCallback(() => {
    const { searchType, input } = state;
    if (!input.length) return;
    fetchSongs({ searchType, input });
  }, [state, fetchSongs]);

  return (
    <Container>
      <TopBar>
        <SearchInput
          onChange={onInputChange}
          placeholder={
            state.searchType === "term" ? "Search term" : "Track ID"
          }
        />
        <SearchType onChange={onTypeChange}>
          <option value="term">Term</option>
          <option value="id">ID</option>
        </SearchType>
      </TopBar>
      {loading ? "fetching..." : <Submit onClick={onSubmit}>Search</Submit>}
    </Container>
  );
};

const mapStateToProps = ({ songs }: { songs: SongsState }) => ({ loading: songs.loading });

export default connect(mapStateToProps, { fetchSongs })(Search);

const Container = styled.main`
  margin-bottom: 40px;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  border: 1px solid #000;
  padding: 10px 15px;
  display: block;
  max-width: 500px;
  width: 100%;
  outline: none;
  margin-right: 20px;
`;

const SearchType = styled.select`
  height: 35px;
  outline: none;
`;

const Submit = styled.button`
  border: 1px solid #000;
  padding: 10px 20px;
  &:hover {
    background-color: #000;
    color: #fff;
  }
  transition: ease 0.3s;
  cursor: pointer;
  min-width: 250px;
  outline: none;
`;
