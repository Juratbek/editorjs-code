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
        code: `package main\n\nimport "fmt"\n\nfunc main() {
  fmt.Println("hello world");
}
func main() {
  fmt.Println("hello world");
}
func main() {
  fmt.Println("hello world");
}
func main() {
  fmt.Println("hello world");
}
func main() {
  fmt.Println("hello world");
}
func main() {
  fmt.Println("hello world");
}
func main() {
  fmt.Println("hello world");
}
func main() {
  fmt.Println("hello world");
}
func main() {
  fmt.Println("hello world");
}
func main() {
  fmt.Println("hello world");
}
func main() {
  fmt.Println("hello world");
}
func main() {
  fmt.Println("hello world");
}
`,
        language: "go",
        showLineNumbers: true,
      },
    },
    {
      type: "code",
      data: {
        code: "console.log('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias ut architecto cumque laudantium, corrupti ducimus? Quia, odit modi eligendi sit, culpa blanditiis aperiam alias, quae inventore praesentium officia dolore distinctio.')",
      },
    },
  ],
};
