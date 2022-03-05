const router = require('express').Router();



// Crea un usuario cliente
router.post('/', (req, res) => {})

// Lista de todos los usuarios
router.get('/all', (req, res) => {})

// Elimina un usuario por id
router.delete('/:id', (req, res) => {})

//Actualiza un usuario por id
router.put('/:id', (req, res) => {})

// Busca un usuario por ocurrencia de nombre, email
router.get('/search/:search', (req, res) => {})
