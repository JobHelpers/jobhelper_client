import { useForm, Controller } from "react-hook-form";
import Select from 'react-select'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

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
  selectedSubjects
}) => {



  const { register, control, handleSubmit } = useForm({
    mainSubjects: 1
  });

  const handleChangeCity = (data, nativeOnChange) => {
    nativeOnChange(data);
    setSelectedCity(data)
  };

  const handleChangeSpeciality = (data, nativeOnChange) => {
    nativeOnChange(data);
    setSelectedSpeciality(data)
  };

  const handleSubjectClick = (event, subjectId) => {
    if (event.target.checked) {
      setSelectedSubjects([...selectedSubjects, subjectId]);
    } else {
      const filteredSubjects = selectedSubjects.filter(item => item !== subjectId)
      setSelectedSubjects(filteredSubjects)
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <div className="row mt-5">
        <div className="col">
          <h4>Оберіть конкурсні предмети та  вкажіть ваші бали</h4>

          <div className="row">
            <div className="col">

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  checked
                  name="mainSubject"
                  value={mainSubjects[0]?.id}
                  id={`mainSubject_${mainSubjects[0]?.id}`}
                  {...register(`mainSubject`)}
                />
                  <label className="form-check-label" htmlFor={`mainSubject_${mainSubjects[0]?.id}`}>
                    {mainSubjects[0]?.name}
                  </label>
                <input type="number" {...register(`subjects_grades.${mainSubjects[0]?.id}`)} />
              </div>

              {
                subjects.slice(0, 4).map((item) => {
                  return (
                    <div key={item.id} className="form-check">
                      <FormControlLabel
                        key={item.id}
                        control={
                          <Checkbox
                            name={item.name}
                            value={item.id}
                            onClick={(event) => handleSubjectClick(event, item.id)}
                            {...register('subjects')}
                          />
                        }
                        label={item.name}
                      />
                      <input type="number" {...register(`subjects_grades.${item.id}`)} />
                    </div>
                  )
                })
              }
            </div>
            <div className="col">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="mainSubject"
                  value={mainSubjects[1]?.id}
                  id={`mainSubject_${mainSubjects[1]?.id}`}
                  {...register(`mainSubject`)}
                />
                <label className="form-check-label" htmlFor={`mainSubject_${mainSubjects[1]?.id}`}>
                  {mainSubjects[1]?.name}
                </label>
                <input type="number" {...register(`subjects_grades.${mainSubjects[1]?.id}`)} />
              </div>
              {
                subjects.slice(4, 8).map((item) => {
                  return (
                    <div key={item.id} className="form-check">
                      <FormControlLabel
                        key={item.id}
                        control={
                          <Checkbox
                            name={item.name}
                            value={item.id}
                            onClick={(event) => handleSubjectClick(event, item.id)}
                            {...register('subjects')}
                          />
                        }
                        label={item.name}
                      />
                      <input type="number" {...register(`subjects_grades.${item.id}`)} />
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col" style={{position: 'relative'}}>
          <div
            style={{
              position: 'absolute',
              top: '7px',
              right: '60px',
              zIndex: 100,
              color: 'lightgray'
          }}>
            {specialities.length}
          </div>
          <Controller
            name="speciality"
            control={control}
            render={({ field }) => <Select
              {...field}
              onChange={data => handleChangeSpeciality(data, field.onChange)}
              placeholder="Оберіть спеціальність"
              options={specialities}
            />}
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
                  onChange={data => handleChangeCity(data, field.onChange)}
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
            render={({ field }) => <Select
              {...field}
              isMulti
              placeholder="Оберіть Університети"
              options={universities}
            />}
          />
        </div>
      </div>

      <input type="submit" />
    </form>
  );
};
