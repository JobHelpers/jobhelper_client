import { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import * as api from "api";
import {
  getSubjects,
  getMandatorySubjects,
  normalizeSelectOptions,
  specialityDTO,
  universitiesDTO,
} from "./utils";
import { Form } from "./components";

import * as api from 'api'
import {
  getSubjects,
  getMainSubjects,
  normalizeSelectOptions,
  specialityDTO,
  universitiesDTO,
  joinGroupedSpecialitiesSubjects
} from './utils'
import { Form } from './components';

const GradesFinder = () => {
  const [subjects, setSubjects] = useState([])
  const [mainSubjects, setMainSubjects] = useState([])
  const [specialities, setSpecialities] = useState([])
  const [cities, setCities] = useState([])
  const [universities, setUniversities] = useState([])
  const [selectedCity, setSelectedCity] = useState({})
  const [selectedSpeciality, setSelectedSpeciality] = useState({})
  const [selectedSubjects, setSelectedSubjects] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [faculties, setFaculties] = useState([])
  const [specialitiesWithGroupedSubjects, setSpecialitiesWithGroupedSubjects] = useState([])

  const onSubmitForm = (data) => {
    console.log(data);
    const specialityCode = specialityDTO(data);
    const universityId = universitiesDTO(data);
    const queryParams = {
      specialityCode,
      universityId,
    };
    api
      .getFacultiesGrades(queryParams)
      .then(({ data }) => {
        setError("");
        setFaculties(data[0]);
      })
      .catch((e) => setError(e.message));
  };

  useEffect(() => {
    setLoading(true)
    Promise.all([
      api.getSubjects(),
      api.getSpecialities(),
      api.getCities(),
      api.getSpecialitiesWithGroupedSubjects()
    ])
      .then(([
        {data:fetchedSubjects},
        {data:fetchedSpecialities},
        {data:fetchedCities},
        {data:fetchedSpecialitiesWithGroupedSubjects},
      ]) => {
        setSubjects(getSubjects(fetchedSubjects));
        setMainSubjects(getMainSubjects(fetchedSubjects));
        setSpecialities(normalizeSelectOptions(fetchedSpecialities));
        setCities(normalizeSelectOptions(fetchedCities));
        setSpecialitiesWithGroupedSubjects(joinGroupedSpecialitiesSubjects(fetchedSpecialitiesWithGroupedSubjects));
        setLoaded(true);
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false))
  }, []);

  useEffect(() => {
    if (!isEmpty(selectedCity) && !isEmpty(selectedSpeciality)) {
      api
        .getUniversities({
          city: selectedCity.value,
          speciality: selectedSpeciality.value,
        })
        .then(({ data }) => setUniversities(normalizeSelectOptions(data)));
    }
  }, [selectedCity, selectedSpeciality]);

  useEffect(() => {
    // console.log('selectedSubjects',selectedSubjects);

    if (!selectedSubjects.length) {
      setSpecialities(specialities)
    } else {

    }


  }, [selectedSubjects])

  return (
    <>
      {loading ? <div>Loading...</div> : null}
      {!isEmpty(error) ? error : null}
      {loaded ? (
        <div className="container">
          <div className="header">
            <h1 style={{ fontWeight: "bold" }}>Бюджет чи контракт?</h1>
            <p>Допоможемо правильно розставити пріоритети</p>
          </div>
          <div className="form">
            <Form
              subjects={subjects}
              mandatorySubjects={mandatorySubjects}
              specialities={specialities}
              cities={cities}
              universities={universities}
              setSelectedCity={setSelectedCity}
              setSelectedSpeciality={setSelectedSpeciality}
              onSubmitForm={onSubmitForm}
            />
          </div>
        </div>
      ) : null}
      {faculties.length
        ? faculties.map((faculty) => <div key={faculty.id}>{faculty.name}</div>)
        : null}
    </>
  );
};

export default GradesFinder;
