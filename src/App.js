import { Button } from "./components/Button";
import { useState } from "react";
import { Header } from "./components/Header";
import React from "react";

// Importing necessary stuff for Switcher
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

function App() {
  const [text, setText] = useState("JobHelper client");

  // Our states for Switcher
  const [state, setState] = React.useState({ status: true });

  // Saving new state
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <>
      {/* Using example func  */}
      <h2>
        {text}
        <br />
        <br />
        <Button text={text} setText={setText} />
      </h2>

      {/* Adding header  */}
      <h3>
        <Header text={text} setText={setText} />
      </h3>

      {/* Implementing our Switcher */}
      <div
        style={{
          margin: "auto",
          display: "block",
          width: "fit-content",
        }}
      >
        <h4>
          Ukrainian language and literature
          <FormControlLabel
            control={
              <Switch
                // Using our states
                checked={state.status}
                onChange={handleChange}
                color="primary"
                name="status"
              />
            }
          />
          Ukrainian language
        </h4>
      </div>
    </>
  );
}

export default App;
