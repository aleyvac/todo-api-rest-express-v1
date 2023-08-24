const db = require('../../config/database');

const controller = {};

//crud
controller.index = (req, res) => {
    db.query('SELECT * FROM todo_list ORDER BY id ASC', (error, results) => {
        console.log(results);
        if (error) {
            console.error('Error al obtener los datos: ', error);
            res.status(500).send('Error al obtener los datos');
        } else {
            res.status(200).send({
                'msg': 'Listado de elementos',
                'data': results
            });
        }
    });

};

controller.show = (req, res) => {
    const { id } = req.params;
    db.query(`SELECT * FROM todo_list WHERE id = ${id} LIMIT 1`, (error, results) => {
        if (error) {
            console.error('Error al obtener los datos: ', error);
            res.status(500).send('Error al obtener los datos');
        } else {
            if (results.length === 0) {
                res.status(404).send({
                    'msg': 'Registro no encontrado',
                    'data': null
                });
            } else {
                res.status(200).send({
                    'msg': 'Registro encontrado',
                    'data': results
                });
            }
        }
    })
};

controller.store = (req, res) => {
    const { todo } = req.body;

    if (Object.keys(todo).length === 0 || !todo.description) {
        res.status(402).json({
            error: 'Los datos enviados estan vacios',
            msg: 'datos incorrectos',
            status: 402,
            data: todo
        });
    } else {
        db.query(`INSERT INTO todo_list (description) VALUES( '${todo.description}' )`, (error, results) => {
            if (error) {
                console.error('Error al obtener los datos: ', error);
                res.status(500).send('Error al obtener los datos');
            } else {
                if (results.affectedRows > 0) {
                    db.query(`SELECT * FROM todo_list WHERE id = ${results.insertId} LIMIT 1`, (error, results) => {
                        if (error) {
                            console.error('Error al obtener los datos: ', error);
                            res.status(500).send('Error al obtener los datos');
                        } else {
                            res.status(201).send({
                                'msg': 'registro creado exitosamente',
                                'data': results
                            });
                        }
                    })
                }else{
                    res.status(400).send({
                        msg: 'Ha ocurrido un error y no se pudo crear el registro',
                        data: null
                    });
                }
            }
        })

    }
};

controller.update = (req, res) => {
    const { id } = req.params;
    const { description } = req.body;

    db.query(`UPDATE todo_list SET description = '${description}' WHERE id = ${id} LIMIT 1`, (error, results) => {
        if (error) {
            console.error('Error al obtener los datos: ', error);
            res.status(500).send('Error al obtener los datos');
        } else {
            if(results.affectedRows > 0){
                db.query(`SELECT * FROM todo_list WHERE id = ${id} LIMIT 1`, (error, results) => {
                    if (error) {
                        console.error('Error al obtener los datos: ', error);
                        res.status(500).send('Error al obtener los datos');
                    } else {
                        res.status(200).send({
                            'msg': 'registro actualizado exitosamente',
                            'data': results
                        });
                    }
                })
            }else{
                res.status(404).send({
                    msg: 'Registro no encontrado',
                    data: null
                });
            }
            
        }
    })
};

controller.delete = (req, res) => {
    const { id } = req.params
    db.query(`DELETE FROM todo_list WHERE id = ${id} LIMIT 1`, (error, result) => {
        if (error) {
            console.error('Error al obtener los datos: ', error);
            res.status(500).send('Error al obtener los datos');
        } else {
            if(result.affectedRows > 0){
                res.status(200).send({
                    msg: 'Registro eliminado exitosamente',
                    data: null 
                });
            }else{
                res.status(404).send({
                    msg: 'Registro no encontrado',
                    data: null
                });
            }
            
        }
    })
};

module.exports = controller;