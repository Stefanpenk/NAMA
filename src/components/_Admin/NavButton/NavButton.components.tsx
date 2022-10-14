import { NavButtonProps } from "../../../types/types";

const NavButton = ({ active, svg, dataPage, setPage }: NavButtonProps) => {
  const handleChangePage = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.dataset.page;
    if (value === undefined) return;
    setPage(value);
  };
  return (
    <button
      className={`admin-nav-button ${active}`}
      data-page={dataPage}
      onClick={handleChangePage}
    >
      <>{svg}</>
    </button>
  );
};

export default NavButton;
