import fs from 'fs/promises';
import * as dotenv from 'dotenv';
import { Data, id } from './data.js';
import { Pet, Pets } from '../interface/pets.js';
dotenv.config();

export class PetFileData implements Data<Pet> {
    dataFileURL: string;
    constructor() {
        this.dataFileURL = './src/db.json';
    }

    async getAll(): Promise<Array<Pet>> {
        return fs.readFile(this.dataFileURL, 'utf-8').then((data) => {
            const saveArr = JSON.parse(data) as Pets;
            return saveArr.pets;
        });
    }

    async get(id: id): Promise<Pet> {
        return fs.readFile(this.dataFileURL, 'utf-8').then((data) => {
            const aData = JSON.parse(data) as Pets;
            const item = aData.pets.find((item) => item.id === id);
            if (!item) throw new Error();
            return item;
        });
    }

    async post(newPet: Partial<Pet>): Promise<Pet> {
        const aData = await this.getAll();
        const ultimatePet = { ...(newPet as Pet), id: this.#createID() };
        aData.push(ultimatePet);
        await this.#saveData({ pets: aData });
        return ultimatePet;
    }

    async patch(id: id, updatePet: Partial<Pet>): Promise<Pet> {
        const aData = await this.getAll();
        const index = aData.findIndex((item) => item.id === id);
        if (!index) throw new Error('ID Not Found');
        aData[index] = {
            ...aData[index],
            ...updatePet,
        };
        await this.#saveData({ pets: aData });
        return aData[index];
    }

    async delete(id: id): Promise<void> {
        const aData = await this.getAll();
        const index = aData.findIndex((item) => item.id === id);
        if (!index) throw new Error('ID Not Found');
        const finalAData = aData.filter((item) => item.id !== id);
        await this.#saveData({ pets: finalAData });
    }

    #createID() {
        return Math.trunc(Math.random() * 1000);
    }

    #saveData(data: Pets) {
        return fs.writeFile(this.dataFileURL, JSON.stringify(data));
    }
}
