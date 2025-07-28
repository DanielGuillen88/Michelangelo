export const VALIDATION = {
    // Regex
    // users
    username: /^[\w-]{3,20}$/, // Letras, números, guiones y guiones bajos, entre 3 y 20 caracteres
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,10}$/, // Al menos una letra y un número, entre 6 y 10 caracteres
    alphanumeric: /^[a-zA-Z0-9]+$/, // Solo letras y números, sin espacios ni caracteres especiales(codigo categoria acceso)
    // waste
    code: /^\d{6}$/,
    wasteName: /^[A-Z0-9ÁÉÍÓÚÜÑ\s]+$/,
    weight: /^\d{1,4}$/,
    month: /^(0[1-9]|1[0-2])$/,
    year: /^\d{4}$/,
  
    // Opciones de arrays
    containers: ['PALET', 'GRG', 'BIGBAG', 'B200', 'B<200', 'OTRO'],
    status: ['CORRECTO', 'REVISAR', 'ESTANCADO'], 
    locationTypes: ['ALMACEN', 'SALIDA'],
    warehouseAreas: ['A1', 'A2', 'A3','A4', 'B1', 'B2', 'B3','B4', 'C1', 'C2', 'C3', 'C4'],
  };