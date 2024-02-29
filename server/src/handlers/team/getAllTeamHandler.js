const { getAllTeamsController } = require('../../controllers/teamController');
const { Team } = require('../../db');
const fs = require('fs').promises;


//* Handler que recibe la solicitud para obtener todos los equipos existentes en la base de datos
const getAllTeamsHandler = async (req, res) => {
    try {
        const existTeams = await Team.findAll();
        if (existTeams.length === 0) {
            const teamsData = await getAllTeamsController();
            await Team.bulkCreate(teamsData);
        }

        const allTeams = await Team.findAll();

        // Enviar la respuesta con los equipos obtenidos
        res.status(200).json(allTeams);
    } catch (error) {
        // Manejar cualquier error que ocurra durante la obtención de los equipos
        console.error('Error al obtener los equipos:', error);
        res.status(500).json({ error: 'Ocurrió un error al obtener los equipos' });
    }
}


module.exports = {
    getAllTeamsHandler,
}
