import { fromURL } from "cheerio";
import { writeFile } from "fs/promises";

import type { ExternalTechnique, TechniqueGroup } from "11ty/techniques";

const destination = import.meta.filename.replace(/\.\w+$/, ".json");

export async function retrievePdfaTechniques() {
  const pdfaTechniques: TechniqueGroup = {
    title: "PDF Association Techniques for Accessible PDF",
    techniques: []
  };
  const pdfaFailures: TechniqueGroup = {
    title: "PDF Association Failures for Accessible PDF",
    techniques: []
  };
  const $ = await fromURL("https://pdfa.org/techniques-for-accessible-pdf/");

  const items = $("h2[id^='fundamental-'] ~ [id^='wpv-view-layout'] li");
  for (const el of items) {
    const $el = $(el);
    const $a = $el.find("a");
    const href = $a.attr("href");
    if (!href) throw new Error("Found PDFA list item with no hyperlink; stopping.");
    $a.remove(); // Leave only the ID text remaining in parent, to be easily extracted

    const technique: ExternalTechnique = {
      id: $el.text().trim(),
      title: $a.text().trim(),
      url: href,
    };
    const target = /F\d+\/$/.test(technique.url) ? pdfaFailures : pdfaTechniques;
    target.techniques.push(technique);
  }

  await writeFile(
    destination,
    JSON.stringify(
      {
        pdf: [pdfaTechniques, pdfaFailures],
      },
      null,
      "  "
    )
  );
}
