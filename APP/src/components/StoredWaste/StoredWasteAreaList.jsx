import { useState, useEffect } from 'react';
import { Container, Spinner, Alert, Row, Col, Card } from 'react-bootstrap';
import getWasteStored from '../../services/waste/getWasteStored.js';
import StoredWasteAreaModal from './StoredWasteAreaModal.jsx';

export default function StoredWasteAreaList() {
  const [storedWaste, setStoredWaste] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedArea, setSelectedArea] = useState(null);

  const handleShow = (areaData) => {
    setSelectedArea(areaData);
    setShowModal(true);
  };
  const handleClose = () => setShowModal(false);

  useEffect(() => {
    const fetchWaste = async () => {
      try {
        // Obtenemos todos los residuos sin filtros
        const data = await getWasteStored();
        setStoredWaste(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Error al obtener residuos:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWaste();
  }, []);

  // ordenamos los residuos por área y sumamos los pesos 

  const processWasteByArea = () => {
    const processedData = {};
    const warehouseAreas = [
      'A1', 'A2', 'A3', 'A4',
      'B1', 'B2', 'B3', 'B4',
      'C1', 'C2', 'C3', 'C4'
    ];
  
    warehouseAreas.forEach(area => {
      processedData[area] = {
        area: area,
        wasteItems: [],
        totalWeight: 0,
      };
    });

    storedWaste.forEach(item => {
      const area = item.location.area;
      const weight = parseFloat(item.weight);

      if (area && processedData[area] && !isNaN(weight)) {
        // Agrupamos por tipo de residuo (código) para sumar los pesos
        const existingWaste = processedData[area].wasteItems.find(
          (waste) => waste.code === item.code
        );

        if (existingWaste) {
          existingWaste.totalWeight += weight;
          existingWaste.items.push(item);
        } else {
          processedData[area].wasteItems.push({
            code: item.code,
            name: item.name,
            totalWeight: weight,
            items: [item],
          });
        }
        processedData[area].totalWeight += weight;
      }
    });

    return processedData;
  };

  const processedWaste = processWasteByArea();
  const columnHeaders = ['A', 'B', 'C'];
  const rowNumbers = [1, 2, 3, 4];

  if (isLoading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-3">
        <Alert variant="danger">
          Error al cargar los residuos: {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-3 text-center">
      <h2>Residuos Almacenados por Área</h2>
      {rowNumbers.map(rowNum => (
        <Row key={rowNum} className="mb-1">
          {columnHeaders.map(colChar => {
            const area = `${colChar}${rowNum}`;
            const areaData = processedWaste[area];
            
            let cardColorClass = '';
            let cardColorStyle = {}; // estilos mas personalizados si es necesario

            if (colChar === 'A') {
              cardColorClass = 'border-light-subtle bg-secondary-subtle';
            } else if (colChar === 'B') {
              // Se utiliza un estilo en línea para el color "pink"
              cardColorClass = ' border-light-subtle bg-light-subtle';
            } else if (colChar === 'C') {
              cardColorClass = 'border-light-subtle bg-secondary-subtle';
            }
            
            const areaDataWithColor = { ...areaData, colorClass: cardColorClass, colorStyle: cardColorStyle };

            return (
              <Col key={area}>
                <Card 
                  onClick={() => handleShow(areaDataWithColor)}
                  className={`border border-3 ${cardColorClass} area-card`}
                  style={{ cursor: 'pointer', ...cardColorStyle }}
                >
                  <Card.Body className="d-flex p-0 flex-column text-center">
                    <div>
                      <Card.Text>
                        <b>{area}:</b> {areaData.wasteItems.map(item => item.code).join(', ') || `Ningún residuo almacenado`}
                      </Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      ))}

      <StoredWasteAreaModal show={showModal} handleClose={handleClose} selectedArea={selectedArea} />
    </Container>
  );
};