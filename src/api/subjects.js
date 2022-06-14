import { getData } from '../services';
import { config } from "../config";

export const getSubjects = () => getData({
  url: `${config.api}/subjects`
});
