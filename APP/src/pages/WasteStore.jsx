import ContainerSelect from "../components/ContainerSelect";
import InputField from "../components/InputField";
import WasteSelect from "../components/WasteSelect";
import { useState } from 'react';
import WasteStatus from "../components/WasteStatus";

export default function WasteStore() {

  const [weight, setWeight] = useState('');

  return (
    <div className="mt-5 d-flex justify-content-center flex-column align-items-center">
      <WasteSelect />
      <ContainerSelect />
      <InputField name="weight" type="number" placeholder="Peso en kg" value={weight} setValue={setWeight} />
      <WasteStatus />
      
      <p>Esta página está en construcción. ¡Pronto podrás gestionar tus residuos aquí!</p>
    </div>
  );
}