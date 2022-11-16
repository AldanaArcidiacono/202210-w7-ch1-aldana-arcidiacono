import * as dotenv from 'dotenv';
import mongoose, { model, Schema } from 'mongoose';
import { Film } from '../interface/films.js';
import { Data, id } from './data.js';
dotenv.config();
const name = 'films';

export class FilmsFileData implements Data<Film> {
    uri: string;
    constructor() {
        this.uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@${process.env.CLUSTER}/${name}?retryWrites=true&w=majority`;
    }

    filmSchema = new Schema({
        title: mongoose.SchemaTypes.String,
        genre: mongoose.SchemaTypes.String,
        isGood: mongoose.SchemaTypes.Boolean,
    });

    FavFilm = model('FavFilm', this.filmSchema, 'favFilms');

    async getAll(): Promise<Array<Film>> {
        mongoose.connect(this.uri);
        return await this.FavFilm.find();
        //Thing.find; //get all
    }

    async get(id: id): Promise<Film> {
        // Thing.findById; // get
    }

    async post(newFilm: Partial<Film>): Promise<Film> {
        // mongoose.connect(this.uri);
        // const info = await this.FavFilm.create(this.#createID, {
        //     title: 'Harry Potter and the Prisoner of Azkaban',
        //     genre: 'Fantasy and adventure',
        //     isGood: true,
        // });
        //  Thing.create; // add
    }

    async patch(id: id, updateFilm: Partial<Film>): Promise<Film> {
        //  Thing.updateOne; // update
        //  Thing.findByIdAndUpdate; // update
    }

    async delete(id: id): Promise<void> {
        const connector = mongoose.connect(this.uri);
        await this.FavFilm.findByIdAndDelete(id);
        //  Thing.deleteOne; // delete
    }

    #createID() {
        return Math.trunc(Math.random() * 1000);
    }
}
