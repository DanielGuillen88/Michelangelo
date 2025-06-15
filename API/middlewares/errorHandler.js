export function errorHandler(err, req, res, next) {
    // Error completo en desarrollo visible en consola
    if (process.env.NODE_ENV === 'development') {
        console.error('ERROR 💥', {
            name: err.name,
            message: err.message,
            stack: err.stack
        });
    }
    
    // Respuesta para errores conocidos
    if (err.statusCode) {
        return res.status(err.statusCode).json({
            status: 'error', // Estado de la respuesta
            error: { // Detalles del error
                type: err.name, // nombre del error
                message: err.message // mensaje del error
            }
        });
    }
    
    // Error no reconocido (500)
    res.status(500).json({
        status: 'error',
        error: {
            type: 'InternalServerError',
            message: '¡Vaya! Parece que algo ha ido mal en nuestro sistema. Estamos trabajando para solucionarlo lo antes posible.' // Mensaje genérico para errores no reconocidos
        }
    });
}