import { useState } from 'react';

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

  console.log(`Estado actual: ${currentState.value}`);

  return (
    <button className={`btn btn-${currentState.variant}`} onClick={handleClick}>
      {currentState.value}
    </button>
  );
}