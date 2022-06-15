import "./styles.css";

export const Button = ({ children }) => {
  return (
    <button
      className="button"
      type="submit"
    >
      {children}
    </button>
  );
};
