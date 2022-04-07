import logo_1 from "../styles/desktopStyle1/img/logo.png";
import text_1 from "../styles/desktopStyle1/img/text.png";
import member_1 from "../styles/desktopStyle1/img/member.svg";
import password_1 from "../styles/desktopStyle1/img/password.svg";
import phone_1 from "../styles/desktopStyle1/img/phone.svg";

import logo_2 from "../styles/desktopStyle2/img/logo.png";
import text_2 from "../styles/desktopStyle2/img/text.png";
import member_2 from "../styles/desktopStyle2/img/member.svg";
import password_2 from "../styles/desktopStyle2/img/password.svg";
import phone_2 from "../styles/desktopStyle2/img/phone.svg";
import email_2 from "../styles/desktopStyle2/img/email.svg";

export const getLogoSrc = desktopStyleName => {
	switch (desktopStyleName) {
		case "desktopStyle1":
			return logo_1;
		case "desktopStyle2":
			return logo_2;
		// case 'desktopStyle3':
		// 	return logo_3;
		// case 'desktopStyle4':
		// 	return logo_4;
		default:
			break;
	}
};

export const getTitleSrc = desktopStyleName => {
	switch (desktopStyleName) {
		case "desktopStyle1":
			return text_1;
		case "desktopStyle2":
			return text_2;
		// case 'desktopStyle3':
		// 	return title_3;
		// case 'desktopStyle4':
		// 	return title_4;
		default:
			break;
	}
};

export const getIconSrc = desktopStyleName => {
	switch (desktopStyleName) {
		case "desktopStyle1":
			return { member_1, password_1, phone_1 };
		case "desktopStyle2":
			return { member_2, password_2, phone_2, email_2 };
		// case 'desktopStyle3':
		// 	return title_3;
		// case 'desktopStyle4':
		// 	return title_4;
		default:
			break;
	}
};
