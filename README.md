# Code editor for Editor.js

Code editor for [Editor.js](https://editorjs.io)
Allows you to write codes

## Installation

```shell
npm i @juratbek/editorjs-code
```

```shell
yarn add @juratbek/editorjs-code
```

## Usage

Add the Code tool to the `tools` property of the Editor.js initial config.

```javascript
import EditorJs from "@editorjs/editorjs";
import Code from "@juratbek/editorjs-code";

const editor = EditorJs({
  // ...
  tools: {
    code: Code,
  },
});
```

## Config Params

| Field           | Type     | Description             | Default value |
| --------------- | -------- | ----------------------- | ------------- |
| defaultLanguage | `string` | default coding language | `javascript`  |

## Output data

| Field    | Type     | Description     |
| -------- | -------- | --------------- |
| code     | `string` | written code    |
| language | `string` | coding language |
