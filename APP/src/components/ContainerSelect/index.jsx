import { useState } from 'react';
import { Row, Col, Button, ButtonGroup } from 'react-bootstrap';
import { palet, grg, bigbag, b200, bm200, otro } from '../../img';

const containerOptions = [
    { value: 'PALET', label: 'PALET', img: palet, color: 'danger' },
    { value: 'GRG', label: 'GRG', img: grg, color: 'warning'},
    { value: 'BIGBAG', label: 'BIGBAG', img: bigbag, color: 'success' },
    { value: 'B200', label: 'BIDÓN 200', img: b200, color: 'primary' },
    { value: 'B<200', label: 'BIDÓN <200', img: bm200, color: 'info' },
    { value: 'OTRO', label: 'OTRO', img: otro, color: 'secondary' }
  ];

export default function ContainerSelect({ onContainerChange}) {

    const [selectedContainer, setSelectedContainer] = useState(null);

    const handleButtonClick = (option) => {
        setSelectedContainer(option);
        onContainerChange(option);
    };

    return (
        <Row className="w-100 mb-3 justify-content-center"> {/* w-100 para que ocupe todo el ancho, justify-content-center para centrar el grupo de botones */}
            <Col xs={12} sm={10} md={8} lg={6}> {/* Ajusta el ancho máximo del grupo de botones en diferentes pantallas */}
                <ButtonGroup className="d-flex flex-wrap w-100" role="group" aria-label="Seleccionar tipo de contenedor">
                    {containerOptions.map((option) => (
                        // Cada botón ocupará 4 columnas en sm (3 por fila), y 2 columnas en md/lg (6 por fila)
                        // Esto se logra al anidar Row/Col dentro del ButtonGroup (es un poco no-estándar para ButtonGroup, pero funciona para el layout)
                        // Alternativa: Renderizar la ButtonGroup dentro de Rows/Cols con Col específicos para cada botón
                        <Col
                            key={option.value}
                            xs={6} // En pantallas extra pequeñas (móviles), 2 columnas por botón (2 botones por fila)
                            sm={4} // En pantallas pequeñas, 3 columnas por botón (3 botones por fila)
                            lg={2} // En pantallas grandes, 2 columnas por botón (6 botones por fila)
                            className="p-1" // Pequeño padding entre botones
                        >
                            <Button
                                variant={option.color} // Usa el color definido en las opciones
                                onClick={() => handleButtonClick(option)}
                                active={selectedContainer && selectedContainer.value === option.value}
                                className="w-100 d-flex flex-column align-items-center justify-content-center py-2" // w-100 para que ocupe toda la Col, flex para imagen y texto
                                style={{
                                    height: '100%', // Asegura que los botones tengan la misma altura si el contenido lo permite
                                    fontSize: '0.8rem' // Ajusta el tamaño de la fuente si es necesario
                                }}
                            >
                                <img
                                    src={option.img}
                                    alt={option.label}
                                    className="mb-1"
                                    style={{ maxWidth: '50px', maxHeight: '50px' }}
                                />
                                {/* {option.label} */}
                            </Button>
                        </Col>
                    ))}
                </ButtonGroup>
            </Col>
        </Row>
    );
};