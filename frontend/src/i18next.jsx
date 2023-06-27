import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from '../src/Language/en.json'
import si from '../src/Language/si.json'

i18next.use(initReactI18next).init({
    resources: {
        en: {
            translation: en
        },
        si: {
            translation: si
        }
    },
    lng: localStorage.getItem("lng") || "en",
});

export default i18next;