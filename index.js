import express from 'express';
import { engine } from 'express-handlebars';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Configuración de Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Rutas
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/calculo', (req, res) => {
  res.render('calculo');
});
app.get('/algebra', (req, res) => {
  res.render('algebra');
});
app.get('/quiz', (req, res) => {
  res.render('quiz');
});
app.get('/quiza', (req, res) => {
  res.render('quiza');
});

app.get('/result', (req, res) => {
  res.render('result');
});



// Servir archivos estáticos
app.use(express.static('public'));

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
