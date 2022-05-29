import "./style.css";

// Example func
export const Button = ({ text, setText }) => {
  console.log(text);
  return (
    <div onClick={() => setText("New description")} className="button">
      Submit
    </div>
  );
};

// Implementing some expandable buttons
// Haven't added expandability to them yet
export const SpecialtyExpandableButton = () => {
  return <div className="button">Choose your specialty</div>;
};

export const CityExpandableButton = () => {
  return <div className="button">Choose your city</div>;
};
