import pool from '../config/db.js';

export const getAdminPage = async (req, res) => {
    const result = await pool.query('SELECT * FROM skaters');
    const skaters = result.rows;
    res.render('admin', { skaters });
};

export const approveSkater = async (req, res) => {
    const { id } = req.body;
    await pool.query('UPDATE skaters SET estado = true WHERE id = $1', [id]);
    res.redirect('/admin');
};
