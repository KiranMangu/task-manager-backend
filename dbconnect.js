import mongoose from 'mongoose';

export function dbConnection() {
    mongoose.connect('mongodb://user:user123@ds233571.mlab.com:33571/taskdb', { useNewUrlParser: true });
    const connection = mongoose.connection;

    connection.once('error', () => {
        console.log('Mongoose: Failed conncting to server');
    });
    connection.once('open', () => {
        console.log('Mongoose: Connected successfully');
    });
};

// export { dbConnection };