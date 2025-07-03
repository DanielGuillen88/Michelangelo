import { Form, InputGroup } from 'react-bootstrap';
import './InputField.css';

export default function InputField({ label, name, type, placeholder, value, setValue, className = '', unit }) { // Añade 'unit' aquí
  return (
    <Form.Group className={`mb-2`} controlId={name}>
      {label && <Form.Label>{label}</Form.Label>}
      <InputGroup>
        <Form.Control
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={className}
        />
        {unit && <InputGroup.Text>{unit}</InputGroup.Text>}
      </InputGroup>
    </Form.Group>
  );
}