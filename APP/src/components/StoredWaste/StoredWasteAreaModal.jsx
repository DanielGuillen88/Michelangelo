import { Modal, Table } from 'react-bootstrap';

export default function StoredWasteAreaModal({ show, handleClose, selectedArea }) {
  return (
    <Modal show={show} onHide={handleClose} scrollable>
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
      <Modal.Footer className="d-flex justify-content-end">
        <span className="fw-bold fs-5">
          Total: {selectedArea?.totalWeight.toFixed()} Kg
        </span>
        {/* <button className="btn btn-secondary" onClick={handleClose}>
          Cerrar
        </button> */}
      </Modal.Footer>
    </Modal>
  );
};