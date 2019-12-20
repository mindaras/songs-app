import express, { Request as IRequest, Response as IResponse } from 'express';
import cors from 'cors';
import axios from 'axios';
import Store from './store';
import { mapWithFavorites, Item } from './utils';

const app = express();
const port = 8000;
const favorites = new Store();
const endpoints = {
  favorites: '/favorites',
  songsById: '/songsById/:id',
  songsByTerm: '/songsByTerm/:term',
  itunesById: 'https://itunes.apple.com/lookup?id=',
  itunesByTerm: 'https://itunes.apple.com/search?term=',
  localhost: 'http://localhost:3000'
};

type ITunesResponse = {
  results: Array<Item>;
}

app.use(cors({ origin: endpoints.localhost }));

app.use(express.json());

interface IPostRequest extends IRequest {
  body: {
    id: number
  }
}

app.post(endpoints.favorites, (req: IPostRequest, res: IResponse): void => {
  const { id } = req.body;
  favorites.add(id);
  res.status(201).json({ id });
});

interface IDeleteRequest extends IRequest {
  params: {
    id: string
  }
}

app.delete(
  `${endpoints.favorites}/:id`,
  (req: IDeleteRequest, res: IResponse): void => {
    const id = parseInt(req.params.id, 10);
    favorites.remove(id);
    res.status(200).json({ id });
  }
);

app.get(endpoints.songsById, (req: IRequest, res: IResponse): void => {
  const { id } = req.params;
  axios
    .get<ITunesResponse>(`${endpoints.itunesById}${id}`)
    .then(response => {
      const { data } = response;
      res.status(200).json({
        results: mapWithFavorites(data.results, favorites.getItems()) || []
      });
    })
    .catch(() => res.json({ results: [] }));
});

app.get(endpoints.songsByTerm, (req: IRequest, res: IResponse): void => {
  const { term } = req.params;
  axios
    .get<ITunesResponse>(`${endpoints.itunesByTerm}${term}`)
    .then(response => {
      const { data } = response;
      res.status(200).json({
        results: mapWithFavorites(data.results, favorites.getItems()) || []
      });
    })
    .catch(() => res.json({ results: [] }));
});

app.listen(port, () => console.log(`listening on port ${port}`));
