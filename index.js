import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/python/python';
import 'codemirror/mode/css/css';
import 'codemirror/mode/go/go';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/clike/clike';
import 'codemirror/lib/codemirror'

import CodeMirror from 'codemirror';

import {COMPLETED_COPY_BUTTON_SVG, COPY_BUTTON_SVG, Toolbox, LANGUAGES} from "./constants";
import "./index.scss";
class Code {

  constructor(args) {
    const { data, readOnly, config, api } = args;
    this.data = data;
    this.readOnly = readOnly ?? false;
    this.config = config;
    this.api = api;
    // this.settings = settings;
    this.editor = null
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



  mountCodeMirror = async (element) => {
    const langsMap = LANGUAGES.reduce((a, c) => {
      return {
        ...a,
        [c.label]: c.value
    }}, {})

    this.editor = CodeMirror.fromTextArea(element, {
      mode: this.data.language ? langsMap[this.data.language] : langsMap.javascript,
      tabSize: 4,
      styleActiveLine: { nonEmpty: true },
      styleActiveSelected: true,
      lineNumbers: true,
      line: false,
      autofocus: false,
      styleSelectedText: true,
      matchBrackets: true,
      showCursorWhenSelecting: true,
      theme: 'dracula',
      autoCloseTags: true,
      foldGutter: true,
      dragDrop: true,
      lint: true,
      extraKeys: { 'Ctrl': 'autocomplete' },
      hintOptions: {
        completeSingle: false
      },
    });

    setTimeout(() => {
      // Focus the CodeMirror editor
      this.editor.focus();
      this.editor.setCursor(this.editor.lineCount(),0)
      this.editor.refresh()
    }, 100);

  }

  render() {
    this.container = document.createElement("div");
    this.container.className = "editorjs-code__container";
    this.texarea = document.createElement('textarea')
    this.texarea.classList.add('cdx-editor__textarea')
    this.texarea.value = this.data.code

    this.container.appendChild(this.texarea)
    this.mountCodeMirror(this.texarea)

    this.langDisplay = document.createElement('div');
    this.langDisplay.classList.add('editorjs-code__langDisplay')
    let copyButton = document.createElement('button')
    copyButton.classList.add("editorjs-code__copyButton");
    copyButton.innerHTML = COPY_BUTTON_SVG;
    this.langDisplay.innerHTML = this.data.language

    copyButton.addEventListener("click",async () => {
      copyButton.innerHTML = COMPLETED_COPY_BUTTON_SVG;
      try {
        await navigator.clipboard.writeText(this.editor.getValue());
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
    this.languageDropdown = languageDropdown

    return this.container;
  }

  onSearchLanguages = () => {
    const self = this
    return function (e) {
      const filter = e.target.value.toUpperCase();
      const a = self.languageDropdown.getElementsByTagName('a');
      for (let i = 0; i < a.length; i++) {
        const txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          a[i].style.display = '';
        } else {
          a[i].style.display = 'none';
        }
      }
    }
  }

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
    this.data.language = lang.label
    this.langDisplay.innerText = lang.label

    this.editor.setOption("mode", lang.value)
  }

  dropdownRender = () => {
    const wrapper = document.createElement("div");
    wrapper.className = "cdx-editor-dropdown";
    const input = document.createElement("input");

    input.className = "cdx-editor-dropdown__input";
    input.type = "text"
    input.id = "searchInput"
    input.placeholder = "Search language"
    input.addEventListener('keyup', this.onSearchLanguages())

    const dropdownContent = document.createElement("div");
    dropdownContent.className = "cdx-editor-dropdown__content";
    dropdownContent.id = "dropdownContent"
    LANGUAGES.forEach((lang) => {
      const item = document.createElement("a");
      item.addEventListener("click", () => {
        this.handleLanguageChange(lang)
        wrapper.classList.remove('show');
      })
      item.href = "#"
      item.innerText = lang.label
      item.value = lang.value
      dropdownContent.appendChild(item)
    })

    wrapper.appendChild(input);
    wrapper.appendChild(dropdownContent)

    return wrapper
  }


  save(blockContent) {
    return {
      code: this.editor.getValue(),
      language: this.data.language,
    };
  }
}

export default Code;
