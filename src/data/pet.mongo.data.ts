import * as dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });
import mongoose, { Schema, model } from 'mongoose';
const name = 'pets';

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@${process.env.CLUSTER}/${name}?retryWrites=true&w=majority`;

const petSchema = new Schema({
    name: mongoose.SchemaTypes.String,
    species: mongoose.SchemaTypes.String,
    isCute: mongoose.SchemaTypes.Boolean,
});

const main = async () => {
    const connector = await mongoose.connect(uri);
    const Pet = model('Pet', petSchema, 'pets');
    await Pet.create({
        name: 'Wilfredo',
        species: 'Dog',
        isCute: true,
    });
    console.log(mongoose.connection.readyState);
    connector.disconnect();
};
main();
