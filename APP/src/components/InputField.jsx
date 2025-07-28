import { Form, InputGroup } from 'react-bootstrap';
import './InputField.css';

export default function InputField({ label, name, type, placeholder, value, setValue, className = '', unit }) {
  return (
    <Form.Group className={``} controlId={name}>
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
        {unit &&  <InputGroup.Text className="no-border-no-bg-unit">
                    {unit}
                  </InputGroup.Text>}
      </InputGroup>
    </Form.Group>
  );
}