import { AccountAPI, AccountStrictAPI, SiteAPI } from "./index";

import config from "../config";

export default {
  account: new AccountAPI(config),
  accountStrict: new AccountStrictAPI(config),
  site: new SiteAPI(config),
};
