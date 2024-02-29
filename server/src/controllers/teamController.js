const { Team } = require('../db');

const fs = require('fs');

//* Controlador para obtener todos los equipos existentes en la base de datos
const getAllTeamsController = async () => {
    try {
        // Obtener la ruta absoluta al archivo db.json
        const dbFilePath = 'C:/Users/germa/OneDrive/Escritorio/PI-Drivers_henry/server/api/db.json';

        // Leer el contenido del archivo db.json
        const rawData = fs.readFileSync(dbFilePath, 'utf8');
        const data = JSON.parse(rawData);

        // Obtener la lista de equipos de todos los conductores
        const drivers = data.drivers || [];
        const teams = drivers.flatMap(driver => driver.teams ? driver.teams.split(',').map(team => team.trim()) : []);

        // Eliminar duplicados y crear objetos con la propiedad "nombre"
        const uniqueTeams = Array.from(new Set(teams)).map(teamName => ({ name: teamName }));

        return uniqueTeams;
    } catch (error) {
        throw error;
    }
}


module.exports = {
    getAllTeamsController
}


