import mongoose, { model, Schema } from 'mongoose';
import { Film, ProtoFilms } from '../interface/films.js';
import { Data, id } from './data.js';

export class FilmsRepository implements Data<Film> {
    #schema = new Schema({
        title: {
            type: String,
            required: true,
            unique: true,
        },
        genre: String,
        isGood: Boolean,
    });

    #Model = model('Film', this.#schema, 'films');

    constructor() {
        this.#schema.set('toJSON', {
            transform: (_document, returnedObject) => {
                returnedObject.id = returnedObject._id;
                delete returnedObject.__v;
                delete returnedObject._id;
            },
        });
    }

    async getAll(): Promise<Array<Film>> {
        return this.#Model.find();
    }

    async get(id: id): Promise<Film> {
        const result = await this.#Model.findById(id);
        if (!result) throw new Error('Not found id');
        return result as Film;
    }

    async post(newFilm: ProtoFilms): Promise<Film> {
        const result = await this.#Model.create(newFilm);
        return result as Film;
    }

    async patch(id: id, updateFilm: Partial<Film>): Promise<Film> {
        const result = await this.#Model.findByIdAndUpdate(id, updateFilm, {
            new: true,
        });
        if (!result) throw new Error('Not found id');
        return result as Film;
    }

    async delete(id: id): Promise<void> {
        const result = await this.#Model.findByIdAndDelete(id);
        if (result === null) throw new Error('Not found id');
        return;
    }

    #disconnect() {
        mongoose.disconnect();
        console.log(mongoose.connection.readyState);
    }

    getModel() {
        return this.#Model;
    }
}
