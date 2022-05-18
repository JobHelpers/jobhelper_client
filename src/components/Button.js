import './style.css';

export const Button = ({text, setText}) => {
  console.log(text);
  return (
    <div onClick={() => setText('New description')} className="button">Submit</div>
  );
}
