import styles from "@ui/styles/contract-size-buttons.module.scss";

interface ContractSizeButtonsProps {
  increment: () => void;
  decrement: () => void;
}

const ContractSizeButtons: React.FC<ContractSizeButtonsProps> = ({
  increment,
  decrement,
}) => {
  return (
    <div className={styles.contractSizeButtons}>
      <button onClick={() => increment()}>Increment Contract Size</button>
      <button onClick={() => decrement()}>Decrement Contract Size</button>
    </div>
  );
};

export default ContractSizeButtons;
