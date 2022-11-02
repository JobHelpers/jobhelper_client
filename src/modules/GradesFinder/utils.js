import {isUndefined, omitBy, isEmpty} from 'lodash';

const mainSubjects = [1, 29]

export const getSubjects = (data) => {
  return data.filter((item) => !mainSubjects.includes(Number(item.id)));
}

export const getMainSubjects = (data) => {
  return data.filter((item) => mainSubjects.includes(Number(item.id)));
}

export const normalizeSelectOptions = (data) => {
  return data.map(item => {
    return {
      value: item.code || item.id,
      label: item.name,
    };
  })
};

export const specialityDTO = (data) => {
  return data.speciality.value
};

export const universitiesDTO = (data) => {
  return data.universities.map(item => item.value);
};

export const joinGroupedSpecialitiesSubjects = (specialitiesSubjects) => {

  return specialitiesSubjects;
};
