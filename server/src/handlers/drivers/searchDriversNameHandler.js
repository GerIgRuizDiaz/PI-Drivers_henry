const { searchDriversByNameController } = require('../../controllers/driverControler');


//* Handler que recibe la solicitud para buscar conductores por nombre
const searchDriversByNameHandler = async (req, res) => {
    const { name } = req.query;
    
    try {
        // Buscar conductores por nombre utilizando el controlador
        const drivers = await searchDriversByNameController(name);
        
        // Si no se encuentran conductores, responder con un mensaje de error
        if (drivers.length === 0) {
            return res.status(404).json({ error: 'No drivers found' });
        }

        // Filtrar los datos para obtener solo la información necesaria (name, id, nationality, description, teams)
        const filteredDrivers = drivers.map(driver => ({
            name: `${driver.name.forename} ${driver.name.surname}`,
            id: driver.id,
            nationality: driver.nationality,
            description: driver.description,
            teams: driver.teams
        }));

        // Responder con la lista de conductores encontrados
        res.json(filteredDrivers);
    } catch (error) {
        // Manejar errores y responder con un mensaje de error
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    searchDriversByNameHandler,
}
