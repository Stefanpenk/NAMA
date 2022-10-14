import { NavLink } from "react-router-dom";

import { ChangeParamsButtonProps } from "../../../types/types";

function ChangeParamsButton({
  handleSubmit,
  svg,
  title,
  to,
}: ChangeParamsButtonProps) {
  return (
    <NavLink to={to} className="meals-type" onClick={handleSubmit}>
      <>{svg}</>
      <span>{title}</span>
    </NavLink>
  );
}

export default ChangeParamsButton;
