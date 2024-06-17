import pool from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    const { email, nombre, password, anos_experiencia, especialidad } = req.body;
    const { foto } = req.files;
    const hashedPassword = await bcrypt.hash(password, 10);

    foto.mv(`./public/images/${foto.name}`);

    await pool.query(
        'INSERT INTO skaters (email, nombre, password, anos_experiencia, especialidad, foto, estado) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [email, nombre, hashedPassword, anos_experiencia, especialidad, foto.name, false]
    );

    res.redirect('/auth/login');
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    const result = await pool.query('SELECT * FROM skaters WHERE email = $1', [email]);

    if (result.rows.length > 0) {
        const skater = result.rows[0];
        const validPassword = await bcrypt.compare(password, skater.password);

        if (validPassword) {
            const token = jwt.sign({ id: skater.id, email: skater.email }, process.env.JWT_SECRET, {
                expiresIn: '1h'
            });
            res.cookie('token', token);
            res.redirect('/skaters/profile');
        } else {
            res.send('Invalid password');
        }
    } else {
        res.send('User not found');
    }
};

export const logout = (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
};
