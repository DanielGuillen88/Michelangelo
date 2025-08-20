import { Modal, Table } from 'react-bootstrap';

export default function StoredWasteAreaModal({ show, handleClose, selectedArea }) {
  
  const modalColorClass = selectedArea?.colorClass ? selectedArea.colorClass : '';
  const modalColorStyle = selectedArea?.colorStyle ? selectedArea.colorStyle : {};

  
  return (
    // <Modal className={`bg-light ${modalColorClass}`} style={{borderColor: modalColorStyle.borderColor}} show={show} onHide={handleClose} scrollable dialog>
    <Modal show={show} onHide={handleClose} scrollable dialog>
        
        {/* <Modal.Header closeButton className={`bg-light ${modalColorClass}`} style={{borderColor: modalColorStyle.borderColor}}> */}
        <Modal.Header className={`bg-light ${modalColorClass}`} style={{borderColor: modalColorStyle.borderColor}} closeButton>
          <Modal.Title>Residuos en Área {selectedArea?.area}: {selectedArea?.totalWeight.toFixed()} Kg</Modal.Title>
        </Modal.Header>

        <Modal.Body className={`bg-light ${modalColorClass}`} style={{borderColor: modalColorStyle.borderColor}}>
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
    </Modal>
  );
};