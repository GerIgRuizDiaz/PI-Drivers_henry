const axios = require('axios');
const { Driver, Team } = require('../db');
const fs = require('fs');
const { log } = require('console');



const getAllDriversFromJSON = (filePath) => {
    try {
        // Leer el contenido del archivo JSON
        const rawData = fs.readFileSync(filePath);
        const data = JSON.parse(rawData);

        // Verificar si hay datos de conductores en la respuesta
        if (data && data.drivers) {
            // Devolver el array de conductores
            return data.drivers;
        } else {
            // Si no hay datos de conductores, lanzamos un error
            throw new Error('No drivers data found');
        }
    } catch (error) {
        // Capturar y lanzar cualquier error que ocurra durante la lectura del archivo
        throw error;
    }
};




//* Controlador que obtiene todos los conductores con su información
const getAllDriversController = async () => {
    try {
        // Obtener la ruta absoluta al archivo db.json
        const dbFilePath = 'C:/Users/germa/OneDrive/Escritorio/PI-Drivers_henry/server/api/db.json';

        // Obtener todos los conductores desde el archivo JSON
        const drivers = getAllDriversFromJSON(dbFilePath);

        const dbDrivers = await Driver.findAll({
            include: {
                model: Team,
                attributes: ['name']
            }
        });

        // Devolver la lista de conductores
        return [...dbDrivers, ...drivers];
    } catch (error) {
        // Capturar y lanzar cualquier error que ocurra durante la lectura del archivo
        throw error;
    }
};

// Controlador que obtiene el detalle de un conductor por su ID

const getDriverByIdController = async (idDriver, source) => {
console.log(idDriver, source);
    try {
        const dbFilePath = 'C:/Users/germa/OneDrive/Escritorio/PI-Drivers_henry/server/api/db.json';
        const drivers = getAllDriversFromJSON(dbFilePath);

        // Buscar el conductor por su ID
        const driver = drivers.find(driver => driver.id === parseInt(idDriver));
console.log('hola');
        const response = source === 'api'
            ? (driver)
            : await Driver.findByPk(idDriver, {
                include: {
                    model: Team,
                    attributes: ['name']
                }
            })
        if (!response) {
            throw new Error('Videogame not found!');
        }
        console.log(response)
        const data = source === 'api' ? response : response.toJSON();
        console.log(data.name.forename);
        const dataDriver = {
            id: data.id,
            name: source === 'api' ? data.name.forename : data.name,
            nationality: data.nationality,
            teams: source === 'api' ? data.teams : data.Teams?.map(team => team.name),
            image: source === 'api' ? data.image.url : data.image,
            description: data.description,
            birthDate:source === 'api'? data.dob : data.birthDate,
            created: source === 'api' ? false : data.created
        };
        return dataDriver;
    } catch (error) {
        throw error;
    }


}




//* Controlador que busca conductores por nombre o ID
const searchDriversByNameController = async (searchTerm) => {
    try {
        // Obtener la ruta absoluta al archivo db.json
        const dbFilePath = 'C:/Users/germa/OneDrive/Escritorio/PI-Drivers_henry/server/api/db.json';

        // Obtener todos los conductores desde el archivo JSON
        const drivers = getAllDriversFromJSON(dbFilePath);

        // Filtrar conductores por nombre o ID
        const filteredDrivers = drivers.filter(driver => {
            const fullName = `${driver.name.forename} ${driver.name.surname}`;
            const idString = driver.id.toString();

            // Verificar si el nombre completo del conductor o su ID coinciden con el término de búsqueda
            return fullName.toLowerCase().includes(searchTerm.toLowerCase()) || idString === searchTerm;
        });
        console.log(filteredDrivers);
        // Verificar si se encontraron conductores con el nombre o ID dado
        if (filteredDrivers.length > 0) {
            // Si se encontraron conductores, devolverlos
            return filteredDrivers;
        } else {
            // Si no se encontraron conductores, lanzar un error
            throw new Error('No drivers found');
        }
    } catch (error) {
        // Capturar y lanzar cualquier error que ocurra durante la lectura del archivo JSON
        throw error;
    }
};
//! Crear un nuevo conductor y relacionarlo con sus equipos
const createDriverController = async (forename, surname, dob, nationality, description, teams, image) => {
   

    try {
        if (!teams.length) {
            throw new Error('You must provide at least one teams');
        }
        const team = await Team.findAll({ where: { name: teams } });
       
        console.log('hola 1');
        if (image == "") {
       
            const newDriver = await Driver.create({

                name:forename,
                lastName:surname,
                birthDate:dob,
                nationality: nationality,
                description: description,

            });
         
            await newDriver.addTeams(team);
            console.log('hola2 ');
            return newDriver;
        } else {
            console.log('hola 3');
            const newDriver = await Driver.create({
                name:forename,
                lastName:surname,
                birthDate:dob,
                nationality,
                description,
                image: image
               
            });
            console.log('hola 4');
            await newDriver.addTeams(team);
            console.log('hola 5');
            return newDriver;
        }
    } catch (error) {
        throw error;
    }
}


module.exports = {
    getAllDriversController,
    getDriverByIdController,
    searchDriversByNameController,
    createDriverController
};
