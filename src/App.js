import {Button} from './components/Button'
import { useState } from "react";

function App() {

  const [text, setText] = useState("JobHelper client");

  return (
    <h3>
      {text}
      <br />
      <br />
      <Button text={text} setText={setText} />
    </h3>
  );
}

export default App;
