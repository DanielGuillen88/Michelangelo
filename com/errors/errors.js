// Error entrada/input no válida por parte del usuario
class ContentError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = 400; // error entrada usuario
    }
}

// Error de coincidencia, por ejemplo, al comparar contraseñas
class MatchError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = 400; // error entrada usuario
    }
}

// Error de duplicidad, por ejemplo, al intentar crear un recurso que ya existe
class DuplicityError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = 409; // error por conflicto
    }
}

// Error del sistema, por ejemplo, un error inesperado en el servidor
class SystemError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = 500; // error servidor
    }
}

// Error de validación, por ejemplo, al validar datos de entrada
class ValidationError extends Error {
    constructor(message, details = []) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = 422; // datos no procesables
        this.details = details; // Para errores de validación detallados
    }
}

// Error de credenciales, por ejemplo, al autenticar un usuario
class CredentialsError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = 401; // acceso no autorizado por credenciales inválidas
    }
}

// Error de recurso no encontrado, por ejemplo, al buscar un recurso que no existe
class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = 404; // no encontrado
    }
}

// Error de acceso prohibido, por ejemplo, al intentar acceder a un recurso sin permisos
class ForbiddenError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = 403; // acceso prohibido aunque usuario esté autenticado
    }
}

export {
    ContentError,
    MatchError,
    DuplicityError,
    SystemError,
    ValidationError,
    CredentialsError,
    NotFoundError,
    ForbiddenError
};

// Objeto de errores con acceso rápido
const errors = {
    ContentError,
    MatchError,
    DuplicityError,
    SystemError,
    ValidationError,
    CredentialsError,
    NotFoundError,
    ForbiddenError
};

export default errors;