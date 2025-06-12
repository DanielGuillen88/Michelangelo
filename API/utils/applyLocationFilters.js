import { ContentError, ValidationError } from 'com/errors/errors.js'; 
import { VALIDATION } from 'com/validation/validationConstants.js';

export function applyLocationFilters(query, locationType, locationArea, locationReference) {

    if (!VALIDATION.locationTypes.includes(locationType)) {
        throw new ValidationError(`❌ Tipo de ubicación inválido: ${locationType}. Opciones: ${VALIDATION.locationTypes.join(', ')} ❌`);
    }
    query = query.where('location.type', '==', locationType); // consulta ubicacion: almacen o en expedicion

    if (locationType === 'ALMACEN') {
        if (locationArea) {
            if (!VALIDATION.warehouseAreas.includes(locationArea)) {
                throw new ValidationError(`❌ Área de almacén inválida: ${locationArea}. Opciones: ${VALIDATION.warehouseAreas.join(', ')} ❌`);
            }
            query = query.where('location.area', '==', locationArea); // consulta area donde se amlaceno
        }
    } else if (locationType === 'SALIDA') {
        if (locationReference) {
            if (typeof locationReference !== 'string' || locationReference.trim() === '') {
                throw new ContentError('❌ Referencia de salida no puede estar vacía ❌');
            }
            query = query.where('location.reference', '==', locationReference); // consutla de ref personalizada
        }
    }

    return query;
}