import React, { useContext, useState, useEffect, useRef } from "react";
import { i18nContext, popBoxContext } from "../components/context";
import { MobileAndTabletCheck } from "../components/common";
import api from "../service/api";
import Inputbox from "../components/inputbox";
import PhoneBox from "../components/phoneBox";
import { getLogoSrc, getTitleSrc, getIconSrc } from "../components/styleDefs";
import config, { defStyleFolder, defUrlPattern } from "../config";

const _style = defStyleFolder();

const initValue = {
	username: "",
	password: "",
	phone: "",
	email: ""
};

const initTip = {
	username: { checked: null, msg: "" },
	password: { checked: null, msg: "" },
	phone: { checked: null, msg: "" },
	email: { checked: null, msg: "" }
};

const defaultLangId = "id";

const Join = () => {
	const { i18n } = useContext(i18nContext);
	const [userValue, setUserValue] = useState(initValue);
	const { setPopBox } = useContext(popBoxContext);
	const [msg, setMsg] = useState(initTip);
	const isMountedRef = useRef(null);
	const xxxRef = useRef(null);
	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const EditField = (col, e) => {
		let val = e.target.value;
		if (col === "username") {
			val = val.replace(/[\W]/g, "");
		}
		setUserValue(prev => ({
			...prev,
			[col]: val
		}));
	};

	const checkValue = async (col, e) => {
		let val = e.target.value;
		let checked = true;
		let msg = "";

		if (col === "username") {
			let result = await usernameCheck(val);
			checked = result?.checked;
			msg = result?.msg;
		} else if (col === "password") {
			let result = passwordCheck(val);
			checked = result.checked;
			msg = result.msg;
		} else if (col === "phone") {
			let result = await phoneCheck(val);
			checked = result?.checked;
			msg = result?.msg;
		} else if (col === "email") {
			let result = await emailCheck(val);
			checked = result?.checked;
			msg = result?.msg;
		}
		setMsg(prev => {
			return {
				...prev,
				[col]: {
					checked: checked,
					msg: i18n[msg] ?? msg
				}
			};
		});
	};

	const nameRepeatCheck = async val => {
		try {
			const res = await api.site.ExistsUserName({
				UserName: val,
				LangId: defaultLangId
			});
			if (isMountedRef.current) {
				if (res.data.errorCode === 0) {
					return { result: !res.data.data, msg: res.data.message };
				}
			}
		} catch (error) {
			console.error(error);
			if (isMountedRef.current && error?.response) {
				alert(i18n["msg_ApiServerError"]);
			}
		}
	};

	const emailRepeatCheck = async val => {
		try {
			const res = await api.site.ExistsEmail({
				Email: val
			});
			if (isMountedRef.current) {
				if (res.data.errorCode === 0) {
					return { result: !res.data.data, msg: res.data.message };
				}
			}
		} catch (error) {
			console.error(error);
			if (isMountedRef.current && error?.response) {
				alert(i18n["msg_ApiServerError"]);
			}
		}
	};

	const passwordCheck = val => {
		let checked = true;
		let msg = "";

		const regx =
			/^(?=.*[a-zA-Z0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,15}$/;
		if (!val) {
			checked = false;
			msg = "msg_PasswordReq";
		} else if (!regx.test(val)) {
			checked = false;
			msg = "msg_PasswordVaildate";
		}

		return { checked, msg };
	};

	const phoneCheck = async val => {
		let checked = true;
		let msg = "";
		const regx = /^[0-9\s]*$/;
		if (!val) {
			checked = false;
			msg = "lbl_PhoneRequired";
		} else if (!regx.test(val)) {
			checked = false;
			msg = "lbl_PhoneTooltip";
		} else {
			try {
				const res = await api.site.ExistsPhoneNo({
					AreaCode: "+62",
					Phone: val
				});
				if (res.data.errorCode === 0 && res.data.data === true) {
					checked = false;
					msg = "msg_PhoneExisted";
				}
			} catch (error) {
				console.error(error);
				if (isMountedRef.current && error?.response) {
					alert(i18n["msg_ApiServerError"]);
				}
			}
		}
		return { checked, msg };
	};

	const usernameCheck = async val => {
		let checked = true;
		let msg = "";
		if (val === "") {
			checked = false;
			msg = "msg_UsernameReq";
		} else if (val !== "") {
			const result_nameRepeatCheck = await nameRepeatCheck(val);
			if (val.length < 6 || val.length > 15) {
				checked = false;
				msg = "msg_PasswordVaildate";
			} else if (result_nameRepeatCheck?.result === false) {
				checked = false;
				msg = result_nameRepeatCheck?.msg;
			}
		}

		return { checked, msg };
	};

	const emailCheck = async val => {
		let checked = true;
		let msg = "";
		const regx =
			/^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;

		if (val === "") {
			checked = false;
			msg = "msg_MailWrongFormat";
		} else if (!regx.test(val)) {
			checked = false;
			msg = "msg_MailWrongFormat";
		} else {
			const result_emailRepeatCheck = await emailRepeatCheck(val);
			if (result_emailRepeatCheck?.result === false) {
				checked = false;
				msg = result_emailRepeatCheck?.msg;
			}
		}

		return { checked, msg };
	};

	const checkAll = async () => {
		let _usernameCheck = await usernameCheck(userValue.username);
		let _passwordCheck = passwordCheck(userValue.password);
		let _phoneCheck = await phoneCheck(userValue.phone);
		let _emailCheck = await emailCheck(userValue.email);

		let checked =
			_usernameCheck.checked &&
			_passwordCheck.checked &&
			_phoneCheck.checked &&
			_emailCheck.checked;
		if (!checked) {
			setMsg(prev => {
				return {
					...prev,
					username: {
						checked: _usernameCheck.checked,
						msg: i18n[_usernameCheck.msg] ?? _usernameCheck.msg
					},
					password: {
						checked: _passwordCheck.checked,
						msg: i18n[_passwordCheck.msg]
					},
					phone: {
						checked: _phoneCheck.checked,
						msg: i18n[_phoneCheck.msg]
					},
					email: {
						checked: _emailCheck.checked,
						msg: i18n[_emailCheck.msg]
					}
				};
			});
		}
		return checked;
	};

	const clickSubmit = async e => {
		e.preventDefault();
		const result = await checkAll();
		if (result) {
			xxxRef.current.submit();
		}
	};

	const defPopBox = () => ({
		content: {
			tentang: (
				<>
					<div className="popTxt">{i18n.lbl_AboutUsContent_1}</div>
					<div className="popTxt">{i18n.lbl_AboutUsContent_2}</div>
				</>
			),
			kebijakan: <div className="popTxt">{i18n.lbl_PrivacyContent}</div>,
			hubungi: (
				<div className="popTxt">
					<div>
						Facebook :{" "}
						<a href="https://www.facebook.com/nova88indo">
							https://www.facebook.com/nova88indo
						</a>
					</div>
					<div>
						Twitter :{" "}
						<a href="https://twitter.com/Nova88Indo">
							https://twitter.com/Nova88Indo
						</a>
					</div>
				</div>
			)
		},
		title: {
			tentang: i18n.lbl_AboutUs,
			kebijakan: i18n.lbl_PrivacyPolicy,
			hubungi: i18n.lbl_ContactUs
		}
	});

	const handlePopBox = ({ className }) => {
		setPopBox({ isOpen: false });
		setPopBox({
			className,
			isOpen: true,
			content: defPopBox().content[className],
			title: defPopBox().title[className]
		});
	};

	return (
		<div className="wallpaper">
			<img src={getLogoSrc(_style)} className="logo" alt="nova88" />
			<img src={getTitleSrc(_style)} className="title" alt="nova88" />
			<form onSubmit={clickSubmit} id="submitForm">
				<div className="info">
					<div className="tag">
						<div>{i18n.lbl_Register}</div>
						<div>
							<a href={defUrlPattern}>
								{i18n.lbl_Login?.toUpperCase()}
							</a>
						</div>
					</div>
					<div className="inputModule" onSubmit={clickSubmit}>
						<Inputbox
							icon={
								<img
									src={getIconSrc(_style).member_2}
									alt="nova88"
								/>
							}
							value={userValue.username}
							placeholder={i18n.lbl_Username}
							onChange={EditField.bind(null, "username")}
							onBlur={checkValue.bind(null, "username")}
						/>
						{msg.username.msg && (
							<div
								className={`tip${
									msg.username.checked === false
										? " active"
										: ""
								}`}>
								{msg.username.msg}
							</div>
						)}
						<Inputbox
							icon={
								<img
									src={getIconSrc(_style).password_2}
									alt="nova88"
								/>
							}
							value={userValue.password}
							msg={msg.password.msg}
							showMsg={msg.password.checked === false}
							placeholder={i18n.lbl_Password}
							onChange={EditField.bind(null, "password")}
							onBlur={checkValue.bind(null, "password")}
							inputType="password"
						/>
						{msg.password.msg && (
							<div
								className={`tip${
									msg.password.checked === false
										? " active"
										: ""
								}`}>
								{msg.password.msg}
							</div>
						)}
						<PhoneBox
							icon={
								<img
									src={getIconSrc(_style).phone_2}
									alt="nova88"
								/>
							}
							value={userValue.phone}
							msg={msg.phone.msg}
							showMsg={msg.phone.checked === false}
							placeholder={i18n.lbl_Phone}
							onChange={EditField.bind(null, "phone")}
							onBlur={checkValue.bind(null, "phone")}
							inputType="tel"
							areaCode="+62"
						/>
						{msg.phone.msg && (
							<div
								className={`tip${
									msg.phone.checked === false ? " active" : ""
								}`}>
								{msg.phone.msg}
							</div>
						)}
						<Inputbox
							icon={
								<img
									src={getIconSrc(_style).email_2}
									alt="nova88"
								/>
							}
							value={userValue.email}
							msg={msg.email.msg}
							showMsg={msg.email.checked === false}
							placeholder={i18n.lbl_Email}
							onChange={EditField.bind(null, "email")}
							onBlur={checkValue.bind(null, "email")}
							inputType="email"
						/>
						{msg.email.msg && (
							<div
								className={`tip${
									msg.email.checked === false ? " active" : ""
								}`}>
								{msg.email.msg}
							</div>
						)}
					</div>
					<button className="sModule" type="submit">
						{i18n.lbl_JoinNow}
					</button>
				</div>
			</form>
			<form
				ref={xxxRef}
				action={`${
					MobileAndTabletCheck()
						? config.openMobileURL
						: config.openDesktopURL
				}/${defaultLangId}/Extra/Signup`}
				method="post">
				<input
					type="hidden"
					name="UserName"
					value={userValue.username}
					onChange={() => {}}
				/>
				<input
					type="hidden"
					name="Userpwd"
					value={userValue.password}
					onChange={() => {}}
				/>
				<input
					type="hidden"
					name="UserPhone"
					value={userValue.phone}
					onChange={() => {}}
				/>
				<input
					type="hidden"
					name="CurrencyId"
					value={15}
					onChange={() => {}}
				/>
				<input
					type="hidden"
					name="SignupUrl"
					value={window.location.host}
					onChange={() => {}}
				/>
				<input
					type="hidden"
					name="UserLang"
					value={defaultLangId}
					onChange={() => {}}
				/>
				<input
					type="hidden"
					name="RedirectUrl"
					value={defUrlPattern}
					onChange={() => {}}
				/>
			</form>
			<div className="popBtn">
				<button onClick={() => handlePopBox({ className: "tentang" })}>
					{i18n.lbl_AboutUs}
				</button>
				<button
					onClick={() => handlePopBox({ className: "kebijakan" })}>
					{i18n.lbl_PrivacyPolicy}
				</button>
				<button onClick={() => handlePopBox({ className: "hubungi" })}>
					{i18n.lbl_ContactUs}
				</button>
			</div>
		</div>
	);
};

export default Join;
