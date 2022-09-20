interface CheckboxProps {
  name: string;
  className: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  svg: any;
}

const Checkbox = ({ name, svg, className, onChange }: CheckboxProps) => {
  return (
    <>
      <label htmlFor={name} className="label-icons">
        {svg}
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
