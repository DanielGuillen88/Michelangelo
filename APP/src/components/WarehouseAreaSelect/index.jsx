import { useState, useEffect } from 'react';
import { Row, Col, Button, ButtonGroup } from 'react-bootstrap';

const areaSeriesMap = {
  'A': ['A1', 'A2', 'A3', 'A4'],
  'B': ['B1', 'B2', 'B3', 'B4'],
  'C': ['C1', 'C2', 'C3', 'C4']
};

export default function WarehouseAreaSelect({ onAreaChange }) {

  const [currentSeries, setCurrentSeries] = useState(null);
  const [seriesIndex, setSeriesIndex] = useState(0);
  const [selectedArea, setSelectedArea] = useState(null);

  useEffect(() => {
    let location = null;
    if (currentSeries) {
      const possibleAreas = areaSeriesMap[currentSeries];
      const selectedArea = possibleAreas[seriesIndex % possibleAreas.length];
      setSelectedArea(selectedArea);

      // --- CREAMOS EL OBJETO LOCATION ---
      location = {
        area: selectedArea,
        type: "ALMACEN" // siempre ALMACEN
      };
    } else {
      setSelectedArea(null);
    }

    // Llamamos a onAreaChange con el objeto location o null
    if (onAreaChange) {
      onAreaChange(location);
    }
  }, [currentSeries, seriesIndex, onAreaChange]);


  const handleSeriesClick = (series) => {
    if (series === currentSeries) {
      const possibleAreas = areaSeriesMap[series];
      setSeriesIndex((prevIndex) => (prevIndex + 1) % possibleAreas.length);
    } else {
      setCurrentSeries(series);
      setSeriesIndex(0);
    }
  };

  return (
    
    <Row className="w-100 justify-content-center"> 
      <Col xs={12} className="p-0">
      <ButtonGroup className="d-flex w-100" role="group" aria-label="Selección de Serie de Área">
        {Object.keys(areaSeriesMap).map((series) => (
          <Button
            key={series}
            type="button"
            variant={currentSeries === series ? 'secondary' : 'light'}
            onClick={() => handleSeriesClick(series)}
            className="px-3 rounded-0 flex-grow-1" 
            style={{ fontWeight: 'bold' }}
          >
            {series}
            {currentSeries === series && selectedArea && (
              <span className="ms-2">{selectedArea.slice(1)}</span>
            )}
          </Button>
        ))}
      </ButtonGroup>
      </Col>
    </Row>
  );
}