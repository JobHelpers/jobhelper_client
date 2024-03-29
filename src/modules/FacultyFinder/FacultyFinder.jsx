// todo: split the component to several
// todo: move functions bellow to utils directory
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Loader from "../GradesFinder/components/Loader/Loader";
import {Modal, ModalTitle, ModalContent, CloseButton} from '../../components'
import SelectedFaculty from './SelectedFaculty'

import { ToggleSwitch, Button } from "../../components";
import {
  getCities,
  getSpecialities,
  getSubjects,
  getSpecialitiesWithGroupedSubjects,
  getUniversities,
  getFaculties,
} from "../../api";
import { FacultyFinderResults } from "./FacultyFinderResults";

const mainSubjects = [
  { id: "29", name: "Українська мова і література" },
  { id: "1", name: "Українська мова" },
];

const multipleExist = (arr, values) =>
  values.every((value) => {
    return arr.includes(value);
  });

const someOfMultipleExist = (arr, values) =>
  values.some((value) => {
    return arr.includes(value);
  });

const normalizeDataForSelectElement = (
  data,
  showId = false,
  fields = { name: "name", id: "id" }
) => {
  return data.map((item) => ({
    value: item[fields.id],
    label: showId
      ? `${item[fields.name]} (${item[fields.id]})`
      : item[fields.name],
  }));
};

const normalizeSpecialitiesWithGroupedSubjects = (
  specialitiesWithGroupedSubjectsData
) => {
  const newObject = {};
  specialitiesWithGroupedSubjectsData.forEach((item) => {
    if (newObject[item.speciality_code]) {
      newObject[item.speciality_code][item.subject_status] =
        item.subject_ids.split(",");
    } else {
      newObject[item.speciality_code] = {};
      newObject[item.speciality_code][item.subject_status] =
        item.subject_ids.split(",");
    }
  });

  return newObject;
};

