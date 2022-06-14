import { getData } from '../services';
import { config } from "../config";

export const getSpecialities = () => getData({
  url: `${config.api}/specialities`
});

export const getSpecialitiesWithSubjects = () => getData({
  url: `${config.api}/specialities/subjects`
});


export const getSpecialitiesWithGroupedSubjects = () => getData({
  url: `${config.api}/specialities/grouped_subjects`
});
