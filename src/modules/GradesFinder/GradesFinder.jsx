import { useEffect, useState } from "react";
import { isEmpty } from "lodash";

import * as api from "api";
import {
  getMainSubjects,
  getSubjects,
  joinGroupedSpecialitiesSubjects,
  normalizeSelectOptions,
  specialityDTO,
  specialityHasSubjects,
  universitiesDTO,
} from "./utils";
import { Form, Faculties } from "./components";
import "../GradesFinder/styles.css";
import Loader from "./components/Loader/Loader";

const GradesFinder = () => {
  const [subjects, setSubjects] = useState([]);
  const [mainSubjects, setMainSubjects] = useState([]);
  const [initialSpecialities, setInitialSpecialities] = useState([]);
  const [specialities, setSpecialities] = useState([]);
  const [cities, setCities] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [selectedCity, setSelectedCity] = useState({});
  const [selectedSpeciality, setSelectedSpeciality] = useState({});
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedMainSubject, setSelectedMainSubject] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [faculties, setFaculties] = useState([]);
  const [specialitiesWithGroupedSubjects, setSpecialitiesWithGroupedSubjects] =
    useState([]);
  const [subjectGrades, setSubjectGrades] = useState({});

  const onSubmitForm = (data) => {
    setSubjectGrades(data.subjectsGrades);
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
    Promise.all([
      api.getSubjects(),
      api.getSpecialities(),
      api.getCities(),
      api.getSpecialitiesWithGroupedSubjects(),
    ])
      .then(
        ([
          { data: fetchedSubjects },
          { data: fetchedSpecialities },
          { data: fetchedCities },
          { data: fetchedSpecialitiesWithGroupedSubjects },
        ]) => {
          const fetchedMainSubjects = getMainSubjects(fetchedSubjects);
          setSubjects(getSubjects(fetchedSubjects));
          setMainSubjects(fetchedMainSubjects);
          setSelectedMainSubject(fetchedMainSubjects[0].id);
          setSpecialities(normalizeSelectOptions(fetchedSpecialities));
          setInitialSpecialities(normalizeSelectOptions(fetchedSpecialities));
          setCities(normalizeSelectOptions(fetchedCities));
          setSpecialitiesWithGroupedSubjects(
            joinGroupedSpecialitiesSubjects(
              fetchedSpecialitiesWithGroupedSubjects
            )
          );
          setLoaded(true);
        }
      )
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!isEmpty(selectedCity) && !isEmpty(selectedSpeciality)) {
      const speciality = selectedSpeciality.value.substring(0, 3);
      api
        .getUniversities({ city: selectedCity.value, speciality })
        .then(({ data }) => setUniversities(normalizeSelectOptions(data)));
    }
  }, [selectedCity, selectedSpeciality]);

  useEffect(() => {
    if (!selectedSubjects.length) {
      setSpecialities(initialSpecialities);
    } else {
      const filteredSpecialities = initialSpecialities.filter((item) => {
        return specialityHasSubjects(
          specialitiesWithGroupedSubjects,
          item.value,
          selectedMainSubject,
          selectedSubjects
        );
      });
      setSpecialities(filteredSpecialities);
    }
  }, [selectedSubjects]);

  return (
    <>
      {loading ? <Loader /> : null}
      {!isEmpty(error) ? error : null}
      {loaded ? (
        <div className="container">
          <div className="header">
            <h1>Бюджет чи контракт?</h1>
            <h3>Допоможемо правильно розставити пріоритети!</h3>
          </div>
          <Form
            subjects={subjects}
            mainSubjects={mainSubjects}
            specialities={specialities}
            cities={cities}
            universities={universities}
            setSelectedCity={setSelectedCity}
            setSelectedSpeciality={setSelectedSpeciality}
            onSubmitForm={onSubmitForm}
            setSelectedSubjects={setSelectedSubjects}
            selectedSubjects={selectedSubjects}
            setSelectedMainSubject={setSelectedMainSubject}
          />
        </div>
      ) : null}
      {faculties.length ? (
        <Faculties
          faculties={faculties}
          selectedSubjects={[...selectedSubjects, selectedMainSubject]}
          subjectGrades={subjectGrades}
        />
      ) : null}
    </>
  );
};

export default GradesFinder;
