import * as dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });
import mongoose, { Schema, model } from 'mongoose';
const name = 'films';

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@${process.env.CLUSTER}/${name}?retryWrites=true&w=majority`;

const filmSchema = new Schema({
    title: mongoose.SchemaTypes.String,
    genre: mongoose.SchemaTypes.String,
    isGood: mongoose.SchemaTypes.Boolean,
});

const main = async () => {
    const connector = await mongoose.connect(uri);
    const Film = model('Film', filmSchema, 'films');
    await Film.create(
        {
            title: 'Harry Potter and the Prisoner of Azkaban',
            genre: 'Fantasy and adventure',
            isGood: true,
        },
        {
            title: 'Drive',
            genre: 'Thriller and drama',
            isGood: true,
        },
        {
            title: 'StarWars: Return of the Jedi',
            genre: 'Science Fiction',
            isGood: true,
        }
    );
    await Film.create({
        title: 'The Notebook',
        genre: 'Romance',
        isGood: false,
    });
    console.log(mongoose.connection.readyState);
    connector.disconnect();
};
main();
