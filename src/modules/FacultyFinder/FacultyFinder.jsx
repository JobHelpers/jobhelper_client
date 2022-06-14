import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from 'react-select'
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { ToggleSwitch, Button } from '../../components';

const mainSubjects = [
  { id: 29, name: 'Українська мова і література' },
  { id: 1, name: 'Українська мова' },
];

const subjects = [
  {
    "id": 3,
    "name": "Іноземні мови"
  },
  {
    "id": 6,
    "name": "Істроія України"
  },
  {
    "id": 14,
    "name": "Математика"
  },
  {
    "id": 18,
    "name": "Біологія"
  },
  {
    "id": 19,
    "name": "Географія"
  },
  {
    "id": 21,
    "name": "Фізика"
  },
  {
    "id": 22,
    "name": "Хімія"
  },
  {
    "id": 999,
    "name": "Творчий конкурс"
  }
];

const cities = [
  { value: '1', label: 'Lviv' },
]

const specialities = [
  { value: '011', label: 'Освітні, педагогічні науки' },
  { value: '014', label: 'Середня освіта' },
];

const FacultyFinder = () => {

  const [mainSubject, setMainSubject] = useState(mainSubjects[0]?.id);
  const { register, handleSubmit, setValue, control } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <div style={{ margin: '20px' }}>
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
    </div>
  );
};

export default FacultyFinder;
