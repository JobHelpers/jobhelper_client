import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from 'react-select'
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { ToggleSwitch, Button } from '../../components';
import {
  getCities,
  getSpecialities,
  getSubjects,
} from '../../api';

const mainSubjects = [
  { id: 29, name: 'Українська мова і література' },
  { id: 1, name: 'Українська мова' },
];

const normalizeDataForSelectElement = (data) => {
  return data.map(item => (
    { value: item.id, label: item.name }
  ));
};

const FacultyFinder = () => {

  const { register, handleSubmit, setValue, control } = useForm();
  const [mainSubject, setMainSubject] = useState(mainSubjects[0]?.id);
  const [loaded, setLoaded] = useState(false);
  const [cities, setCities] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [specialities, setSpecialities] = useState([]);

  const onSubmit = data => console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      const data = await Promise.all([
        getCities(),
        getSubjects(),
        getSpecialities(),
      ]);
      const [
        { data: cities },
        { data: subjects },
        { data: specialities },
      ] = data;

      setCities(normalizeDataForSelectElement(cities));
      // todo: remove hardcoded filer when response from the backend will be improved
      setSubjects(subjects.filter(subject => ![1, 29].includes(subject.id)));
      setSpecialities(normalizeDataForSelectElement(specialities.filter(speciality => speciality.parent === 0)));
    };
    fetchData().finally(() => setLoaded(true));
  }, []);

  return (
    <div style={{ margin: '20px' }}>
      {
        !loaded
          ? <div>Loading...</div>
          : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <ToggleSwitch
                data={mainSubjects}
                selected={mainSubject}
                setSelected={setMainSubject}
                register={register}
                setValue={setValue}
                fieldName="mainSubject"
              />

              <Box sx={{ display: 'flex' }}>
                <FormControl sx={{ m: 2 }} component="fieldset" variant="standard">
                  <FormGroup>
                    {subjects.slice(0, subjects.length / 2).map(subject => (
                      <FormControlLabel
                        key={subject.id}
                        control={
                          <Checkbox name={subject.name} value={subject.id} {...register('subjects')} />
                        }
                        label={subject.name}
                      />
                    ))}
                  </FormGroup>
                </FormControl>
                <FormControl sx={{ m: 2 }} component="fieldset" variant="standard">
                  <FormGroup>
                    {subjects.slice(subjects.length / 2).map(subject => (
                      <FormControlLabel
                        key={subject.id}
                        control={
                          <Checkbox name={subject.name} value={subject.id} {...register('subjects')} />
                        }
                        label={subject.name}
                      />
                    ))}
                  </FormGroup>
                </FormControl>
              </Box>

              <Controller
                name="cities"
                control={control}
                render={({ field }) =>
                  <Select
                    {...field}
                    options={cities}
                    placeholder="Оберіть місто"
                  />}
              />

              <div style={{ marginTop: '20px' }}>
                <Controller
                  name="specialities"
                  control={control}
                  render={({ field }) =>
                    <Select
                      {...field}
                      options={specialities}
                      placeholder="Оберіть спеціальність"
                    />}
                />
              </div>

              <div style={{ marginTop: '20px' }}>
                <Button type="submit">Підібрати</Button>
              </div>
            </form>
          )
      }
    </div>
  );
};

export default FacultyFinder;
