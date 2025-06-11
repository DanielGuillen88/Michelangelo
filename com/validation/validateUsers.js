import { ContentError, MatchError, ValidationError } from '../errors/errors.js';

const USERNAME_REGEX = /^[\w-]{3,20}$/; // Letras, números, guiones y guiones bajos, entre 3 y 20 caracteres
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,10}$/; // Al menos una letra y un número, entre 6 y 10 caracteres
const ALPHANUMERIC_REGEX = /^[a-zA-Z0-9]+$/; // Solo letras y números, sin espacios ni caracteres especiales(codigo categoria acceso)

// username podra ser nombre, apellido o dni (Esto significa que combinaciones como "Juan Perez" no serán válidas. Ejemplos válidos serían "JuanPerez" o "Juan_Perez")
export function validateUsername(username) { 
    if (username === '' || username === null || username === undefined) {
        throw new ContentError('❌ Nombre de usuario requerido ❌');
    }
    if (typeof username !== 'string' || !USERNAME_REGEX.test(username)) {
        throw new ValidationError('❌ Nombre de usuario inválido, debe tener entre 3 y 20 caracteres y solo contener letras, números, guiones y guiones bajos ❌' );
    }
}

export function validatePassword(password) {
    if (password === '' || password === null || password === undefined) {
        throw new ContentError('❌ Contraseña de usuario requerida ❌');
    }
    if (typeof password !== 'string' || !PASSWORD_REGEX.test(password)) {
        throw new ValidationError('❌ Contraseña inválida, debe tener entre 6 y 10 caracteres, al menos una letra y un número ❌' );
    }
}

export function validatePasswordRepeat(password, passwordRepeat) {
    if (passwordRepeat === '' || passwordRepeat === null || passwordRepeat === undefined) {
        throw new ContentError('❌ Para evitar errores, repita la contraseña ❌');
    }
    if (password !== passwordRepeat) {
        throw new MatchError('❌ Las contraseñas no coinciden ❌');
    }
}

export function validateAccessCode(code) {
    if (code === '' || code === null || code === undefined) {
        throw new ContentError('❌ Código de acceso es requerido ❌');
    }
    if (typeof code !== 'string' || !ALPHANUMERIC_REGEX.test(code)) {
        throw new ValidationError('❌ Código de acceso inválido, prueba de nuevo o solicita uno nuevo al administrador ❌');
    }
}

const validate = {
    username: validateUsername,
    password: validatePassword,
    passwordRepeat: validatePasswordRepeat,
    code: validateAccessCode
};
export default validate;