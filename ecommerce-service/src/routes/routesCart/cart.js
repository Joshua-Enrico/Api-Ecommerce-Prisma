const router = require('express').Router();


//Crea un cart
router.post('/', (req, res) => {})

//Lista de todos los carts
router.get('/all', (req, res) => {})

// Elimina un cart por id
router.delete('/:id', (req, res) => {})

//Actualiza un cart por id
router.put('/:id', (req, res) => {})

// Busca un cart por ocurrencia
router.get('/search/:search', (req, res) => {})