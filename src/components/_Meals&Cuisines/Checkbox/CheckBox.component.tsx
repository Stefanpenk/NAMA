import { useRef } from "react";

import { CheckboxProps } from "../../../types/types";

import "./CheckBox.styles.css";

const Checkbox = ({
  name,
  svg,
  className,
  setIntolerances,
  setDiets,
}: CheckboxProps) => {
  const labelRef = useRef<HTMLLabelElement>(null);

  const handleChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.getAttribute("name");
    const classList = e.currentTarget.classList;
    const checked = e.currentTarget.checked;
    const name = labelRef.current!.htmlFor;
    labelRef.current!.classList.toggle(name);
    if (classList.contains("intolerances")) {
      checked
        ? setIntolerances((prevState) => [...prevState, value!])
        : setIntolerances((intolerances) =>
            intolerances.filter((intolerance) => {
              return intolerance !== value;
            })
          );
    } else if (classList.contains("diet")) {
      checked
        ? setDiets((prevState) => [...prevState, value!])
        : setDiets((diets) =>
            diets.filter((diet) => {
              return diet !== value;
            })
          );
    }
  };

  return (
    <label htmlFor={name} className="label-icons" ref={labelRef}>
      <input
        type="checkbox"
        name={name}
        id={name}
        className={`input-icons ${className}`}
        onChange={handleChangeInput}
      />
      <>{svg}</>
    </label>
  );
};

export default Checkbox;
