export const defaultLocale = "en";

export const supportedLocales = ["en", "fr"];

export const numeralSpecialLocales = {};

import hideNumeral from "numeral";
import "numeral/locales/fr";

export const numeral = hideNumeral;
