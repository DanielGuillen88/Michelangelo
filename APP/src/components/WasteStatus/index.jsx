import { useState } from 'react';

export default function WasteStatus() {

  const buttonStates = [
    { value: 'CORRECTO', variant: 'success' },
    { value: 'REVISAR', variant: 'warning' },
    { value: 'ESTANCADO', variant: 'danger' },
  ];

  const [status, setStatus] = useState(0);

  // Función que se ejecuta cada vez que se hace clic en el botón.
  const handleClick = () => {
    const indexButtonStates = (status + 1) % buttonStates.length;
    setStatus(indexButtonStates);
  };

  const currentState = buttonStates[status];

  console.log(`Estado actual: ${currentState.value}`);

  return (
    <button className={`btn btn-${currentState.variant}`} onClick={handleClick}>
      {currentState.value}
    </button>
  );
}