const FacultyFinder = () => {
  const { register, handleSubmit, setValue, control } = useForm();
  const [mainSubject, setMainSubject] = useState(mainSubjects[0]?.id);
  const [loaded, setLoaded] = useState(false);
  const [cities, setCities] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [specialities, setSpecialities] = useState([]);
  const [specialitiesWithGroupedSubjects, setSpecialitiesWithGroupedSubjects] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [resultsLoaded, setResultsLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedFacultyId, setSelectedFacultyId] = useState(null);

  const onSubmit = async (formData) => {
    setSearchResults([]);
    setSearchLoading(true);

    const universities = await getUniversities({
      city: formData.cities.value,
      speciality: formData.specialities.value,
    });

    const universitiesWithFaculties = [];

    if (universities?.data.length) {
      universities.data.forEach((university) => {
        getFaculties({
          university: university.id,
          speciality: formData.specialities.value,
        })
          .then((faculties) => {
            universitiesWithFaculties.push({
              ...university,
              faculties: faculties.data,
            });
          })
          .finally(() => {
            setTimeout(() => {
              setSearchLoading(false);
              setSearchResults(universitiesWithFaculties);
              setResultsLoaded(true);
            }, 2000);
          });
      });
    } else {
      setSearchLoading(false);
    }
  };

  const handleSelectedSubjects = (subjectId, selected) => {
    if (selected) setSelectedSubjects([...selectedSubjects, String(subjectId)]);
    else {
      const updatedSubjects = selectedSubjects.filter(
        (ss) => ss !== String(subjectId)
      );
      setSelectedSubjects(updatedSubjects);
    }
  };

  const getFilteredSpecialities = () => {
    if (selectedSubjects.length) {
      // eslint-disable-next-line array-callback-return
      return specialities.filter((item) => {
        // todo: optimize the IF hell bellow
        if (specialitiesWithGroupedSubjects[item.value]) {
          if (
            specialitiesWithGroupedSubjects[item.value].main.includes(
              mainSubject
            )
          ) {
            if (specialitiesWithGroupedSubjects[item.value]?.mandatory) {
              if (
                multipleExist(
                  selectedSubjects,
                  specialitiesWithGroupedSubjects[item.value].mandatory
                )
              ) {
                if (specialitiesWithGroupedSubjects[item.value]?.optional) {
                  if (
                    someOfMultipleExist(
                      selectedSubjects,
                      specialitiesWithGroupedSubjects[item.value].optional
                    )
                  ) {
                    return item;
                  }
                } /* else {
                  return item;
                }*/
              }
            } /* else {
              return item;
            }*/
          }
        }
      });
    }
    return specialities;
  };


  const showFacultyInfo = (facultyId) => {
    setShowModal(true);
    setSelectedFacultyId(facultyId);
  }

  const closeModal = () => {
    setShowModal(false);
    setSelectedFacultyId(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await Promise.all([
        getCities(),
        getSubjects(),
        getSpecialities(),
        getSpecialitiesWithGroupedSubjects(),
      ]);
      const [
        { data: citiesData },
        { data: subjectsData },
        { data: specialitiesData },
        { data: specialitiesWithGroupedSubjectsData },
      ] = data;

      setCities(normalizeDataForSelectElement(citiesData));
      // todo: remove hardcoded filer when response from the backend will be improved
      setSubjects(
        subjectsData.filter((subject) => ![1, 29].includes(subject.id))
      );
      setSpecialities(
        normalizeDataForSelectElement(
          specialitiesData.filter((speciality) => speciality.parent === 0),
          true,
          {
            name: "name",
            id: "code",
          }
        )
      );
      const normalizedSpecialitiesWithGroupedSubjects =
        normalizeSpecialitiesWithGroupedSubjects(
          specialitiesWithGroupedSubjectsData
        );
      setSpecialitiesWithGroupedSubjects(
        normalizedSpecialitiesWithGroupedSubjects
      );
    };
    fetchData().finally(() => setLoaded(true));
  }, []);

  useEffect(() => {
    setValue("specialities", "");
  }, [selectedSubjects]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Modal showModal={showModal}>
        <CloseButton onClose={closeModal}/>
        <ModalTitle title="Інформація про факультет :" />
        <ModalContent>
          <SelectedFaculty id={selectedFacultyId}/>
        </ModalContent>
      </Modal>
      <div className="faculty-finder-container">
        <div className="faculty-finder">
          {!loaded ? (
            <Loader />
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <ToggleSwitch
                data={mainSubjects}
                selected={mainSubject}
                setSelected={setMainSubject}
                register={register}
                setValue={setValue}
                fieldName="mainSubject"
              />

              <Box sx={{ display: "flex" }}>
                <FormControl
                  sx={{ m: 2 }}
                  component="fieldset"
                  variant="standard"
                >
                  <FormGroup>
                    {subjects.slice(0, subjects.length / 2).map((subject) => (
                      <FormControlLabel
                        key={subject.id}
                        control={
                          <Checkbox
                            name={subject.name}
                            value={subject.id}
                            onClick={(event) =>
                              handleSelectedSubjects(
                                subject.id,
                                event.target.checked
                              )
                            }
                            {...register("subjects")}
                          />
                        }
                        label={subject.name}
                      />
                    ))}
                  </FormGroup>
                </FormControl>
                <FormControl
                  sx={{ m: 2 }}
                  component="fieldset"
                  variant="standard"
                >
                  <FormGroup>
                    {subjects.slice(subjects.length / 2).map((subject) => (
                      <FormControlLabel
                        key={subject.id}
                        control={
                          <Checkbox
                            name={subject.name}
                            value={subject.id}
                            onClick={(event) =>
                              handleSelectedSubjects(
                                subject.id,
                                event.target.checked
                              )
                            }
                            {...register("subjects")}
                          />
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
                render={({ field }) => (
                  <Select
                    {...field}
                    options={cities}
                    placeholder="Оберіть місто"
                  />
                )}
              />

              <div style={{ marginTop: "20px" }}>
                <Controller
                  name="specialities"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={getFilteredSpecialities()}
                      placeholder="Оберіть спеціальність"
                    />
                  )}
                />
              </div>

              <div style={{ marginTop: "20px" }}>
                <Button type="submit">Підібрати</Button>
              </div>
            </form>
          )}
          <FacultyFinderResults
            showFacultyInfo={showFacultyInfo}
            resultsLoaded={resultsLoaded}
            loading={searchLoading}
            searchResults={searchResults}
          />
        </div>
      </div>
    </>
  );
};

export default FacultyFinder;
