import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { dbConnection } from './dbconnect';
import { router } from './router/task.router';

const port = 3031;
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Server response');
});
dbConnection();

app.use('/api', router);

app.listen(port, () => {
    console.log('Express: Connected successfully');
});

