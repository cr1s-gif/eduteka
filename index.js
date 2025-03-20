import express from 'express';
import { engine } from 'express-handlebars';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { neon } from '@neondatabase/serverless';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const sql = neon(
  'postgresql://neondb_owner:npg_TpBnzE1gfI0w@ep-mute-glade-a8neb6xe-pooler.eastus2.azure.neon.tech/neondb?sslmode=require'
);

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
app.get('/quizcalculo', async (req, res) => {
  const preguntasc = await sql('SELECT * FROM dominioinecuaciones union calculoderivadas union calculodeseries union calculolimites union derivadaimplicita union derivadasenvariasvariables union dominiofunciones union dominioinecuaciones union graficafunciones union integralesindefinidas union integralesmultiples union integralesporfraccionesparciales union integralporpartes union integraltrigonometrica union primitiva union puntosdeinflexion union razondecambio union recorridofunciones union regladelacadena union sumasderiemann union sustitucionsimple');
  res.render('quizcalculo', { preguntasc });
});
app.get('/quizalgebra', async(req, res) => {
  const preguntasa = await sql('SELECT * FROM dominioinecuaciones');
  res.render('quizalgebra', { preguntasa });
});
app.get('/quizfisica', async(req, res) => {
  const preguntasf = await sql('SELECT * FROM dominioinecuaciones');
  res.render('quizfisica', { preguntasf });
});
app.get('/quizprogramacion', async(req, res) => {
  const preguntasp = await sql('SELECT * FROM dominioinecuaciones');
  res.render('quizprogramacion', { preguntasp });
});

// Ruta para mostrar los resultados
app.get('/result', (req, res) => res.render('result'));

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
