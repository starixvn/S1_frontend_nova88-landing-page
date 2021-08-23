import { SiteAPI } from "./index";

import config from "../config";

export default {
  site: new SiteAPI(config),
};
