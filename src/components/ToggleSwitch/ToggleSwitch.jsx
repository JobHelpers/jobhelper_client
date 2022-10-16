import { useEffect } from "react";

import "./styles.css";

export const ToggleSwitch = ({
  data,
  selected,
  setSelected,
  register,
  setValue,
  fieldName,
}) => {
  useEffect(() => {
    if (selected) {
      setValue(fieldName, selected);
    }
  }, [selected]);

  return (
    <section>
      <div className="switch">
        <input {...register(fieldName)} type="hidden" value={selected} />
        <input type="checkbox" id="toggle" />
        <span className="selection" />
        <label onClick={() => setSelected(data[0].id)} htmlFor="toggle">
          {data[0].name}
        </label>
        <label onClick={() => setSelected(data[1].id)} htmlFor="toggle">
          {data[1].name}
        </label>
      </div>
    </section>
  );
};
