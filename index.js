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

// Servir archivos estáticos
app.use(express.static('public'));

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
app.get('/fisica', (req, res) => {
  res.render('fisica');
});
app.get('/programacion', (req, res) => {
  res.render('programacion');
});
app.get('/quizcalculo', (req, res) => {
  res.render('quizcalculo');
});
app.get('/quizalgebra', (req, res) => {
  res.render('quizalgebra');
});

app.get('/result', (req, res) => {
  res.render('result');
});





// Iniciar el servidor
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
