import { useState } from 'react';

export default function WarehouseAreaSelect({ onAreaChange }) {

  const warehouseAreas = ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3'];

  const [selectedArea, setSelectedArea] = useState(null);

  const handleAreaClick = (area) => {
    setSelectedArea(area);

    if (onAreaChange) {
      onAreaChange(area);
  }
  };

  return (
    <div className="">
      <div
        className="d-grid gap-0"
        style={{ gridTemplateColumns: 'repeat(3, 1fr)' }} // Define 3 columnas de igual ancho
        role="group"
        aria-label="Selección de Área de Almacén"
      >
        {warehouseAreas.map((area) => (
          <button
            key={area}
            type="button"
            className={`btn ${selectedArea === area ? 'btn-primary' : 'btn-outline-primary'} rounded-0`} // Para selección
            onClick={() => handleAreaClick(area)} // Para selección
          >
            {area}
          </button>
        ))}
      </div>
    </div>
  );
}