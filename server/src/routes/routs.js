const express = require('express');
const routes = express.Router();
const {getAllDriversHandler } = require('../handlers/drivers/allDriversHandler');
const {createDriverHandler} = require('../handlers/drivers/createDriverHandler');
const {getDriverByIdHandler} = require('../handlers/drivers/idDrivesHandler')
const {getAllTeamsHandler} = require('../handlers/team/getAllTeamHandler')
const { searchDriversByNameHandler} = require('../handlers/drivers/searchDriversNameHandler')


// Rutas para conductores
routes.get('/drivers', getAllDriversHandler);
routes.get('/drivers', searchDriversByNameHandler);
routes.get('/drivers/:id', getDriverByIdHandler);
routes.post('/drivers', createDriverHandler);

// Rutas para equipos
routes.get('/teams', getAllTeamsHandler);


module.exports = routes;