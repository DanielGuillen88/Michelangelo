import { useState } from 'react';
import { Row, Col, Button, ButtonGroup } from 'react-bootstrap';
import { palet, grg, bigbag, b200, bm200, otro } from '../../img';
import './index.css';

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
        <Row className="w-100">
            <Col xs={12} className="p-0">
                <ButtonGroup className="d-flex flex-wrap w-100" role="group" aria-label="Seleccionar tipo de contenedor">
                    {containerOptions.map((option) => (
                        <Col
                            key={option.value}
                            xs={4}  /* 3 botones por fila en xs */
                            md={2}  /* 6 botones por fila en md y superiores */
                        >
                            <Button
                                variant={selectedContainer && selectedContainer.value === option.value ? option.color : `${option.color}-outline`}
                                onClick={() => handleButtonClick(option)}
                                className="w-100 d-flex flex-column align-items-center justify-content-center rounded-0 py-2"
                                style={{ height: '100%' }}
                            >
                                <img
                                    src={option.img}
                                    alt={option.label}
                                    className="container-img-size-responsive"
                                />
                            </Button>
                        </Col>
                    ))}
                </ButtonGroup>
            </Col>
        </Row>
    );
};