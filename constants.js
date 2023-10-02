import { CodeIcon } from "./icons";
import { javascript } from "@codemirror/lang-javascript"
import { python } from "@codemirror/lang-python"
import { java } from "@codemirror/lang-java"
import { sql } from "@codemirror/lang-sql"
import { json } from "@codemirror/lang-json"
import { markdown } from "@codemirror/lang-markdown"


export const LANGUAGES = {
  javascript,
  python,
  java,
  sql,
  json,
  markdown
}
export const TYPES = {
  singleSelect: "singleSelect",
  multiSelect: "multiSelect",
};

// export const settings = [
//   {
//     name: "Single Select",
//     type: TYPES.singleSelect,
//     icon: RadioInputIcon,
//     className: "qt-settings-icon__single",
//   },
//   {
//     name: "Multi Select",
//     type: TYPES.multiSelect,
//     icon: CheckboxIcon,
//   },
// ];

export const Toolbox = {
  title: "Code",
  icon: CodeIcon,
};


export const COPY_BUTTON_SVG =
    '<?xml version="1.0" encoding="utf-8"?><svg width="1.4em" height="1.4em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 12.9V17.1C16 20.6 14.6 22 11.1 22H6.9C3.4 22 2 20.6 2 17.1V12.9C2 9.4 3.4 8 6.9 8H11.1C14.6 8 16 9.4 16 12.9Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path opacity="0.4" d="M22 6.9V11.1C22 14.6 20.6 16 17.1 16H16V12.9C16 9.4 14.6 8 11.1 8H8V6.9C8 3.4 9.4 2 12.9 2H17.1C20.6 2 22 3.4 22 6.9Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
export const COMPLETED_COPY_BUTTON_SVG =
    '<?xml version="1.0" encoding="utf-8"?><svg width="1.4em" height="1.4em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 14L8.23309 16.4248C8.66178 16.7463 9.26772 16.6728 9.60705 16.2581L18 6" stroke="#33363F" stroke-width="2" stroke-linecap="round"/></svg>';


export const TEXTS = {
  uz: {
    errors: {
      required: "Iltimos javobni tanlang",
    },
    footer: {
      submit: "Tekshirish",
    },
  },
  en: {
    errors: {
      required: "Please pick the answer",
    },
    footer: {
      submit: "Submit",
    },
  },
};
