import express from 'express';
import { engine } from 'express-handlebars';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Configurar Handlebars
app.engine('handlebars', engine({ extname: '.handlebars' }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para verificar el consentimiento de cookies y agregar el banner
app.use((req, res, next) => {
  res.locals.showCookieBanner = !req.cookies.cookiesAccepted;
  next();
});


app.get('/accept-cookies', (req, res) => {
  res.cookie('cookiesAccepted', true, {
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 días
    httpOnly: true,
    secure: false, // Asegúrate de que sea `true` si usas HTTPS
  });
  res.json({ success: true }); // Devuelve un JSON indicando éxito
});


// Rutas principales
app.get('/', (req, res) => {
  res.render('home'); // Renderiza la vista de inicio
});

app.get('/calculo', (req, res) => res.render('calculo'));
app.get('/algebra', (req, res) => res.render('algebra'));
app.get('/fisica', (req, res) => res.render('fisica'));
app.get('/programacion', (req, res) => res.render('programacion'));

// Rutas para los quizzes
app.get('/quizcalculo', (req, res) => res.render('quizcalculo'));
app.get('/quizalgebra', (req, res) => res.render('quizalgebra'));
app.get('/quizfisica', (req, res) => res.render('quizfisica'));
app.get('/quizprogramacion', (req, res) => res.render('quizprogramacion'));

// Ruta para mostrar los resultados
app.get('/result', (req, res) => res.render('result'));

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
