import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";
import "../../GradesFinder/styles.css";

export const Form = ({
  subjects,
  mainSubjects,
  specialities,
  cities,
  universities,
  setSelectedCity,
  setSelectedSpeciality,
  onSubmitForm,
  setSelectedSubjects,
  selectedSubjects,
  setSelectedMainSubject,
}) => {
  const [checkedMainSubject, setCheckedMainSubject] = useState();
  const { register, control, handleSubmit } = useForm([mainSubjects[0].id]);

  const handleClickOnMainSubject = (event, id) => {
    setCheckedMainSubject(id);
    setSelectedMainSubject(id);
  };

  const handleChangeCity = (data, nativeOnChange) => {
    nativeOnChange(data);
    setSelectedCity(data);
  };

  const handleChangeSpeciality = (data, nativeOnChange) => {
    nativeOnChange(data);
    setSelectedSpeciality(data);
  };

  const handleSubjectClick = (event, subjectId) => {
    if (event.target.checked) {
      setSelectedSubjects([...selectedSubjects, subjectId]);
    } else {
      const filteredSubjects = selectedSubjects.filter(
        (item) => item !== subjectId
      );
      setSelectedSubjects(filteredSubjects);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <div className="row mt-5">
        <div className="col">
          <h4 style={{ marginBottom: 60 }}>
            2. Оберіть предмети та вкажіть ваші бали
          </h4>

          <div className="row">
            <div className="col">
              <div className="form-check">
                <input
                  checked
                  onClick={(e) => {
                    handleClickOnMainSubject(e, mainSubjects[0].id);
                  }}
                  className="form-check-input"
                  type="radio"
                  name="mainSubject"
                  value={mainSubjects[0]?.id}
                  id={`mainSubject_${mainSubjects[0]?.id}`}
                  {...register(`mainSubject`)}
                  style={{ marginLeft: 2, marginRight: 12 }}
                />
                <label
                  className="form-check-label"
                  htmlFor={`mainSubject_${mainSubjects[0]?.id}`}
                >
                  {mainSubjects[0]?.name}
                </label>
                <input
                  type="number"
                  {...register(`subjectsGrades.${mainSubjects[0]?.id}`)}
                  style={{
                    width: 68,
                    marginLeft: 460,
                    paddingLeft: 16,
                    position: "relative",
                    bottom: 28,
                  }}
                />
              </div>

              {subjects.slice(0, 4).map((item) => {
                return (
                  <div key={item.id} className="form-check">
                    <FormControlLabel
                      key={item.id}
                      control={
                        <Checkbox
                          name={item.name}
                          value={item.id}
                          onClick={(event) =>
                            handleSubjectClick(event, item.id)
                          }
                          {...register("subjects")}
                        />
                      }
                      label={item.name}
                    />
                    <input
                      type="number"
                      {...register(`subjectsGrades.${item.id}`)}
                      style={{
                        width: 68,
                        marginLeft: 460,
                        paddingLeft: 16,
                        position: "relative",
                        bottom: 36,
                      }}
                    />
                  </div>
                );
              })}
            </div>
            <div className="col">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  onClick={(e) => {
                    handleClickOnMainSubject(e, mainSubjects[1].id);
                  }}
                  name="mainSubject"
                  value={mainSubjects[1]?.id}
                  id={`mainSubject_${mainSubjects[1]?.id}`}
                  {...register(`mainSubject`)}
                  style={{ marginLeft: 2, marginRight: 12 }}
                />
                <label
                  className="form-check-label"
                  htmlFor={`mainSubject_${mainSubjects[1]?.id}`}
                >
                  {mainSubjects[1]?.name}
                </label>
                <input
                  type="number"
                  {...register(`subjectsGrades.${mainSubjects[1]?.id}`)}
                  style={{
                    width: 68,
                    marginLeft: 480,
                    paddingLeft: 16,
                    position: "relative",
                    bottom: 28,
                  }}
                />
              </div>
              {subjects.slice(4, 8).map((item) => {
                return (
                  <div key={item.id} className="form-check">
                    <FormControlLabel
                      key={item.id}
                      control={
                        <Checkbox
                          name={item.name}
                          value={item.id}
                          onClick={(event) =>
                            handleSubjectClick(event, item.id)
                          }
                          {...register("subjects")}
                        />
                      }
                      label={item.name}
                    />
                    <input
                      type="number"
                      {...register(`subjectsGrades.${item.id}`)}
                      style={{
                        width: 68,
                        marginLeft: 480,
                        paddingLeft: 16,
                        position: "relative",
                        bottom: 36,
                      }}
                    />
                  </div>
                );
              })}
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
