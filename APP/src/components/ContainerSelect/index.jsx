import React, { useState } from 'react';
import Select from 'react-select';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import { palet, grg, bigbag, b200, bm200 } from '../../img';

const containerOptions = [
    { value: 'PALET', label: 'PALET', img: palet, color: 'danger' },
    { value: 'GRG', label: 'GRG', img: grg, color: 'warning'},
    { value: 'BIGBAG', label: 'BIGBAG', img: bigbag, color: 'success' },
    { value: 'B200', label: 'BIDÓN 200', img: b200, color: 'primary' },
    { value: 'B<200', label: 'BIDÓN <200', img: bm200, color: 'info' }
  ];

export default function ContainerSelect() {
    const [selectedContainer, setSelectedContainer] = useState(null);

    const handleChange = (selectedOption) => {
      setSelectedContainer(selectedOption);
      console.log("Contenedor seleccionado:", selectedOption);
    };

    // const bgContainerSelect = selectedContainer ? `alert alert-${selectedContainer.color}` : 'bg-light';
    const bgContainerSelect = selectedContainer ? `bg-${selectedContainer.color}-subtle` : 'bg-light';
    return (
    <Container className="">
        <Row className="justify-content-center">
            <Col md={8}>
                <Card className={`${bgContainerSelect}`} >
                    <Card.Body className="">
                        <Row className="h-100 align-items-center">
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Select
                                        id="container-select"
                                        // menuIsOpen={true}
                                        components={{ DropdownIndicator: null, IndicatorSeparator: null }}
                                        options={containerOptions}
                                        onChange={handleChange}
                                        value={selectedContainer}
                                        placeholder="Selecciona o busca..."
                                        isClearable={true}
                                        isSearchable={true}
                                        noOptionsMessage={() => "No hay opciones disponibles"}
                                    />
                                </Form.Group>
                            </Col>
        
                            <Col md={6} className="text-center">
                                {selectedContainer ? (
                                <div>
                                    {selectedContainer.img && (
                                    <img
                                        src={selectedContainer.img}
                                        alt={selectedContainer.label}
                                        style={{ maxWidth: '200px', height: 'auto' }} 
                                        className="img-fluid rounded"
                                    />
                                    )}
                                    {/* <h3 className="text-white">{selectedContainer.label}</h3> */}
                                </div>
                                ) : (
                                <p className="lead text-dark">Selecciona un contenedor para ver sus detalles.</p>
                                )}
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </Container>
    );
}