import "../styles/filter-box.scss";

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
    <div className="filterBox">
      <label>{label} </label>
      <input
        type="text"
        value={filterValue}
        onChange={(e) => handleInputChange(e)}
        placeholder={label}
      />
    </div>
  );
};

export default FilterBox;
