var express = require('express');
var router = express.Router();

const todoController = require('../src/controllers/todoController')

/* GET users listing. */
router.get('/', todoController.index);
router.get('/:id', todoController.show);
router.post('/', todoController.store);
router.put('/:id', todoController.update);
router.delete('/:id', todoController.delete);

module.exports = router;