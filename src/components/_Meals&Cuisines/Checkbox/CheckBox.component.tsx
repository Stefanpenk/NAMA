import { CheckboxProps } from "../../../types/types";

const Checkbox = ({ name, svg, className, onChange }: CheckboxProps) => {
  return (
    <>
      <label htmlFor={name} className="label-icons">
        <>{svg}</>
      </label>
      <input
        type="checkbox"
        name={name}
        id={name}
        className={`input-icons ${className}`}
        onChange={onChange}
      />
    </>
  );
};

export default Checkbox;
