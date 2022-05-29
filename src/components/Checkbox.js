import "./style.css";

// Implementing some checkboxes
export const Checkbox = () => {
  return (
    <fieldset className="fieldset">
      <div>
        {/* Checkbox input */}
        <input
          type="checkbox"
          id="mathematics"
          name="mathematics"
          className="input"
        />

        {/* Name of checkbox */}
        <label for="mathematics">Mathematics</label>
        <input
          type="checkbox"
          id="foreign language"
          name="foreign language"
          className="input"
        />
        <label for="foreign language">Foreign language</label>

        {/* Next line */}
        <br />

        <input type="checkbox" id="biology" name="biology" className="input" />
        <label for="biology">Biology</label>
        <input
          type="checkbox"
          id="chemistry"
          name="chemistry"
          className="input"
        />
        <label for="chemistry">Chemistry</label>

        <br />

        <input
          type="checkbox"
          id="history of Ukraine"
          name="history of Ukraine"
          className="input"
        />
        <label for="history of Ukraine">History of Ukraine</label>
        <input type="checkbox" id="physics" name="physics" className="input" />
        <label for="physics">Physics</label>

        <br />

        <input
          type="checkbox"
          id="geography"
          name="geography"
          className="input"
        />
        <label for="geography">Geography</label>
        <input
          type="checkbox"
          id="creative competition"
          name="creative competition"
          className="input"
        />
        <label for="creative competition">Creative competition</label>
      </div>
    </fieldset>
  );
};
