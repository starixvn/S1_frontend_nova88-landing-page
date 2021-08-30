import axios from "axios";

export const defDeviceType = {
  Desktop: 1,
  Mobile: 2,
  NativeAPP: 3,
};

export default class BaseAPI {
  constructor(data) {
    // const apiUrl = data.apiURL;
    const apiUrl = "";

    this.siteRequest = axios.create({
      withCredentials: true,
      baseURL: `${apiUrl}/api/Site`,
    });
  }
}
