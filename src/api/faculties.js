import { getData } from '../services';
import { config } from "../config";

export const getFaculties = (params) => getData({
  url: `${config.api}/faculties`,
  params
});

export const getFacultiesGrades = (params) => {
  return getData({
    url: `${config.api}/faculties/grades`,
    params
  });
}
