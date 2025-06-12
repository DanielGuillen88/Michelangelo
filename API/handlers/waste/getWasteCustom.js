import { db } from "../../firebase";
import validate from "com/validation/validateWaste";
import { applyLocationFilters } from "../../utils/applyLocationFilters";

const wasteCollection = db.collection('waste');

export default async function getWasteCustom(req, res, next) { //obtener residuos con filtros personalizados

    try {
        const { code, container, status, month, year, locationType, locationArea, locationReference } = req.query;

        let query = wasteCollection;    // 1. Iniciar la consulta de Firestore

        // 2. Aplicar validaciones y añadir cláusulas .where() dinámicamente
        if (code) {    // Validar y aplicar 'code'
            try {
            validate.code(code);
            } catch (validationError) {
            return next(validationError);
            }
            query = query.where('code', '==', code);
        }

        if (container) {    // Validar y aplicar 'container'
            try {
            validate.container(container);
            } catch (validationError) {
                return next(validationError);
            }
            query = query.where('container', '==', container);
        }

        if (status) {    // Validar y aplicar 'status'
            try {
            validate.status(status);
            } catch (validationError) {
                return next(validationError);
            }
            query = query.where('status', '==', status);
        }

        if (month) {     // Validar y aplicar 'month'
            try {
            validate.month(month);
            } catch (validationError) {
                return next(validationError);
            }
            query = query.where('month', '==', month);
        }

        if (year) {     // Validar y aplicar 'year'
            try {
            validate.year(year);
            } catch (validationError) {
                return next(validationError);
            }
            query = query.where('year', '==', year);
        }

        if (locationType) { // externalizamos consulta y filtrado de ubicacion
            try {
                query = applyLocationFilters(query, locationType, locationArea, locationReference);
            } catch (validationError) {
                return next(validationError);
            }
        }

        const querySnapshot = await query.get();     // 3. Ejecutar la consulta en Firestore

        if (querySnapshot.empty) {     // 4. Manejar resultados
            console.log(`❌ No se encontraron residuos con los filtros proporcionados ❌`);
            return res.status(200).json([]); // Devolver un array vacío si no hay resultados
        }

        const wasteList = querySnapshot.docs.map(doc => ({    // 5. Mapear los documentos obtenidos
            id: doc.id,
            ...doc.data(),
        }));

        console.log(`Residuos encontrados:`, wasteList);    // 6. Respuesta exitosa
        
        return res.status(200).json(wasteList);
    } catch (error) {
    console.error('Error al obtener residuos personalizados:', error);
    next(error);
    }
};