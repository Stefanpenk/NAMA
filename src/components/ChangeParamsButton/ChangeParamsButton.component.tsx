import { NavLink } from "react-router-dom";

interface ChangeParamsButtonProps {
  handleSubmit: () => void;
  svg: React.SVGProps<SVGSVGElement>;
  title: string;
  to: string;
}

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
