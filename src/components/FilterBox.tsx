import "../styles/filter-box.scss";

interface FilterBoxProps {
  filterValue: string;
  label: string;
  handleInputChange: Function;
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
