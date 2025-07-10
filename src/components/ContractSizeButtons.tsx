import "../styles/contract-size-buttons.scss";

interface ContractSizeButtonsProps {
  increment: () => void;
  decrement: () => void;
}

const ContractSizeButtons: React.FC<ContractSizeButtonsProps> = ({
  increment,
  decrement,
}) => {
  return (
    <div className="ContractSizeButtons">
      <button onClick={() => increment()}>Increment Contract Size</button>
      <button onClick={() => decrement()}>Decrement Contract Size</button>
    </div>
  );
};

export default ContractSizeButtons;
