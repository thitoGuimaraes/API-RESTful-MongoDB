import express from 'express';
import db from './config/dbConnect.js';
import routes from './routes/index.js';
import manipuladorDeErros from './middlewares/manipuladorDeErros.js';
import manipulador404 from './middlewares/manipulador404.js';

db.on('error', console.log.bind(console, 'Erro de conexão'));
db.once('open', () => {
  console.log('conexão com o banco feita com sucesso');
});

const app = express();
app.use(express.json());

//demonstar que o app.use é o primeiro a executar
// app.use((req, res, next) => {
//   console.log('Código de um novo middleware');
//   next();
// });
// exemplo de como registrar um middleware que é executado apenas em uma requisição GET para a rota /livros
// app.get('/livros', (req, res, next) => {
//   console.log('Middleware registrado no GET da rota /livros');
//   next();
// });

routes(app);

app.use(manipulador404);

app.use(manipuladorDeErros);

export default app;
