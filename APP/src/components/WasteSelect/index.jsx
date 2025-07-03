import { useState, useEffect } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
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
        if (onWasteChange) {
            onWasteChange(selectedOption);
        }
    };

  return (
    <Row className="w-100 text-center">
        <Col className="p-0">
            <Form.Group className="w-100">
                <Select required id="waste-select"
                options={wasteOptions} value={selectedWaste}
                placeholder="SELECCIONA O BUSCA UN RESIDUO"
                noOptionsMessage={() => "No se encontraron opciones"}
                isClearable={true} isSearchable={true}
                onChange={handleWasteSelect}
                styles={{
                container: (base) => ({ ...base, width: '100%', }),
                control: (base) => ({ ...base, width: '100%', border: 'none', boxShadow: 'none',
                    backgroundColor: 'transparent', '&:hover': { border: 'none', }, }),
                menu: (base) => ({ ...base, border: 'none', boxShadow: 'none', }), }}
                />
            </Form.Group>
        </Col>
    </Row>
  );
};