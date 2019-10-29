const express = require('express');
const router = express.Router({ mergeParams: true });
const mysqlConnection = require('../databaseConfig');



router.get('/', (req, res) => {

    mysqlConnection.query('SELECT * FROM hotel', (err, rows, fields) => {

        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }

    });
});

router.get('/hotel/:name', (req, res) => {

    const { name } = req.params;

    mysqlConnection.query(`SELECT * FROM hotel WHERE nombre LIKE '%${name}%'`, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }

    });
});

router.get('/hotel/category/:cat', (req, res) => {

    const { cat } = req.params;

    mysqlConnection.query(`SELECT * FROM hotel WHERE categoria = ${cat}`, (err, rows, fields) => {

        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }

    });
});

router.get('/:id', (req, res) => {

    const { id } = req.params;

    mysqlConnection.query('SELECT * FROM hotel WHERE id = ?', [id], (err, rows, fields) => {

        if (!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }

    });

});

router.post('/', (req, res) => {

    const { id, nombre, categoria, precio, direccion, foto } = req.body;

    const query = `
        CALL hotelAddOrEdit(?,?,?,?,?,?);
    `;

    mysqlConnection.query(query, [id, nombre, precio, categoria, direccion, foto], (err, rows, fields) => {

        if (!err) {
            res.json({ Status: 'Hotel Added' });
        } else {
            console.log(err);
        }

    })
});

router.put('/hot/:id', (req, res) => {

    const { id } = req.params;
    const { nombre, direccion, precio, categoria, foto } = req.body;
    const query = 'CALL hotelAddOrEdit(?,?,?,?,?,?)';

    mysqlConnection.query(query, [id, nombre, categoria, precio, direccion, foto], (err, rows, fields) => {

        if (!err) {
            res.json({ status: 'Hotel updated' })
        } else {
            console.log(err);
        }
    });
});

router.delete('/:id', (req, res) => {

    const { id } = req.params;

    mysqlConnection.query('DELETE FROM hotel WHERE id = ?', [id], (err, rows, fields) => {
        if (!err) {
            res.json({ status: 'Hotel deleted' })
        } else {
            console.log(err);
        }
    });

});


module.exports = router;