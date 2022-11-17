import mongoose from 'mongoose';
import { USER, CLUSTER, PASSWORD } from './config.js';

export function dbConnect() {
    const DBName =
        process.env.NODE_ENV !== 'test' ? 'AldanaData' : 'AldanaTesting';
    let uri = `mongodb+srv://${USER}:${PASSWORD}`;
    uri += `@${CLUSTER}/${DBName}?retryWrites=true&w=majority`;
    console.log({ uri });
    console.log(DBName);
    return mongoose.connect(uri);
}
