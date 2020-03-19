import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import config from './config'
import apiRoutes from './routes';

const { port, logFormat } = config();

const app = express();

app.use(morgan(logFormat));
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

app.get('/', (req, res) => res.send('Welcome to Express Typescript API'))
app.use('/api', apiRoutes);

app.use('*', (req, res) => {
  return res.status(404).json({
    error: 'The resource you are trying to access does not exist'
  })
})
app.listen(port, () => console.log(`Server started on port ${port}`))