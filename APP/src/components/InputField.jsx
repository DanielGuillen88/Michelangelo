import { Form } from 'react-bootstrap';

export default function InputField({ label, name, type, placeholder, value, setValue, className = '' }) {
  return (
    <Form.Group className={`mb-3 ${className}`} controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        // required
      />
    </Form.Group>
  );
}