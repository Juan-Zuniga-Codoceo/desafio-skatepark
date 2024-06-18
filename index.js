import express from 'express';
import { engine } from 'express-handlebars';
import fileUpload from 'express-fileupload';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

import authRouter from './routes/authRouter.js';
import skaterRouter from './routes/skaterRouter.js';
import adminRouter from './routes/adminRouter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());  // Asegúrate de que fileUpload esté configurado correctamente
app.use(cookieParser());

// Configuración de Handlebars
app.engine('handlebars', engine({
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
    defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');

// Configuración de archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para la URL raíz
app.get('/', (req, res) => {
    res.render('index', { title: 'Skate Park' });
});

app.use('/auth', authRouter);
app.use('/skaters', skaterRouter);
app.use('/admin', adminRouter);



app.listen(PORT, console.log(`🔥Server on 🔥 http://localhost:${PORT}`));
