import { EditorView } from "@codemirror/view"
import { EditorState, Compartment } from "@codemirror/state"
import {basicSetup} from "codemirror";

import {COMPLETED_COPY_BUTTON_SVG, COPY_BUTTON_SVG, LANGUAGES, Toolbox} from "./constants";
import "./index.scss";

const languageConf = new Compartment

class Code {

  constructor(args) {
    const { data, readOnly, config, api } = args;
    this.data = data;
    this.readOnly = readOnly ?? false;
    this.config = config;
    this.api = api;
    // this.settings = settings;
    this.codeMirrorInctance = null
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



  mountCodeMirror = async () => {

    this.codeMirrorInctance = new EditorView({
      extensions: [
          basicSetup,
          EditorState.readOnly.of(this.readOnly),
          LANGUAGES[this.data.language]()
      ],
      doc: this.data.code,
      parent: this.container
    })
  }

  render() {
    this.container = document.createElement("div");
    this.container.className = "editorjs-code__container";

    this.mountCodeMirror()

    this.langDisplay = document.createElement('div');
    this.langDisplay.classList.add('editorjs-code__langDisplay')
    let copyButton = document.createElement('button')
    copyButton.classList.add("editorjs-code__copyButton");
    copyButton.innerHTML = COPY_BUTTON_SVG;
    this.langDisplay.innerHTML = this.data.language

    copyButton.addEventListener("click",async () => {
      copyButton.innerHTML = COMPLETED_COPY_BUTTON_SVG;
      try {
        await navigator.clipboard.writeText(this.codeMirrorInctance.state.doc.toString());
      } finally {
        setTimeout(()=>{
          copyButton.innerHTML = COPY_BUTTON_SVG;
        },1000)
      }
    });

    this.container.appendChild(this.langDisplay)
    this.container.appendChild(copyButton)

    const languageDropdown = this.dropdownRender()
    this.langDisplay.addEventListener("click", (() => {
        languageDropdown.classList.toggle('show')
    }))

    this.container.appendChild(languageDropdown)

    return this.container;
  }

  // renderSettings = () => {
  //   return renderSettings(this.settings, this._changeType, this);
  // };

  onPaste(event) {
    const code = event.detail.data;
    this.codeMirrorInctance.setValue(code);
  }

  static get pasteConfig() {
    return {
      patterns: { code: /```([\s\S]+?)```/ },
    };
  }

  handleLanguageChange = (e) => {
    this.data.language = e
    this.langDisplay.innerText = e
    console.log(e)

    console.log(this.codeMirrorInctance)
    console.log(LANGUAGES[e])
    // this.codeMirrorInctance.dispatch({
    //   effects: languageConf.reconfigure(LANGUAGES[e]())
    // })

  }

  dropdownRender = () => {
    const wrapper = document.createElement("div");
    wrapper.className = "cdx-editor-dropdown";
    const input = document.createElement("input");
    input.className = "cdx-editor-dropdown__input";
    input.type = "text"
    input.id = "searchInput"
    input.placeholder = "Search language"

    const dropdownContent = document.createElement("div");
    dropdownContent.className = "cdx-editor-dropdown__content";
    dropdownContent.id = "dropdownContent"
    Object.keys(LANGUAGES).forEach((lang) => {
      const item = document.createElement("a");
      item.addEventListener("click", () => {
        this.handleLanguageChange(lang)
        wrapper.classList.remove('show');
      })
      item.href = "#"
      item.innerText = lang
      dropdownContent.appendChild(item)
    })

    wrapper.appendChild(input);
    wrapper.appendChild(dropdownContent)

    return wrapper
  }


  save(blockContent) {
    console.log(blockContent)
    return {
      code: this.codeMirrorInctance.state.doc.toString(),
      language: this.data.language,
    };
  }
}

export default Code;
