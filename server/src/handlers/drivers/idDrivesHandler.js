const { getDriverByIdController } = require('../../controllers/driverControler');
const { Driver , Team} = require('../../db')

//* Handler que recibe la solicitud para obtener el detalle de un conductor por su ID
const getDriverByIdHandler = async (req, res) => {
    const { id } = req.params;
    const source = isNaN(id) ? 'db' : 'api';
    try {
        const dataDriver = await getDriverByIdController(id, source)
        res.status(200).json(dataDriver)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getDriverByIdHandler,
}