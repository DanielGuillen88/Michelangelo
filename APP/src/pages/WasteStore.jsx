import ContainerSelect from "../components/ContainerSelect";
import InputField from "../components/InputField";
import WasteSelect from "../components/WasteSelect";
import { useState } from 'react';
import WasteStatus from "../components/WasteStatus";
import WarehouseAreaSelect from "../components/WarehouseAreaSelect";
import { Card, Container, Button } from "react-bootstrap";

export default function WasteStore() {

  const [selectedWaste, setSelectedWaste] = useState(null);
  const [selectedContainer, setSelectedContainer] = useState(null);
  const [wasteStatus, setWasteStatus] = useState('CORRECTO');
  const [selectedArea, setSelectedArea] = useState(null);
  const [weight, setWeight] = useState('');


  const handleWasteChange = (selectedWaste) => {
    setSelectedWaste(selectedWaste);
    console.log("Residuo seleccionado:", selectedWaste);
  };

  const handleContainerChange = (selectedContainer) => {
    setSelectedContainer(selectedContainer);
    console.log("Contenedor seleccionado:", selectedContainer);
  };

  const handleStatusChange = (wasteStatus) => {
    setWasteStatus(wasteStatus);
    console.log("Estado del residuo:", wasteStatus);
  };

  const handleAreaChange = (selectedArea) => {
    setSelectedArea(selectedArea);
    console.log("Área seleccionada:", selectedArea);
  };

  const bgColorForm = selectedContainer ? `bg-${selectedContainer.color}-subtle` : 'bg-light';

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedWaste || !selectedContainer || !weight || !wasteStatus || !selectedArea) {
      alert("Por favor, completa todos los campos del formulario.");
      console.log("Formulario incompleto:", {
        selectedWaste,
        selectedContainer,
        weight,
        wasteStatus,
        selectedArea
      });
      return;
    }

    const formData = {
      code: selectedWaste.code,
      name: selectedWaste.name,
      container: selectedContainer.value,
      weight: parseFloat(weight),
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      status: wasteStatus,
      location: selectedArea
    };
    console.log("Datos del formulario:", formData);
  };

  return (
<Container className="p-1">
      <Card className={`${bgColorForm}`}>
        <Card.Body className="p-1">
          <div className="d-flex justify-content-center flex-column align-items-center">
          
          <WasteSelect onWasteChange={handleWasteChange} />

          <ContainerSelect onContainerChange={handleContainerChange} />

          <InputField className="no-border-no-bg-input text-center" name="weight" type="number" placeholder=" PESO EN" value={weight} setValue={setWeight} unit="KG"/>

          <WasteStatus onStatusChange={handleStatusChange} />

          <WarehouseAreaSelect onAreaChange={handleAreaChange} />
          
          <Button variant="primary" onClick={handleSubmit} className="mt-4 w-50">Enviar</Button>      
      </div>
        </Card.Body>
      </Card>
    </Container>
  );
}