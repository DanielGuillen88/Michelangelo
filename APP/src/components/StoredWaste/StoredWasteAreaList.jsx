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
      <Row className="mb-1">
        {columnHeaders.map((header, index) => (
          <Col key={index} className="text-center fw-bold fs-4">
            Área {header}
          </Col>
        ))}
      </Row>
      {rowNumbers.map(rowNum => (
        <Row key={rowNum} className="mb-1">
          {columnHeaders.map(colChar => {
            const area = `${colChar}${rowNum}`;
            const areaData = processedWaste[area];
            return (
              <Col key={area}>
                <Card 
                  onClick={() => handleShow(areaData)}
                  style={{ cursor: 'pointer' }}
                >
                  <Card.Body className="d-flex p-0 flex-column text-center">
                    <div>
                      <Card.Title>{area}</Card.Title>
                      <Card.Text>
                        {areaData.wasteItems.map(item => item.code).join(', ') || 'N/A'}
                      </Card.Text>
                    </div>
                    {/* <div className="text-center">
                      <span className="fw-bold fs-5">
                        {areaData.totalWeight.toFixed()} Kg
                      </span>
                    </div> */}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      ))}

      {/* <Modal show={showModal} onHide={handleClose} scrollable>
        <Modal.Header closeButton>
          <Modal.Title>Detalles de Residuos en Área {selectedArea?.area}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedArea && selectedArea.wasteItems.length > 0 ? (
            <Table striped bordered hover responsive size="sm">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Nombre</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {selectedArea.wasteItems.map((wasteItem, index) => (
                  <tr key={index}>
                    <td>{wasteItem.code}</td>
                    <td>{wasteItem.name}</td>
                    <td>{wasteItem.totalWeight.toFixed()}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>No hay residuos almacenados en esta área.</p>
          )}
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <span className="fw-bold fs-5">
            Total: {selectedArea?.totalWeight.toFixed()} Kg
          </span>
          <button className="btn btn-secondary" onClick={handleClose}>
            Cerrar
          </button>
        </Modal.Footer>
      </Modal> */}

    <StoredWasteAreaModal show={showModal} handleClose={handleClose} selectedArea={selectedArea} />

    </Container>
  );
};