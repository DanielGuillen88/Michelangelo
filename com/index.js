import { ContentError, MatchError, DuplicityError, ValidationError, CredentialsError, NotFoundError, ForbiddenError, SystemError  } from "./errors/errors";
import { validateUsername, validatePassword, validatePasswordRepeat, validateAccessCode } from "./validation/validateUsers.js";

// Objeto de errores con acceso rápido
const errors = {
    ContentError,
    MatchError,
    DuplicityError,
    ValidationError,
    CredentialsError,
    NotFoundError,
    ForbiddenError,
    SystemError
};


const validateUsers = {
    username: validateUsername,
    password: validatePassword,
    passwordRepeat: validatePasswordRepeat,
    code: validateAccessCode
};

export default {
    errors,
    validateUsers
};