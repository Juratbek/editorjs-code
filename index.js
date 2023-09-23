import {  settings, Toolbox } from "./constants";
import {basicSetup, EditorView} from "codemirror"
import {EditorState, Compartment} from "@codemirror/state"
import { javascript } from "@codemirror/lang-javascript"
import {
  renderSettings,
} from "./utils";
import "./index.scss";

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

  render() {
    const container = document.createElement("div");
    container.className = "code-tool-container";

    let language = new Compartment, tabSize = new Compartment

    let state = EditorState.create({
      doc: this.data.code,
      extensions: [
        basicSetup,
        language.of(javascript()),
        tabSize.of(EditorState.tabSize.of(8)),
      ]
    })

    this.codeMirrorInctance = new EditorView({
      state,
      parent: container
    })

    return container;
  }

  updateLanguageMode(mode) {
    this.codeMirrorInctance.setOption('mode', mode);
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


  save(blockContent) {
    console.log(blockContent)
    return {
      code: this.codeMirrorInctance.state.doc.toString(),
      language: this.data.language,
    };
  }
}

export default Code;
