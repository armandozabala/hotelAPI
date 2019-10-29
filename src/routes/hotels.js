const express = require('express');
const router = express.Router({ mergeParams: true });
const mysqlConnection = require('../database');



router.get('/', (req, res) => {

    mysqlConnection.query('SELECT * FROM hotel', (err, rows, fields) => {

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

    const { id, nombre, categoria, direccion, foto } = req.body;

    const query = `
        CALL hotelAddOrEdit(?,?,?,?,?);
    `;

    mysqlConnection.query(query, [id, nombre, categoria, direccion, foto], (err, rows, fields) => {

        if (!err) {
            res.json({ Status: 'Hotel Added' });
        } else {
            console.log(err);
        }

    })
});

router.put('/:id', (req, res) => {

    const { id } = req.params;
    const { nombre, direccion, categoria, foto } = req.body;
    const query = 'CALL hotelAddOrEdit(?,?,?,?,?)';

    mysqlConnection.query(query, [id, nombre, categoria, direccion, foto], (err, rows, fields) => {

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