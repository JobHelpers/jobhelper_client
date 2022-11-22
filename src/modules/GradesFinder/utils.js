import { isEmpty, isUndefined, omitBy } from "lodash";

const mainSubjects = [1, 29];

export const getSubjects = (data) => {
  return data.filter((item) => !mainSubjects.includes(Number(item.id)));
};

export const getMainSubjects = (data) => {
  return data.filter((item) => mainSubjects.includes(Number(item.id)));
};

export const normalizeSelectOptions = (data) => {
  return data.map((item) => {
    return {
      value: item.code || item.id,
      label: item.code ? `(${item.code}) ${item.name}` : item.name,
    };
  });
};

export const specialityDTO = (data) => {
  return data.speciality.value.substring(0, 3);
};

export const universitiesDTO = (data) => {
  return data.universities.map((item) => item.value);
};

export const joinGroupedSpecialitiesSubjects = (specialitiesSubjects) => {
  const modifiedSpecialitiesSubjects = {};
  specialitiesSubjects.forEach((item) => {
    if (isUndefined(modifiedSpecialitiesSubjects[item.speciality_code])) {
      modifiedSpecialitiesSubjects[item.speciality_code] = [[], [], []];
    }

    switch (item.subject_status) {
      case "optional":
        modifiedSpecialitiesSubjects[item.speciality_code][2] =
          item.subject_ids.split(",");
        break;
      case "mandatory":
        modifiedSpecialitiesSubjects[item.speciality_code][1] =
          item.subject_ids.split(",");
        break;
      case "main":
      default:
        modifiedSpecialitiesSubjects[item.speciality_code][0] =
          item.subject_ids.split(",");
        break;
    }
  });

  return Object.keys(modifiedSpecialitiesSubjects).reduce((prevState, key) => {
    const filteredData = omitBy(modifiedSpecialitiesSubjects[key], isEmpty);
    prevState[key] = Object.values(filteredData);
    return prevState;
  }, {});
};

export const specialityHasSubjects = (
  specialitiesSubjects,
  specialityCode,
  mainSubject,
  subjects
) => {
  let selectedSpecialitiesSubjects =
    specialitiesSubjects[specialityCode.substring(0, 6)];
  if (!selectedSpecialitiesSubjects)
    selectedSpecialitiesSubjects =
      specialitiesSubjects[specialityCode.substring(0, 3)];
  if (!selectedSpecialitiesSubjects) return false;

  // check main
  if (
    !mainSubjects.includes(mainSubject) &&
    selectedSpecialitiesSubjects[0][0] !== 1
  )
    return false;
  if (selectedSpecialitiesSubjects.length === 1) return true;
  let position = 0;
  const selectedSpecialitiesSubjectsLen = selectedSpecialitiesSubjects.length;
  const subjectsLen = subjects.length;

  // check mandatory and optional
  for (let i = 1; i < selectedSpecialitiesSubjectsLen; i++) {
    for (let j = 0; j < subjectsLen; j++) {
      if (selectedSpecialitiesSubjects[i].includes(String(subjects[j]))) {
        position++;
        break;
      }
    }
  }
  return position === Math.min(subjectsLen, selectedSpecialitiesSubjectsLen);
};
