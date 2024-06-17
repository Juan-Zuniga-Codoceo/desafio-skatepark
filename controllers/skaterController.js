import pool from '../config/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const getProfile = async (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.redirect('/auth/login');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const result = await pool.query('SELECT * FROM skaters WHERE id = $1', [decoded.id]);
        const skater = result.rows[0];
        res.render('datos', { skater });
    } catch (error) {
        res.redirect('/auth/login');
    }
};

export const updateProfile = async (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.redirect('/auth/login');

    const { nombre, password, password2, anos_experiencia, especialidad } = req.body;

    if (password !== password2) {
        return res.send('Passwords do not match');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        await pool.query(
            'UPDATE skaters SET nombre = $1, password = $2, anos_experiencia = $3, especialidad = $4 WHERE id = $5',
            [nombre, hashedPassword, anos_experiencia, especialidad, decoded.id]
        );
        res.redirect('/skaters/profile');
    } catch (error) {
        res.redirect('/auth/login');
    }
};

export const getAllSkaters = async (req, res) => {
    const result = await pool.query('SELECT * FROM skaters');
    const skaters = result.rows;
    res.render('index', { skaters });
};
