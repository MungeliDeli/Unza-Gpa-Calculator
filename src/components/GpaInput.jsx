import './GpaInput.css'

const GpaInput = ({
  checked,
  onRadioChange,
  onSelectionChange,
  selectedValue,
  id
}) => {
  return (
    <div className="course_input">
      <div className="radio_btn">
        <label>
          <input
            type="radio"
            name={id}
            value={30}
            checked={checked === 30}
            onChange={onRadioChange}
          />
          Full Course
        </label>
        <label>
          <input
            type="radio"
            name={id}
            value={15}
            checked={checked === 15}
            onChange={onRadioChange}
          />
          Half Course
        </label>
      </div>
      <div className="grade">
        <select
          className="grade_select"
          onChange={onSelectionChange}
          value={selectedValue}
        >
          <option value="">Grade</option>
          <option value={5}>A+</option>
          <option value={4}>A</option>
          <option value={3.5}>B+</option>
          <option value={3}>B</option>
          <option value={2.37}>C+</option>
          <option value={1}>C</option>
          <option value={0}>D+</option>
          <option value={0}>D</option>
        </select>
      </div>
    </div>
  );
};
 
export default GpaInput;