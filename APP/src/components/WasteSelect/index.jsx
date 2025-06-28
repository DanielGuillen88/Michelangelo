import { useState, useEffect } from 'react';
import Select from 'react-select';
import { Form, Row, Col } from 'react-bootstrap';
import data from './wasteList.json';

export default function WasteSelect({ onWasteChange }) {
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
        if (onWasteChange) {
            onWasteChange(selectedOption);
        }
    };

  return (
    <Row className="h-100 align-items-center">
          <Col className="mx-auto">
              <Form.Group className="mb-3">
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
  );
};