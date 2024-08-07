type inputProps = {
  label: string;
  type: string;
  value: string;
  hasError: boolean;
  setValue: (value: string) => void;
};

const InputField = ({ label, type, value, hasError, setValue }: inputProps) => {
  return (
    <>
      <label className="hidden" htmlFor={label}>
        {label}
      </label>
      <input
        className={`rounded bg-black border-black py-5 text-lg focus:ring-0 focus:border-none ${
          hasError && "border-red-600 border-2"
        }`}
        type={type}
        id={label}
        // name={label}
        placeholder={label}
        required
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    </>
  );
};

export default InputField;
