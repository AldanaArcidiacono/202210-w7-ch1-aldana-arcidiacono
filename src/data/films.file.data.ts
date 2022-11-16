import fs from 'fs/promises';
import * as dotenv from 'dotenv';
import { Film, Films } from '../interface/films.js';
import { Data, id } from './data.js';
dotenv.config();

export class FilmsFileData implements Data<Film> {
    dataFileURL: string;
    constructor() {
        this.dataFileURL = './src/db.json';
    }
    async getAll(): Promise<Array<Film>> {
        //Thing.find; //get all
    }

    async get(id: id): Promise<Film> {
        // Thing.findById; // get
    }

    async post(newFilm: Partial<Film>): Promise<Film> {
        //  Thing.create; // add
    }

    async patch(id: id, updateFilm: Partial<Film>): Promise<Film> {
        //  Thing.updateOne; // update
        //  Thing.findByIdAndUpdate; // update
    }

    async delete(id: id): Promise<void> {
        //  Thing.deleteOne; // delete
        return;
    }

    #createID() {
        return Math.trunc(Math.random() * 1000);
    }

    #saveData(data: Films) {
        return fs.writeFile(this.dataFileURL, JSON.stringify(data));
    }
}
