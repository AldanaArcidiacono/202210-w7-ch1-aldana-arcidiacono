import mongoose from 'mongoose';
import { dbConnect } from '../db.conect';
import { FilmsRepository } from './films.repository';

const mockFilms = [
    {
        title: 'Titanic',
        genre: 'Romance',
        isGood: true,
    },
    {
        title: 'Terminator',
        genre: 'Action',
        isGood: true,
    },
];

describe('Given the FilmRepository', () => {
    const repository = new FilmsRepository();
    let testIds: Array<string>;
    beforeAll(async () => {
        await dbConnect();
        await repository.getModel().deleteMany();
        await repository.getModel().insertMany(mockFilms);
        const data = await repository.getModel().find();
        testIds = [data[0].id, data[1].id];
    });

    describe('When we instantiate...', () => {
        test('Then getAll() should return the mockFilm', async () => {
            const result = await repository.getAll();
            expect(result[0].title).toEqual(mockFilms[0].title);
        });
    });

    describe('When we instantiate...', () => {
        test('Then post() should return the mockFilm', async () => {
            const newCoffee = {
                title: 'Lord of the Rings',
            };
            const result = await repository.post(newCoffee);
            expect(result.title).toEqual(newCoffee.title);
        });
    });
    afterAll(() => {
        mongoose.disconnect();
    });
});
