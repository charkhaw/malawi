// Shared drawing primitives for the Document 5 figures. Black on white, grey for hardware.
const fs = require("fs");
const DIR = "C:/Users/ckhawaja/AppData/Local/Temp/claude/c--Users-ckhawaja-Desktop-tender-Malawi/f4044861-1ae7-45be-98ca-7e097c9c52d8/scratchpad/";

module.exports = function figure(W, H, base = 17) {
  const S = [];
  const esc = (t) => String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;");

  function text(x, y, lines, { size = base, anchor = "middle", weight = 400, italic = false, fill = "#000", spacing = 0 } = {}) {
    const lh = size * 1.25;
    [].concat(lines).forEach((t, i) => S.push(`<text x="${x}" y="${y + i * lh}" font-size="${size}" text-anchor="${anchor}"` +
      ` dominant-baseline="central" font-weight="${weight}"${italic ? ' font-style="italic"' : ""}` +
      `${spacing ? ` letter-spacing="${spacing}"` : ""} fill="${fill}">${esc(t)}</text>`));
  }

  // style: solid | grey | dashed | dotted | double | zone | light
  function box(x, y, w, h, lines = [], style = "solid", { size = base, italic = false, valign = "middle" } = {}) {
    const r = (fill, extra = "", sw = 1.6) => S.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="#000" stroke-width="${sw}"${extra}/>`);
    if (style === "double") {
      r("#fff", "", 1.4);
      S.push(`<rect x="${x + 5}" y="${y + 5}" width="${w - 10}" height="${h - 10}" fill="none" stroke="#000" stroke-width="1.4"/>`);
    } else if (style === "grey") r("#d9d9d9");
    else if (style === "light") r("#efefef");
    else if (style === "dashed") r("#fff", ' stroke-dasharray="9 6"');
    else if (style === "dotted") r("#fff", ' stroke-dasharray="1.5 5" stroke-linecap="round"', 2.4);
    else if (style === "zone") r("#fff", "", 2.6);
    else r("#fff");
    const lines_ = [].concat(lines);
    if (!lines_.length) return;
    const lh = size * 1.25;
    const cy = valign === "top" ? y + 22 : y + h / 2 - ((lines_.length - 1) * lh) / 2;
    text(x + w / 2, cy, lines_, { size, italic });
  }

  function zone(x, y, w, h, title) {
    box(x, y, w, h, [], "zone");
    text(x + 14, y + 22, [].concat(title), { size: base - 2, anchor: "start", weight: 700, spacing: 0.8 });
  }

  function diamond(cx, cy, hw, hh, lines) {
    S.push(`<path d="M${cx} ${cy - hh} L${cx + hw} ${cy} L${cx} ${cy + hh} L${cx - hw} ${cy} Z" fill="#fff" stroke="#000" stroke-width="1.6"/>`);
    const lh = base * 1.25;
    text(cx, cy - ((lines.length - 1) * lh) / 2, lines);
  }

  function line(pts, { start = false, end = false, dashed = false, dotted = false, width = 1.6 } = {}) {
    const d = pts.map((p, i) => (i ? "L" : "M") + p[0] + " " + p[1]).join(" ");
    const dash = dashed ? ' stroke-dasharray="7 5"' : dotted ? ' stroke-dasharray="2 4"' : "";
    const m = width > 2.5 ? "b" : "a";
    S.push(`<path d="${d}" fill="none" stroke="#000" stroke-width="${width}"${dash}` +
      `${start ? ` marker-start="url(#${m}0)"` : ""}${end ? ` marker-end="url(#${m}1)"` : ""}/>`);
  }

  function label(x, y, lines, anchor = "middle", opts = {}) {
    text(x, y, lines, { size: base - 2, anchor, fill: "#111", ...opts });
  }

  function step(cx, cy, n) {
    S.push(`<circle cx="${cx}" cy="${cy}" r="13" fill="#000"/>`);
    text(cx, cy + 0.5, [String(n)], { size: 15, weight: 700, fill: "#fff" });
  }

  function raw(s) { S.push(s); }

  function write(name) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="'Segoe UI', Arial, sans-serif">
<defs>
<marker id="a1" viewBox="0 0 10 10" refX="9.5" refY="5" markerWidth="7.5" markerHeight="7.5" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="#000"/></marker>
<marker id="a0" viewBox="0 0 10 10" refX="0.5" refY="5" markerWidth="7.5" markerHeight="7.5" orient="auto"><path d="M10 0 L0 5 L10 10 z" fill="#000"/></marker>
<marker id="b1" viewBox="0 0 10 10" refX="9.5" refY="5" markerWidth="4.5" markerHeight="4.5" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="#000"/></marker>
<marker id="b0" viewBox="0 0 10 10" refX="0.5" refY="5" markerWidth="4.5" markerHeight="4.5" orient="auto"><path d="M10 0 L0 5 L10 10 z" fill="#000"/></marker>
</defs>
<rect width="${W}" height="${H}" fill="#fff"/>
${S.join("\n")}
</svg>`;
    fs.writeFileSync(DIR + name + ".html", `<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;padding:0;background:#fff}svg{display:block}</style></head><body>${svg}</body></html>`);
    console.log(`wrote ${name}.html ${W}x${H}`);
  }

  return { text, box, zone, diamond, line, label, step, raw, write };
};
