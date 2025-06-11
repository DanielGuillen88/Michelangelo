import { ContentError, ValidationError } from "../errors/errors"
import { VALIDATION } from "./validationConstants";

export function validateCode(code) {
    if (!code) {
        throw new ContentError('❌ Código de residuo es requerido ❌')
    }
    if (typeof code !== 'string' || !VALIDATION.code.test(code)) {
        throw new ValidationError('❌ Código de residuo inválido, debe tener seis dígitos ❌' );
    }
}

export function validateWasteName(name) {
    if (!name) {
        throw new ContentError('❌ Nombre de residuo es requerido ❌')
    }
    if (typeof name !== 'string' || !VALIDATION.wasteName.test(name)) {
        throw new ValidationError('❌ Código de residuo inválido, debe ser una cadena ❌' );
    }
}

export function validateContainer(container) {
    if (!container) {
        throw new ContentError('❌ Tipo contenedor de residuo es requerido ❌')
    }
    if (typeof container !== 'string' || !VALIDATION.containers.includes(container)) {
        throw new ValidationError(`❌ Tipo contenedor de residuo debe ser uno de los siguientes valores: ${VALIDATION.containers.join(', ')}.`)
    }
}

export function validateWeight(weight) {
    if (weight === '' || weight === null || weight === undefined) {
        throw new ContentError('❌ Peso de residuo es requerido ❌');
    }
    if (Number(weight) < 5 || Number(weight) > 1600 || !VALIDATION.weight.test(weight)) {
        throw new ValidationError('❌ Peso de residuo debe ser un número entre 5 y 1600 ❌')
    }
}

export function validateMonth(month) {
    if (!month) {
        throw new ContentError('❌ Mes de registro es requerido ❌')
    }
    if (typeof month !== 'string' || !VALIDATION.month.test(month)) {
        throw new ValidationError('❌ Mes de registro debe ser un valor entre 01 y 12 ❌' );
    }
}

export function validateYear(year) {
    if (!year) {
        throw new ContentError('❌ Año de registro es requerido ❌')
    }
    if (typeof year !== 'string' || !VALIDATION.year.test(year)) {
        throw new ValidationError('❌ Año de registro inválido, debe tener cuatro dígitos ❌' );
    }
}

export function validateStatus(status) {
    if (!status) {
        throw new ContentError('❌ Estado de residuo es requerido ❌')
    }
    if (typeof status !== 'string' || !VALIDATION.status.includes(status)) {
        throw new ValidationError(`❌ Estado de residuo debe ser uno de los siguientes valores: ${VALIDATION.status.join(', ')} ❌`)
    }
}

export function validateLocation(location) {
    if (!location || typeof location !== 'object' || Array.isArray(location)) {// 1. Validar que 'location' sea un objeto
        throw new ContentError('❌ La ubicación del residuo es requerida y debe ser un objeto ❌');
    }

    if (typeof location.type !== 'string' || !VALIDATION.locationTypes.includes(location.type.toUpperCase())) {// almacen o salida

        throw new ValidationError(`❌ El tipo de ubicación de residuo es requerido y debe ser uno de los siguientes valores: ${VALIDATION.locationTypes.join(', ')} ❌`);
    }

    if (locationType === 'ALMACEN') {     // 3A si es almacen, debe tener una 'area' válida
        if (typeof location.area !== 'string' || !VALIDATION.warehouseAreas.includes(location.area.toUpperCase())) {
            throw new ValidationError(`❌ Para residuos almacenados, se requiere un área válida. Opciones: ${VALIDATION.warehouseAreas.join(', ')} ❌`);
        }
        if (location.reference !== undefined) { // sin reference
             throw new ValidationError(`❌ Para residuos almacenados, la propiedad 'reference' no es permitida ❌`);
        }
    } else if (locationType === 'SALIDA') { // 3B Si es salida, debe tener una 'reference'
        if (typeof location.reference !== 'string' || location.reference.trim() === '') {
            throw new ValidationError('❌ Para residuos en salida, se requiere una referencia personalizada ❌');
        }
        if (location.area !== undefined) { // sin area
            throw new ValidationError(`❌ Para residuos en salida, la propiedad 'area' no es permitida ❌`);
        }
    } else {
        // es buena práctica un fallback
        throw new ValidationError(`❌ Tipo de ubicación de residuo desconocido: ${location.type} ❌`);
    }

}

const validate = {
    code: validateCode,
    name: validateWasteName,
    container: validateContainer,
    weight: validateWeight,
    month: validateMonth,
    year: validateYear,
    status: validateStatus,
    location: validateLocation
}

export default validate