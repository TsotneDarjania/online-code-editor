require.config({
  paths: {
    vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.30.1/min/vs",
  },
});
require(["vs/editor/editor.main"], function () {
  monaco.editor.create(document.getElementById("editor"), {
    language: "javascript",
    theme: "vs-dark",
  });
});
