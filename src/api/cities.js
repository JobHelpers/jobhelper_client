import { getData } from '../services';
import { config } from "../config";

export const getCities = () => getData({
  url: `${config.api}/cities`
});
