export const saveFile = ( blob: any, fileName: string) => {
  var a = document.createElement("a");
  document.body.appendChild(a);
  a.setAttribute("style", "display: none")

  if (blob instanceof Blob) {
    let url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  } else {
    console.error("invalid response type");
  }
};