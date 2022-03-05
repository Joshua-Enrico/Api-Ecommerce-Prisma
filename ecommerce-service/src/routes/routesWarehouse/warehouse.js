const router = require('express').Router();


// Crea un warehouse
router.post('/', (req, res) => {})

// Lista de todos los warehouses
router.get('/all', (req, res) => {})

// Elimina un warehouse por id
router.delete('/:id', (req, res) => {})

//Actualiza un warehouse por id
router.put('/:id', (req, res) => {})

// Busca un warehouse por ocurrencia
router.get('/search/:search', (req, res) => {})