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

import "./css/styles.css";

const GradesFinder = () => {
  const [subjects, setSubjects] = useState([]);
  const [mandatorySubjects, setMandatorySubjects] = useState([]);
  const [specialities, setSpecialities] = useState([]);
  const [cities, setCities] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [selectedCity, setSelectedCity] = useState({});
  const [selectedSpeciality, setSelectedSpeciality] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [faculties, setFaculties] = useState([]);

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
    setLoading(true);
    Promise.all([api.getSubjects(), api.getSpecialities(), api.getCities()])
      .then(
        ([
          { data: fetchedSubjects },
          { data: fetchedSpecialities },
          { data: fetchedCities },
        ]) => {
          setSubjects(getSubjects(fetchedSubjects));
          setMandatorySubjects(getMandatorySubjects(fetchedSubjects));
          setSpecialities(normalizeSelectOptions(fetchedSpecialities));
          setCities(normalizeSelectOptions(fetchedCities));
          setLoaded(true);
        }
      )
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
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
