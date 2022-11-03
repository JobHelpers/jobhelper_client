import { useForm, Controller } from "react-hook-form";
import Select from "react-select";

export const Form = ({
  subjects,
  mandatorySubjects,
  specialities,
  cities,
  universities,
  setSelectedCity,
  setSelectedSpeciality,
  onSubmitForm,
}) => {
  const { register, control, handleSubmit } = useForm({
    mandatorySubjects: 1,
  });

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
          <h4 style={{ marginBottom: 60, fontWeight: "bold" }}>
            Оберіть конкурсні предмети та вкажіть ваші бали
          </h4>

          <div className="row">
            <div className="col">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  checked
                  name="mandatorySubjects"
                  value={mandatorySubjects[0]?.id}
                  id={`mandatorySubject_${mandatorySubjects[0]?.id}`}
                  {...register(`mandatorySubjects`)}
                />
                <label
                  className="form-check-label"
                  htmlFor={`mandatorySubject_${mandatorySubjects[0]?.id}`}
                >
                  {mandatorySubjects[0]?.name}
                </label>
                <input
                  type="number"
                  {...register(`subjects_grades.${mandatorySubjects[0]?.id}`)}
                  className="text-input"
                />
              </div>

              {subjects.slice(0, 4).map((item) => {
                return (
                  <div key={item.id} className="form-check">
                    <input
                      {...register(`subjects.${item.id}`)}
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id={`subject_${item.id}`}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`subject_${item.id}`}
                    >
                      {item.name}
                    </label>
                    <input
                      type="number"
                      {...register(`subjects_grades.${item.id}`)}
                      className="text-input"
                    />
                  </div>
                );
              })}
            </div>
            <div className="col" style={{ marginLeft: 40 }}>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="mandatorySubjects"
                  value={mandatorySubjects[1]?.id}
                  id={`mandatorySubject_${mandatorySubjects[1]?.id}`}
                  {...register(`mandatorySubjects`)}
                />
                <label
                  className="form-check-label"
                  htmlFor={`mandatorySubject_${mandatorySubjects[1]?.id}`}
                >
                  {mandatorySubjects[1]?.name}
                </label>
                <input
                  type="number"
                  {...register(`subjects_grades.${mandatorySubjects[1]?.id}`)}
                  className="text-input"
                />
              </div>
              {subjects.slice(4, 8).map((item) => {
                return (
                  <div key={item.id} className="form-check">
                    <input
                      {...register(`subjects.${item.id}`)}
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id={`subject_${item.id}`}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`subject_${item.id}`}
                    >
                      {item.name}
                    </label>
                    <input
                      type="number"
                      {...register(`subjects_grades.${item.id}`)}
                      className="text-input"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col">
          <Controller
            name="speciality"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                onChange={(data) =>
                  handleChangeSpeciality(data, field.onChange)
                }
                placeholder="Оберіть спеціальність"
                options={specialities}
              />
            )}
          />
        </div>
        <div className="col">
          <Controller
            name="city"
            control={control}
            render={({ field }) => {
              return (
                <Select
                  {...field}
                  onChange={(data) => handleChangeCity(data, field.onChange)}
                  placeholder="Оберіть місто"
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
                placeholder="Оберіть університет"
                options={universities}
              />
            )}
          />
        </div>
      </div>

      <p style={{ marginTop: 80 }}>
        <button type="submit" className="submit-btn">
          Надіслати
        </button>
      </p>
    </form>
  );
};
