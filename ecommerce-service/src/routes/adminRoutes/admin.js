// Contiene los endpoints para el admin
// listar sellers , editar , eliminar , crear , etc, buscar seller por id , nombre , etc
// ------------------------------------------------------------------------------------------------
const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');