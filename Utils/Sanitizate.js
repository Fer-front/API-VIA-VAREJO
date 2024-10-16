const event_handle = [
  "onclick",
  "onauxclick",
  "ondblclick",
  "ondrag",
  "ondragend",
  "ondragenter",
  "ondragexit",
  "ondragleave",
  "ondragover",
  "ondragstart",
  "onmousedown",
  "onmouseenter",
  "onmouseleave",
  "onmousemove",
  "onmouseout",
  "onmouseover",
  "onmouseup",
];

const base = [
  "script",
  "#",
  "\\$",
  "\\^",
  "\\*",
  "&amp",
  "&lt",
  "&gt",
  "&quot",
  "&#x27",
  "alert",
  "%",
];

function clear(str) {
  const items = `(${[...event_handle, ...base].join("|")})`;

  return str.replace(new RegExp(items, "g"), "");
}

module.exports = {
  clear,
};
