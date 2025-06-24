import ContainerSelect from "../components/ContainerSelect";
import WasteSelect from "../components/WasteSelect";

export default function WasteStore() {
  return (
    <div className="mt-5 d-flex justify-content-center flex-column align-items-center">
      <WasteSelect />
      <ContainerSelect />
      <p>Esta página está en construcción. ¡Pronto podrás gestionar tus residuos aquí!</p>
    </div>
  );
}