interface ToggleProps {
  value: string;
  onToggle: () => void;
  message?: string;
}
const Toggle = ({ value, onToggle, message }: ToggleProps) => {
  return (
    <div className="flex items-center justify-center w-full mb-6 select-none">
      <label
        htmlFor="fresherToggle"
        className="flex items-center cursor-pointer"
      >
        {message && (
          <div className="mr-3 text-darkGray text-sm font-medium">
            {message}
          </div>
        )}
        <div className="relative">
          <input
            type="checkbox"
            id="fresherToggle"
            className="sr-only"
            value={value}
          />
          <div className="block bg-lightGray w-10 h-6 rounded-full" />
          <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition" />
        </div>
      </label>
    </div>
  );
};

export default Toggle;
