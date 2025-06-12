import { db } from '../../firebase.js';
import validate from 'com/validation/validateWaste.js';
import { getLocationDescription } from '../../utils/locationMessages.js';

const wasteCollection = db.collection('waste');

export default async function createWaste( req, res, next ) { // funcion para registrar residuo

    try {
        const { code, name, container, weight, month, year, status, location } = req.body;

        try {
            validate.code(code);
            validate.name(name);
            validate.container(container);
            validate.weight(weight);
            validate.month(month);
            validate.year(year);
            validate.status(status);
            validate.location(location);
        } catch (validationError) {
            return next(validationError);
        }

        await wasteCollection.add({ code, name, container, weight, month, year, status, location }); //registramos residuo

        const locationDescription = getLocationDescription(location);
        
        res.status(201).json({ messange: `📦 Residuo ${code} en ${locationDescription} registrado correctamente ✅` });
    } catch (error) {
        console.error('Error al registrar residuo:', error);
        next(error);
    }
    
}