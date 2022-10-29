import { useForm, Controller } from "react-hook-form";
import Select from 'react-select'

export const Form = ({subjects, mandatorySubjects}) => {
  const { register, control, handleSubmit } = useForm();

  const onSubmit = data => console.log(data);

  const cityOptions = [
    { value: 'Lviv', label: 'Lviv' },
    { value: 'Kyiv', label: 'Kyiv' },
  ]

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row mt-5">
        <div className="col">
          <h4>Оберіть конкурсні предмети та  вкажіть ваші бали</h4>

          <div className="row">
            <div className="col">

              <div className="form-check">
                <input className="form-check-input" type="radio" name="mandatorySubjects" id={`mandatorySubject_${mandatorySubjects[0]?.id}`}/>
                {...register(`mandatorySubjects.${mandatorySubjects[0]?.id}`)}
                  <label className="form-check-label" htmlFor={`mandatorySubject_${mandatorySubjects[0]?.id}`}>
                    {mandatorySubjects[0]?.name}
                  </label>
              </div>

              {
                subjects.slice(0, 4).map((item) => {
                  return (
                    <div key={item.id} className="form-check">
                      <input
                        {...register(`subjects.${item.id}`)}
                        className="form-check-input"
                        type="checkbox" value=""
                        id={`subject_${item.id}`}
                      />
                      <label className="form-check-label" htmlFor={`subject_${item.id}`}>
                        {item.name}
                      </label>
                      <input type="number" {...register(`subjects_grades.${item.id}`)} />
                    </div>
                  )
                })
              }
            </div>
            <div className="col">
              <div className="form-check">
                <input className="form-check-input" type="radio" name="mandatorySubjects" id={`mandatorySubject_${mandatorySubjects[1]?.id}`}/>
                {...register(`mandatorySubjects.${mandatorySubjects[1]?.id}`)}
                <label className="form-check-label" htmlFor={`mandatorySubject_${mandatorySubjects[1]?.id}`}>
                  {mandatorySubjects[1]?.name}
                </label>
              </div>
              {
                subjects.slice(4, 8).map((item) => {
                  return (
                    <div key={item.id} className="form-check">
                      <input
                        {...register(`subjects.${item.id}`)}
                        className="form-check-input"
                        type="checkbox" value=""
                        id={`subject_${item.id}`}
                      />
                      <label className="form-check-label" htmlFor={`subject_${item.id}`}>
                        {item.name}
                      </label>
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
        <div className="col">
          <Controller
            name="speciality"
            control={control}
            render={({ field }) => <Select
              {...field}
              placeholder="Оберіть спеціальність"
              options={cityOptions}
            />}
          />

        </div>
        <div className="col">
          <Controller
            name="city"
            control={control}
            render={({ field }) => <Select
              {...field}
              placeholder="Оберіть місто"
              options={cityOptions}
            />}
          />
        </div>
      </div>

      <div className="row mt-5">
        <div className="col">
          <Controller
            name="univercities"
            control={control}
            render={({ field }) => <Select
              {...field}
              isMulti
              placeholder="Оберіть Університети"
              options={cityOptions}
            />}
          />
        </div>
      </div>

      <input type="submit" />
    </form>
  );
};
