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
export const SpecialtyExpandableButton = () => {
  return <div className="button">Choose your specialty</div>;
};

export const CityExpandableButton = () => {
  return <div className="button">Choose your city</div>;
};

// Search button
export const SearchButton = () => {
  return <div className="button">Search</div>;
};
