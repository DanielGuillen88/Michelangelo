import { useState, useEffect } from 'react';
import Select from 'react-select';
import { Container, Form, Row, Col, Spinner, Alert } from 'react-bootstrap';
import data from './wasteList.json';

export default function WasteSelect() {
    const [ wasteOptions, setWasteOptions ] = useState([]);
    const [ selectedWaste, setSelectedWaste ] = useState(null);

    useEffect(() => {
        const formattedWasteOptions = data.map(waste => ({
            value: waste.code,
            label: `${waste.code} - ${waste.name}`,
            code: waste.code,
            name: waste.name
        }));
        setWasteOptions(formattedWasteOptions);
    }, []);

    const handleWasteSelect = (selectedOption) => {
        setSelectedWaste(selectedOption);

        if (selectedOption) {
            const { code, name } = selectedOption;
            console.log(`Residuo seleccionado: ${code} - ${name}`);
        } else {
            console.log('No se ha seleccionado ningún residuo');
        }
    };

  return (
    <Container className="mt-4">
      <Row className="justify-content-md-center">
        <Col md={8}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="waste-select">Seleccionar residuo:</Form.Label>
            <Select
                required
                id="waste-select"
                options={wasteOptions} // Usamos las opciones formateadas
                value={selectedWaste} // El estado que guarda la opción seleccionada
                placeholder="Buscar por código o nombre de residuo"
                noOptionsMessage={() => "No se encontraron opciones"}
                isClearable={true}
                isSearchable={true}
                onChange={handleWasteSelect}
            />
          </Form.Group>
        </Col>
      </Row>
    </Container>
  );
};