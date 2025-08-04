import ContainerSelect from "../components/ContainerSelect";
import InputField from "../components/InputField";
import WasteSelect from "../components/WasteSelect";
import { useState, useCallback } from 'react';
import WasteStatus from "../components/WasteStatus";
import WarehouseAreaSelect from "../components/WarehouseAreaSelect";
import { Card, Container, Button, Row, Col } from "react-bootstrap";
import createNewStoredWaste from "../services/waste/createNewStoredWaste.js";
import validate from 'com/validation/validateWaste.js';

export default function WasteStore() {
  const [selectedWaste, setSelectedWaste] = useState(null);
  const [selectedContainer, setSelectedContainer] = useState(null);
  const [wasteStatus, setWasteStatus] = useState('CORRECTO');
  const [selectedArea, setSelectedArea] = useState('');
  // const [selectedArea, setSelectedArea] = useState(null);
  const [weight, setWeight] = useState('');

  const [lastStoredWaste, setLastStoredWaste] = useState(null);
  const [validationErrorMessage, setValidationErrorMessage] = useState('');

  const handleWasteChange = (waste) => {
    setSelectedWaste(waste);
    console.log("Residuo seleccionado:", waste);
  };

  const handleContainerChange = (container) => {
    setSelectedContainer(container);
    console.log("Contenedor seleccionado:", container);
  };

  const handleStatusChange = (status) => {
    setWasteStatus(status);
    console.log("Estado del residuo:", status);
  };

  const handleAreaChange = useCallback((area) => {
    setSelectedArea(area);
    console.log("Área seleccionada:", area);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setValidationErrorMessage(''); // limpiar errores previos

    // recogemos los datos a validar
    const dataToValidate = {
      code: selectedWaste ? selectedWaste.code : null,
      name: selectedWaste ? selectedWaste.name : null,
      container: selectedContainer ? selectedContainer.value : null,
      weight: weight,
      month: (new Date().getMonth() + 1).toString().padStart(2, '0'),
      year: new Date().getFullYear().toString(),
      status: wasteStatus,
      location: selectedArea
    };

    try { // Validamos los datos
      validate.code(dataToValidate.code);
      validate.name(dataToValidate.name);
      validate.container(dataToValidate.container);
      validate.weight(dataToValidate.weight);
      validate.month(dataToValidate.month);
      validate.year(dataToValidate.year);
      validate.status(dataToValidate.status);
      validate.location(dataToValidate.location);

      // si todo es correcto, guardamos los datos del residuo
      const newStoredWaste = {
        code: dataToValidate.code,
        name: dataToValidate.name,
        container: dataToValidate.container,
        containerColor: selectedContainer.color,
        weight: parseFloat(dataToValidate.weight),
        month: dataToValidate.month,
        year: dataToValidate.year,
        status: dataToValidate.status,
        location: dataToValidate.location
      };

      await createNewStoredWaste(newStoredWaste); // fetch a la API para crear el residuo almacenado

      // guardamos el residuo en el estado
      setLastStoredWaste(newStoredWaste);
      console.log("Datos del formulario validados y listos:", newStoredWaste);

      // setSelectedWaste(null);
      // setSelectedContainer(null);
      // setWasteStatus('CORRECTO');
      // setSelectedArea(null);
      setWeight(''); // solo peso por si repetimos residuo

    } catch (error) {
      setValidationErrorMessage(error.message);
      console.error("Error de validación:", error.message);
    }
  };

  // colores de fondo y borde para el formulario
  const bgColorForm = selectedContainer ? `bg-${selectedContainer.color}-subtle` : 'bg-light';
  const colorBorder = selectedContainer ? `border-${selectedContainer.color}-subtle` : 'border-light-subtle';

  return (
    <Container className="p-1">
      <Card className={`border-3 ${colorBorder} ${bgColorForm}`}>
        <Card.Body className="p-0">
          <Col xs={12} className="d-flex justify-content-center flex-column align-items-center">
            <WasteSelect onWasteChange={handleWasteChange} selectedWaste={selectedWaste} />
          </Col>

          <Col xs={12} className={`border-top border-3 ${colorBorder} d-flex justify-content-center flex-column align-items-center`}>
            <ContainerSelect onContainerChange={handleContainerChange} selectedContainer={selectedContainer} /> 
          </Col>

          <Col xs={12} className={`border-top border-3 ${colorBorder} d-flex justify-content-center flex-column align-items-center`}>
            <WarehouseAreaSelect onAreaChange={handleAreaChange} selectedArea={selectedArea} />
          </Col>

          <Col xs={12} className={`border-top border-3 ${colorBorder}`}>
            <Row className="g-0 align-items-center">
              <Col xs={4} className="p-0">
                <WasteStatus onStatusChange={handleStatusChange} wasteStatus={wasteStatus} /> 
              </Col>

              <Col xs={5} className="p-0" >
                <InputField
                  className="no-border-no-bg-input text-center "
                  name="weight"
                  type="number"
                  placeholder=" PESO EN"
                  value={weight}
                  setValue={setWeight}
                  unit="KG"
                />
              </Col>

              <Col xs={3} className="p-0">
                <div className="d-grid">
                  <Button variant="primary" onClick={handleSubmit} className="w-100 rounded-bottom-right">Enviar</Button>
                </div>
              </Col>
            </Row>
          </Col>
        </Card.Body>
      </Card>

      {/* --- alerta de errores --- */}
      {validationErrorMessage && (
        <div className="alert alert-danger mt-3 text-center" role="alert">
          {validationErrorMessage}
        </div>
      )}

      {/* --- Tarjeta de Información del Residuo Almacenado --- */}
      {lastStoredWaste && (
        <Card className={`mt-2 border-3 border-${lastStoredWaste.containerColor}-subtle bg-${lastStoredWaste.containerColor}-subtle`}>
          <Card.Body className="p-1 text-center">
            <Col xs={12}>
              <strong>{lastStoredWaste.code}</strong> - {lastStoredWaste.name}
            </Col>
            <Row xs={12}>
              <Col xs={6} md={6}>
                Ubicación: <strong>{lastStoredWaste.location.area || lastStoredWaste.location.reference}</strong> - <strong>{lastStoredWaste.status}</strong>
              </Col>
              <Col xs={6} md={6}>
                <strong>{lastStoredWaste.container}</strong> - <strong>{lastStoredWaste.weight} KG</strong>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}