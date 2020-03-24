// Get locales (and common)
import common from "../locales/common.json";
import en from "../locales/en.json";
import fr from "../locales/fr.json";

// Requires al packages
import hideI18next from "i18next";
export const i18next = hideI18next;

import { defaultLocale, numeral, numeralSpecialLocales, supportedLocales } from "./locales";

// Constant used
const languageList = ["common"].concat(supportedLocales);
const resources = { common, en, fr };

export function initializeI18next() {
  hideI18next.init({
    lng: defaultLocale,
    debug: false,
    whitelist: languageList,
    ns: ["common", "translation"],
    fallbackLng: languageList,
    fallbackNS: ["common"],
    resources,
    interpolation: {
      format: function(value, format, lng) {
        if (format === "number") {
          if (numeralSpecialLocales[lng]) {
            numeral.locale(numeralSpecialLocales[lng]);
          } else {
            numeral.locale(lng);
          }
          return numeral(value).format("0,0");
        }
        return value;
      }
    }
  });
}

initializeI18next();
