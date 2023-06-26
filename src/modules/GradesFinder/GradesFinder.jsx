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
import NmtForm from "modules/Nmt/NmtForm";
import { NmtFaculties } from "modules/Nmt/NmtFaculties";
import IntroImg from "../../assets/intro.png";

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
  const [visible, setVisible] = useState(true); // Zno test UI

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
            <h1 style={{marginBottom: 20}}>Бюджет чи контракт?</h1>
            <h3>Допоможемо правильно розставити пріоритети!</h3>
            <img src={IntroImg} alt="introduction image" className="intro-img" />
          </div>
          <div className="test-choice-btn-div">
            <h4 className="btn-header">1. Виберіть тест, який склали</h4>
            <div className="row">
              <div className="col">
                <input type="button" value="ЗНО" className="zno-choice-btn" onClick={() => setVisible(true)} style={{borderColor: visible ? "seagreen" : "darkseagreen"}}/>
              </div>
              <div className="col">
                <input type="button" value="НМТ" className="nmt-choice-btn" onClick={() => setVisible(false)} style={{borderColor: visible ? "lightsteelblue" : "royalblue"}}/>
              </div>
            </div>
          </div>
          {visible ? <Form
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
            /> : <NmtForm
              specialities={specialities}
              cities={cities}
              universities={universities}
              setSelectedCity={setSelectedCity}
              setSelectedSpeciality={setSelectedSpeciality}
              onSubmitForm={onSubmitForm} />}
        </div>
      ) : null}
      {faculties.length && visible ? (
        <Faculties
          faculties={faculties}
          selectedSubjects={[...selectedSubjects, selectedMainSubject]}
          subjectGrades={subjectGrades}
        />
      ) : <NmtFaculties 
          faculties={faculties}
          testGrade={subjectGrades} />}
    </>
  );
};

export default GradesFinder;
