import React, { useState, useEffect } from "react";
import * as ct from "./context";
import { GET_LANG_ID } from "../service/language";
import { GetTranslation } from "../i18n/i18n";

const Wrapper = ({ children }) => {
  const [language, setLanguage] = useState(GET_LANG_ID());
  const [i18n, seti18n] = useState({});

  const [popBox, setPopBox] = useState({
    isOpen: false,
    title: "",
    content: "",
    hasBtn: false,
    btnBar: null,
  });

  useEffect(() => {
    seti18n(GetTranslation(language));
  }, [language, seti18n]);

  return (
    <ct.languageContext.Provider value={{ language, setLanguage }}>
      <ct.i18nContext.Provider value={{ i18n }}>
        <ct.popBoxContext.Provider value={{ popBox, setPopBox }}>
          {children}
        </ct.popBoxContext.Provider>
      </ct.i18nContext.Provider>
    </ct.languageContext.Provider>
  );
};

export default Wrapper;
