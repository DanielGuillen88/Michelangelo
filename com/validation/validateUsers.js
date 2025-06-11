import { ContentError, MatchError, ValidationError } from '../errors/errors.js';
import { VALIDATION } from './validationConstants.js';

// username podra ser nombre, apellido o dni (Esto significa que combinaciones como "Juan Perez" no serán válidas. Ejemplos válidos serían "JuanPerez" o "Juan_Perez")
export function validateUsername(username) { 
    if (!username) {
        throw new ContentError('❌ Nombre de usuario requerido ❌');
    }
    if (typeof username !== 'string' || !VALIDATION.username.test(username)) {
        throw new ValidationError('❌ Nombre de usuario inválido, debe tener entre 3 y 20 caracteres y solo contener letras, números, guiones y guiones bajos ❌' );
    }
}

export function validatePassword(password) {
        if (!password) {
        throw new ContentError('❌ Contraseña de usuario requerida ❌');
    }
    if (typeof password !== 'string' || !VALIDATION.password.test(password)) {
        throw new ValidationError('❌ Contraseña inválida, debe tener entre 6 y 10 caracteres, al menos una letra y un número ❌' );
    }
}

export function validatePasswordRepeat(password, passwordRepeat) {
        if (!passwordRepeat) {
        throw new ContentError('❌ Para evitar errores, repita la contraseña ❌');
    }
    if (password !== passwordRepeat) {
        throw new MatchError('❌ Las contraseñas no coinciden ❌');
    }
}

export function validateAccessCode(code) {
        if (!code) {
        throw new ContentError('❌ Código de acceso es requerido ❌');
    }
    if (typeof code !== 'string' || !VALIDATION.alphanumeric.test(code)) {
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