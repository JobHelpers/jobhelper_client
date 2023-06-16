import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import "../GradesFinder/styles.css";
import "./styles.css";

const NmtForm = ({
  specialities,
  cities,
  universities,
  setSelectedCity,
  setSelectedSpeciality,
  onSubmitForm,
}) => {
  const { register, control, handleSubmit } = useForm([]);

  const handleChangeCity = (data, nativeOnChange) => {
    nativeOnChange(data);
    setSelectedCity(data);
  };

  const handleChangeSpeciality = (data, nativeOnChange) => {
    nativeOnChange(data);
    setSelectedSpeciality(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <div className="row mt-5">
        <div className="col">
          <h4 className="form-h">
            2. Вкажіть ваші бали за шкалою 100−200
          </h4>
          <div className="row" style={{textAlign: "center"}}>
            <div>
            <input
              type="number"
              className="test-grade-input"
              {...register(`subjectsGrades`)}
            />
            </div>
          </div>
        </div>
      </div>
      
      <div className="row mt-5">
        <div className="col" style={{ position: "relative", marginTop: 40 }}>
          <div
            style={{
              position: "absolute",
              top: "7px",
              right: "60px",
              zIndex: 100,
              color: "lightgray",
            }}
          >
            {specialities.length}
          </div>
          <Controller
            name="speciality"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                onChange={(data) =>
                  handleChangeSpeciality(data, field.onChange)
                }
                placeholder="3. Оберіть спеціальність"
                options={specialities}
              />
            )}
          />
        </div>
        <div className="col" style={{ marginTop: 40 }}>
          <Controller
            name="city"
            control={control}
            render={({ field }) => {
              return (
                <Select
                  {...field}
                  onChange={(data) => handleChangeCity(data, field.onChange)}
                  placeholder="4. Оберіть місто"
                  options={cities}
                />
              );
            }}
          />
        </div>
      </div>

      <div className="row mt-5">
        <div className="col">
          <Controller
            name="universities"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                isMulti
                placeholder="5. Оберіть університет"
                options={universities}
              />
            )}
          />
        </div>
      </div>

      <button type="submit" className="submit-btn">
        Надіслати
      </button>
    </form>
  );
};

export default NmtForm;
