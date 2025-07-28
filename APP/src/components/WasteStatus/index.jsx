import { useState } from 'react';
import { Button } from "react-bootstrap";

export default function WasteStatus({ onStatusChange }) {

  const buttonStates = [
    { value: 'CORRECTO', variant: 'success' },
    { value: 'REVISAR', variant: 'warning' },
    { value: 'ESTANCADO', variant: 'danger' },
  ];

  const [statusIndex, setStatusIndex] = useState(0);

  // Función que se ejecuta cada vez que se hace clic en el botón.
  const handleClick = () => {
    const indexButtonStates = (statusIndex + 1) % buttonStates.length;
    setStatusIndex(indexButtonStates);

    if (onStatusChange) {
      onStatusChange(buttonStates[indexButtonStates].value);
    }
  };

  const currentState = buttonStates[statusIndex];

  return (
    <Button
      className={`d-flex w-100 rounded-bottom-left align-items-center justify-content-center text-center`} // Centra contenido flex y texto
      variant={currentState.variant}
      onClick={handleClick}
    >
      {currentState.value}
    </Button>
  );
}