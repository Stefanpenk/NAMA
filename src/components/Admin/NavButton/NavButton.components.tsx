import { NavButtonProps } from "../../../types/types";
import { useState } from "react";

const NavButton = ({ active, svg, dataPage, setPage }: NavButtonProps) => {
  const [isActive, setIsActive] = useState(false);

  const handleChangePage = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.dataset.page;
    if (value === undefined) return;
    setPage(value);
    setIsActive((prev) => !prev);
  };
  return (
    <button
      className={`admin-nav-button ${active}`}
      data-page={dataPage}
      onClick={handleChangePage}
    >
      {svg}
    </button>
  );
};

export default NavButton;
