import BaseAPI, { defDeviceType } from "./base";

export class SiteAPI extends BaseAPI {
  defBannerType = {
    Promotions: 1,
    HotEvent: 2,
    Slots: 3,
  };

  defBannerActionMode = {
    NoAction: 1,
    GoToGame: 2,
    GoToBonus: 3,
    OpenWindow: 4,
    RedirectPage: 5,
    RedirectPageOfThisSite: 6,
  };

  ExistsUserName = ({ UserName, LangId }) =>
    this.siteRequest.post(`/ExistsUserName/${LangId}`, { UserName });

  ExistsEmail = ({ Email }) => this.siteRequest.post(`/ExistsEmail`, { Email });

  Signup = (data, langId) => this.siteRequest.post(`/Signup/${langId}`, data);

  GetSiteLangList = () => this.siteRequest.post(`/GetSiteLangList/`);

  CheckSignIn = () => this.siteRequest.post(`/CheckSignIn/`);

  ExistsPhoneNo = ({ AreaCode, Phone }) =>
    this.siteRequest.post(`/ExistsPhoneNo`, { AreaCode, PhoneNo: Phone });
}
