"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const axios_1 = __importDefault(require("axios"));
const store_1 = __importDefault(require("./store"));
const utils_1 = require("./utils");
const app = express_1.default();
const port = 8000;
const favorites = new store_1.default();
const endpoints = {
    favorites: '/favorites',
    songsById: '/songsById/:id',
    songsByTerm: '/songsByTerm/:term',
    itunesById: 'https://itunes.apple.com/lookup?id=',
    itunesByTerm: 'https://itunes.apple.com/search?term=',
    localhost: 'http://localhost:3000'
};
app.use(cors_1.default({ origin: endpoints.localhost }));
app.use(express_1.default.json());
app.post(endpoints.favorites, (req, res) => {
    const { id } = req.body;
    favorites.add(id);
    res.status(201).json({ id });
});
app.delete(`${endpoints.favorites}/:id`, (req, res) => {
    const id = parseInt(req.params.id, 10);
    favorites.remove(id);
    res.status(200).json({ id });
});
app.get(endpoints.songsById, (req, res) => {
    const { id } = req.params;
    axios_1.default
        .get(`${endpoints.itunesById}${id}`)
        .then(response => {
        const { data } = response;
        res.status(200).json({
            results: utils_1.mapWithFavorites(data.results, favorites.getItems()) || []
        });
    })
        .catch(() => res.json({ results: [] }));
});
app.get(endpoints.songsByTerm, (req, res) => {
    const { term } = req.params;
    axios_1.default
        .get(`${endpoints.itunesByTerm}${term}`)
        .then(response => {
        const { data } = response;
        res.status(200).json({
            results: utils_1.mapWithFavorites(data.results, favorites.getItems()) || []
        });
    })
        .catch(() => res.json({ results: [] }));
});
app.listen(port, () => console.log(`listening on port ${port}`));
