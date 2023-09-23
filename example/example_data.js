let example_data = {
	blocks: [
		{
			type: "header",
			data: {
				text: "Example: code plugin",
				level: 3,
			},
		},
		{
			type: "paragraph",
			data: {
				text: "This is an example of using EditorJs, with @juratbek/editorjs-quiz package",
			},
		},
		{
			type: "delimiter",
		},
		{
			type: "code",
			data: {
				code: "console.log('Hello World!');",
				language: "javascript",
				showLineNumbers: true,
			}
		}
	],
};
