import "codemirror/mode/javascript/javascript";
import "codemirror/mode/python/python";
import "codemirror/mode/css/css";
import "codemirror/mode/go/go";
import "codemirror/mode/sql/sql";
import "codemirror/mode/markdown/markdown";
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/mode/clike/clike";

import CodeMirror from "codemirror";

import {
  COMPLETED_COPY_BUTTON_SVG,
  COPY_BUTTON_SVG,
  Toolbox,
  LANGUAGES,
} from "./constants";
import "./config.scss";
import "./index.scss";
class Code {
  #language = "javascript";
  #readOnly = false;

  constructor(args) {
    const { data, readOnly, config, api } = args;
    this.data = data;
    this.#readOnly = readOnly ?? false;
    this.config = config;
    this.api = api;
    this.editor = null;

    this.#language = data.language ?? config.defaultLanguage ?? "javascript";
  }

  static get isReadOnlySupported() {
    return true;
  }

  static get enableLineBreaks() {
    return true;
  }

  static get toolbox() {
    return Toolbox;
  }

  get CSS() {
    return {
      codeContainer: "cdx-editor__container code-editor__container",
      dropdown: "cdx-editor-dropdown",
      dropdownInput: "cdx-editor-dropdown__input",
      dropdownContent: "cdx-editor-dropdown__content",
      langDisplay: "cdx-editor__langDisplay",
      copyButton: "cdx-editor__copyButton",
      textArea: "cdx-editor__textarea",
    };
  }

  mountCodeMirror = async (element) => {
    const langsMap = LANGUAGES.reduce((a, c) => {
      return {
        ...a,
        [c.label]: c.value,
      };
    }, {});

    this.editor = CodeMirror.fromTextArea(element, {
      mode: langsMap[this.#language],
      tabSize: 2,
      styleActiveLine: { nonEmpty: true },
      styleActiveSelected: true,
      lineNumbers: true,
      line: false,
      autofocus: false,
      styleSelectedText: true,
      matchBrackets: true,
      showCursorWhenSelecting: true,
      theme: "dracula",
      autoCloseTags: true,
      foldGutter: true,
      dragDrop: true,
      lint: true,
      extraKeys: { Ctrl: "autocomplete" },
      readOnly: this.#readOnly,
      hintOptions: {
        completeSingle: false,
      },
    });

    this.editor.on("keydown", (cm, event) => {
      if (event.key === "Tab") {
        event.stopPropagation();
      }
    });

    setTimeout(() => {
      // TODO: focus on the editor only when it is added as a block
      // we should not focus on the editor when an article is loaded and mountet
      // this.editor.focus();
      // this.editor.setCursor(this.editor.lineCount(), 0);
      this.editor.refresh();
    }, 100);
  };

  render() {
    this.container = document.createElement("div");
    this.container.className = this.CSS.codeContainer;
    this.texarea = document.createElement("textarea");
    this.texarea.classList.add(this.CSS.textArea);
    this.texarea.value = this.data.code ?? "// Salom Dunyo";

    this.container.appendChild(this.texarea);
    this.mountCodeMirror(this.texarea);

    this.langDisplay = document.createElement("div");
    this.langDisplay.classList.add(this.CSS.langDisplay);
    let copyButton = document.createElement("button");
    copyButton.classList.add(this.CSS.copyButton);
    copyButton.innerHTML = COPY_BUTTON_SVG;
    this.langDisplay.innerHTML = this.#language;

    copyButton.addEventListener("click", async () => {
      copyButton.innerHTML = COMPLETED_COPY_BUTTON_SVG;
      try {
        await navigator.clipboard.writeText(this.editor.getValue());
      } finally {
        setTimeout(() => {
          copyButton.innerHTML = COPY_BUTTON_SVG;
        }, 1000);
      }
    });

    this.container.appendChild(this.langDisplay);
    this.container.appendChild(copyButton);

    const languageDropdown = this.dropdownRender();
    this.langDisplay.addEventListener("click", (e) => {
      e.stopPropagation();
      languageDropdown.classList.toggle("show");
    });

    this.container.appendChild(languageDropdown);
    this.languageDropdown = languageDropdown;

    return this.container;
  }

  onSearchLanguages = () => {
    const self = this;
    return function (e) {
      const filter = e.target.value.toUpperCase();
      const a = self.languageDropdown.getElementsByTagName("a");
      for (let i = 0; i < a.length; i++) {
        const txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          a[i].style.display = "";
        } else {
          a[i].style.display = "none";
        }
      }
    };
  };

  onPaste(event) {
    const code = event.detail.data;
    this.editor.setValue(code);
  }

  static get pasteConfig() {
    return {
      patterns: { code: /```([\s\S]+?)```/ },
    };
  }

  handleLanguageChange = (lang) => {
    this.#language = lang.label;
    this.langDisplay.innerText = lang.label;

    this.editor.setOption("mode", lang.value);
  };

  dropdownRender = () => {
    const wrapper = document.createElement("div");
    wrapper.className = this.CSS.dropdown;
    const input = document.createElement("input");

    input.className = this.CSS.dropdownInput;
    input.type = "text";
    input.id = "searchInput";
    input.placeholder = "Search language";
    input.addEventListener("keyup", this.onSearchLanguages());

    const dropdownContent = document.createElement("div");
    dropdownContent.className = this.CSS.dropdownContent;
    dropdownContent.id = "dropdownContent";
    LANGUAGES.forEach((lang) => {
      const item = document.createElement("a");
      item.addEventListener("click", () => {
        this.handleLanguageChange(lang);
        wrapper.classList.remove("show");
      });
      item.href = "#";
      item.innerText = lang.label;
      item.value = lang.value;
      dropdownContent.appendChild(item);
    });

    wrapper.appendChild(input);
    wrapper.appendChild(dropdownContent);

    document.addEventListener("click", function (e) {
      if (!wrapper.contains(e.target)) {
        wrapper.classList.remove("show");
      }
    });

    return wrapper;
  };

  save(blockContent) {
    return {
      code: this.editor.getValue(),
      language: this.#language,
    };
  }
}

export default Code;
