const { createDriverController } = require('../../controllers/driverControler');
const { Driver } = require('../../db');
const express = require('express');

//* Handler que recibe la solicitud para crear un nuevo conductor y asociarlo con sus equipos

  
    const createDriverHandler = async (req, res) => {
        try {
            const { forename, surname, dob, nationality, description, teams, image } = req.body;
           
            const createdDriver = await createDriverController(forename, surname, dob, nationality, description, teams, image);
            console.log('NOse ' +createdDriver);
            res.status(201).json(createdDriver);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
    
module.exports = {
    createDriverHandler,
}
