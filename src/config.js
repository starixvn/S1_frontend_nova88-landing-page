import axios from "axios";

const siteName = "Nova88";
export const siteId = 1;

export const defStyleFolder = () => {
	return `desktopStyle1`;
};

// export const defStyleName = {
//   desktopStyle1: "desktopStyle1",
//   desktopStyle2: "desktopStyle2",
//   desktopStyle3: "desktopStyle3",
//   desktopStyle4: "desktopStyle4",
// };

export const siteInfo = () => {
	return {
		siteName,
		siteId: 1,
		siteDefaultLang: "en",
		description:
			"Nova88 is the world leading sportsbook offering one of the kind gambling experience in live betting covering all sports, casino, slots, keno, esports, rng casino, fantasy sports, virtual sports, lottery, live casino, live dealer, bingo, and racing.",
		socialMedia: {
			fb: {
				icon: "facebook2",
				link: "https://www.facebook.com/nova88official/",
				displayKey: "lbl_Facebook"
			},
			twitter: {
				icon: "twitter",
				link: "https://twitter.com/nova88official",
				displayKey: "lbl_Twitter"
			},
			ig: {
				icon: "instagram",
				link: "https://www.instagram.com/nova88.net_official",
				displayKey: "lbl_Instagram"
			}
		},
		staticPromotions:
			"https://image.0814media.net/NovaPromotion/promotionList.json"
	};
};

const domainDef = {
	d_indo: "https://www.nova88-indo.info",
	m_indo: "https://m.nova88-indo.info"
};

const SiteURL =
	process.env.NODE_ENV === "production"
		? {
				siteName,
				apiURL: "",
				openURL: "",
				imgUrl: "",
				t_and_cURL: "",
				openMobileURL: domainDef.m_indo,
				openDesktopURL: domainDef.d_indo
		  }
		: {
				siteName,
				appURL: "http://localhost:3000",
				// apiURL: "http://localhost:60930",
				// imgUrl: "http://localhost:60930",
				// t_and_cURL: "http://localhost:60930",
				// openURL: "http://localhost:60930"

				apiURL: "",
				imgUrl: "https://www.n88dev.com",
				t_and_cURL: "https://www.n88dev.com",
				openURL: "",
				openMobileURL: "https://m.n88dev.com",
				openDesktopURL: "https://www.n88dev.com"
		  };

axios.defaults.baseURL = SiteURL.apiURL;

export default SiteURL;
