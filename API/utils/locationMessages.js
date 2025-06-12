export function getLocationDescription(location) {
    if (!location || typeof location !== 'object' || !location.type) {
        return '❌ Ubicación no especificada ❌'; // Fallback seguro
    }

    if (location.type === 'ALMACEN') { // 'ALMACEN'
        // Se asume que location.area es válido debido a la validación previa
        return `Almacenado en área: ${location.area}`;
    } else if (location.type === 'SALIDA') { // 'SALIDA'
        // Se asume que location.reference es válido debido a la validación previa
        return `Expedición con referencia: "${location.reference}"`;
    } else {
        return `❌ ubicación de tipo desconocido (${location.type}) ❌`;
    }
}