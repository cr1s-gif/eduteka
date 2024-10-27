import express from 'express';
import { engine } from 'express-handlebars';
import OpenAI from 'openai'; // Cambiado a importación correcta
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

// Configuración de la API de OpenAI con la nueva versión del SDK
const openai = new OpenAI({
  apiKey: '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', // Reemplaza con tu clave API
});

app.post('/pista', async (req, res) => {
  const { pregunta } = req.body;
  console.log('Pregunta recibida:', pregunta); // Verificar que se recibe la pregunta

  try {
    const response = await openai.completions.create({
      model: 'text-davinci-003',
      prompt: `Ayuda a resolver la siguiente pregunta del examen: ${pregunta}`,
      max_tokens: 100,
    });

    res.json({ pista: response.choices[0].text.trim() });
  } catch (error) {
    console.error('Error en la API de OpenAI:', error.response ? error.response.data : error);
    res.status(500).json({ error: 'Error al generar la pista' });
  }
});


// Servir archivos estáticos
app.use(express.static('public'));

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
