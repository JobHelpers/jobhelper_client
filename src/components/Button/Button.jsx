import "./styles.css";

export const Button = ({ children }) => {
  return (
    <p class="btn-p">
      <button className="button" type="submit">
        {children}
      </button>
    </p>
  );
};
