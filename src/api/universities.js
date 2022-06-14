import { getData } from '../services';
import { config } from "../config";

export const getUniversities = (params) => getData({
  url: `${config.api}/universities`,
  params
});
