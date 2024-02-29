
const { getAllDriversController, searchDriversByNameController, getDriverByIdController } = require('../../controllers/driverControler');
const { Driver, Team } = require('../../db');
const fs = require('fs').promises


//*Handler que recibe la request de todos los conductores con su información


const getAllDriversHandler = async (req, res) => {
    try {
        const { name } = req.query;
        const { id } = req.params;
    
        if (id) {
            // Si se proporciona un ID en la ruta, utilizar el controlador para buscar por ID
            const driver = await getDriverByIdController(id);
            res.status(200).json(driver);
        } else if (name) {
            // Si se proporciona un término de búsqueda, utilizar el controlador de búsqueda por nombre
            const drivers = await searchDriversByNameController(name);
            res.status(200).json(drivers);
        } else {
            // Si no se proporciona ni ID ni término de búsqueda, obtener todos los conductores
            const drivers = await getAllDriversController();
            res.status(200).json(drivers);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAllDriversHandler,
};
