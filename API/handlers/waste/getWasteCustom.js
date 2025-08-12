import { db } from "../../firebase.js";
import validate from "com/validation/validateWaste.js";
import { applyLocationFilters } from "../../utils/applyLocationFilters.js";
import { SystemError } from "com/errors/errors.js";

const wasteCollection = db.collection('waste');

export default async function getWasteCustom(req, res, next) {
    try {
        const { code, container, status, month, year, locationType, locationArea, locationReference } = req.query;

        // 1. Validamos solicitudes
        try {
            if (code) validate.code(code);
            if (container) validate.container(container);
            if (status) validate.status(status);
            if (month) validate.month(month);
            if (year) validate.year(year);
        } catch (validationError) {
            return next(validationError); // Devolver un error de validación
        }

        let query = wasteCollection;

        // 2. Aplicar filtro .where() dinámicamente
        if (code) query = query.where('code', '==', code);
        if (container) query = query.where('container', '==', container);
        if (status) query = query.where('status', '==', status);
        if (month) query = query.where('month', '==', month);
        if (year) query = query.where('year', '==', year);

        // 3. Aplicar los filtros de ubicación
        if (locationType) {
            try {
                query = applyLocationFilters(query, locationType, locationArea, locationReference);
            } catch (validationError) {
                return next(validationError);
            }
        }

        const querySnapshot = await query.get();

        if (querySnapshot.empty) {
            console.log(`❌ No se encontraron residuos con los filtros proporcionados ❌`);
            return res.status(200).json([]);
        }

        const wasteList = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        console.log(`Residuos encontrados:`, wasteList);

        return res.status(200).json(wasteList);
    } catch (error) {
        console.error('Error al obtener residuos solicitados:', error);
        // Si el error es de un índice faltante, Firestore lo indicará en el mensaje
        if (error.message.includes("The query requires an index")) {
            return next(new SystemError(`❌ Error de consulta: ${error.message}. Por favor, crea el índice necesario en Firestore.`));
        }
        next(error);
    }
};
