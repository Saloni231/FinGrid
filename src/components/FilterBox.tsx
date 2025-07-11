import styles from "../styles/filter-box.module.scss";

interface FilterBoxProps {
  filterValue: string;
  label: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FilterBox: React.FC<FilterBoxProps> = ({
  filterValue,
  label,
  handleInputChange,
}) => {
  return (
    <div className={styles.filterBox}>
      <label htmlFor={label}>{label} </label>
      <input
        id={label}
        type="text"
        value={filterValue}
        onChange={(e) => handleInputChange(e)}
        placeholder={label}
      />
    </div>
  );
};

export default FilterBox;
