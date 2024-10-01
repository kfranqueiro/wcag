import axios from "axios";
import type { CheerioAPI } from "cheerio";
import { glob } from "glob";
import pick from "lodash-es/pick";

import { readFile } from "fs/promises";
import { basename, join } from "path";

import { flattenDomFromFile, load, loadFromFile, type CheerioAnyNode } from "./cheerio";
import { generateId } from "./common";

export type WcagVersion = "20" | "21" | "22";
export function assertIsWcagVersion(v: string): asserts v is WcagVersion {
  if (!/^2[012]$/.test(v)) throw new Error(`Unexpected version found: ${v}`);
}

/**
 * Interface describing format of entries in guidelines/act-mapping.json
 */
interface ActRule {
  deprecated: boolean;
  permalink: string;
  proposed: boolean;
  successCriteria: string[];
  title: string;
  wcagTechniques: string[];
}

type ActMapping = {
  "act-rules": ActRule[];
};

/** Data used for test-rules sections, from act-mapping.json */
export const actRules = (
  JSON.parse(await readFile("guidelines/act-mapping.json", "utf8")) as ActMapping
)["act-rules"];

/**
 * Flattened object hash, mapping each WCAG 2 SC slug to the earliest WCAG version it applies to.
 * (Functionally equivalent to "guidelines-versions" target in build.xml; structurally inverted)
 */
const scVersions = await (async function () {
  const paths = await glob("*/*.html", { cwd: "understanding" });
  const map: Record<string, WcagVersion> = {};

  for (const path of paths) {
    const [fileVersion, filename] = path.split("/");
    assertIsWcagVersion(fileVersion);
    map[basename(filename, ".html")] = fileVersion;
  }

  return map;
})();

export interface DocNode {
  id: string;
  name: string;
  /** Helps distinguish entity type when passed out-of-context; used for navigation */
  type?: "Principle" | "Guideline" | "SC";
}

export interface Principle extends DocNode {
  content: string;
  num: `${number}`; // typed as string for consistency with guidelines/SC
  version: "20";
  guidelines: Guideline[];
  type: "Principle";
}

export interface Guideline extends DocNode {
  content: string;
  num: `${Principle["num"]}.${number}`;
  version: "20" | "21";
  successCriteria: SuccessCriterion[];
  type: "Guideline";
}

export interface SuccessCriterion extends DocNode {
  content: string;
  num: `${Guideline["num"]}.${number}`;
  /** Level may be empty for obsolete criteria */
  level: "A" | "AA" | "AAA" | "";
  version: WcagVersion;
  type: "SC";
}

export type WcagItem = Principle | Guideline | SuccessCriterion;

export function isSuccessCriterion(criterion: any): criterion is SuccessCriterion {
  return !!(criterion?.type === "SC" && "level" in criterion);
}

/** Version-dependent overrides of SC shortcodes for older versions */
export const scSlugOverrides: Record<string, (version: WcagVersion) => string> = {
  "target-size-enhanced": (version) => (version < "22" ? "target-size" : "target-size-enhanced"),
};

/** Selectors ignored when capturing content of each Principle / Guideline / SC */
const contentIgnores = [
  "h1, h2, h3, h4, h5, h6",
  "section",
  ".change",
  ".conformance-level",
  // Selectors below are specific to pre-published guidelines (for previous versions)
  ".header-wrapper",
  ".doclinks",
];

/**
 * Returns HTML content used for Understanding guideline/SC boxes and term definitions.
 * @param $el Cheerio element of the full section from flattened guidelines/index.html
 */
const getContentHtml = ($el: CheerioAnyNode) => {
  // Load HTML into a new instance, remove elements we don't want, then return the remainder
  const $ = load($el.html()!, null, false);
  $(contentIgnores.join(", ")).remove();
  return $.html().trim();
};

/** Performs processing common across WCAG versions */
function processPrinciples($: CheerioAPI) {
  const principles: Principle[] = [];
  $(".principle").each((i, el) => {
    const guidelines: Guideline[] = [];
    $("> .guideline", el).each((j, guidelineEl) => {
      const successCriteria: SuccessCriterion[] = [];
      // Source uses sc class, published uses guideline class (again)
      $("> .guideline, > .sc", guidelineEl).each((k, scEl) => {
        const scId = scEl.attribs.id;
        successCriteria.push({
          content: getContentHtml($(scEl)),
          id: scId,
          name: $("h4", scEl).text().trim(),
          num: `${i + 1}.${j + 1}.${k + 1}`,
          // conformance-level contains only letters in source, full (Level ...) in publish
          level: $("p.conformance-level", scEl)
            .text()
            .trim()
            .replace(/^\(Level (.*)\)$/, "$1") as SuccessCriterion["level"],
          type: "SC",
          version: scVersions[scId],
        });
      });

      guidelines.push({
        content: getContentHtml($(guidelineEl)),
        id: guidelineEl.attribs.id,
        name: $("h3", guidelineEl).text().trim(),
        num: `${i + 1}.${j + 1}`,
        type: "Guideline",
        version: guidelineEl.attribs.id === "input-modalities" ? "21" : "20",
        successCriteria,
      });
    });

    principles.push({
      content: getContentHtml($(el)),
      id: el.attribs.id,
      name: $("h2", el).text().trim(),
      num: `${i + 1}`,
      type: "Principle",
      version: "20",
      guidelines,
    });
  });

  return principles;
}

/**
 * Resolves information from guidelines/index.html;
 * comparable to the principles section of wcag.xml from the guidelines-xml Ant task.
 */
export const getPrinciples = async () =>
  processPrinciples(await flattenDomFromFile("guidelines/index.html"));

/**
 * Returns a flattened object hash, mapping shortcodes to each principle/guideline/SC.
 */
export function getFlatGuidelines(principles: Principle[]) {
  const map: Record<string, WcagItem> = {};
  for (const principle of principles) {
    map[principle.id] = principle;
    for (const guideline of principle.guidelines) {
      map[guideline.id] = guideline;
      for (const criterion of guideline.successCriteria) {
        map[criterion.id] = criterion;
      }
    }
  }
  return map;
}
export type FlatGuidelinesMap = ReturnType<typeof getFlatGuidelines>;

interface Term {
  definition: string;
  /** generated id for use in Understanding pages */
  id: string;
  name: string;
  /** id of dfn in TR, which matches original id in terms file */
  trId: string;
}
export type TermsMap = Record<string, Term>;

/**
 * Resolves term definitions from guidelines/index.html organized for lookup by name;
 * comparable to the term elements in wcag.xml from the guidelines-xml Ant task.
 */
export async function getTermsMap(version?: WcagVersion) {
  const $ = version
    ? await loadRemoteGuidelines(version)
    : await flattenDomFromFile("guidelines/index.html");
  const terms: TermsMap = {};

  $("dfn").each((_, el) => {
    const $el = $(el);
    const term: Term = {
      // Note: All applicable <dfn>s have explicit id attributes for TR,
      // but the XSLT process generates id from the element's text which is not always the same
      id: `dfn-${generateId($el.text())}`,
      definition: getContentHtml($el.parent().next()),
      name: $el.text(),
      trId: el.attribs.id,
    };

    // Include both original and all-lowercase version to simplify lookups
    // (since most synonyms are lowercase) while preserving case in name
    const names = [term.name, term.name.toLowerCase()].concat(
      (el.attribs["data-lt"] || "").toLowerCase().split("|")
    );
    for (const name of names) terms[name] = term;
  });

  return terms;
}

const altIds: Record<string, string> = {
  "text-alternatives": "text-equiv",
  "non-text-content": "text-equiv-all",
  "time-based-media": "media-equiv",
  "audio-only-and-video-only-prerecorded": "media-equiv-av-only-alt",
  "captions-prerecorded": "media-equiv-captions",
  "audio-description-or-media-alternative-prerecorded": "media-equiv-audio-desc",
  "captions-live": "media-equiv-real-time-captions",
  "audio-description-prerecorded": "media-equiv-audio-desc-only",
  "sign-language-prerecorded": "media-equiv-sign",
  "extended-audio-description-prerecorded": "media-equiv-extended-ad",
  "media-alternative-prerecorded": "media-equiv-text-doc",
  "audio-only-live": "media-equiv-live-audio-only",
  adaptable: "content-structure-separation",
  "info-and-relationships": "content-structure-separation-programmatic",
  "meaningful-sequence": "content-structure-separation-sequence",
  "sensory-characteristics": "content-structure-separation-understanding",
  distinguishable: "visual-audio-contrast",
  "use-of-color": "visual-audio-contrast-without-color",
  "audio-control": "visual-audio-contrast-dis-audio",
  "contrast-minimum": "visual-audio-contrast-contrast",
  "resize-text": "visual-audio-contrast-scale",
  "images-of-text": "visual-audio-contrast-text-presentation",
  "contrast-enhanced": "visual-audio-contrast7",
  "low-or-no-background-audio": "visual-audio-contrast-noaudio",
  "visual-presentation": "visual-audio-contrast-visual-presentation",
  "images-of-text-no-exception": "visual-audio-contrast-text-images",
  operable: "operable",
  "keyboard-accessible": "keyboard-operation",
  keyboard: "keyboard-operation-keyboard-operable",
  "no-keyboard-trap": "keyboard-operation-trapping",
  "keyboard-no-exception": "keyboard-operation-all-funcs",
  "enough-time": "time-limits",
  "timing-adjustable": "time-limits-required-behaviors",
  "pause-stop-hide": "time-limits-pause",
  "no-timing": "time-limits-no-exceptions",
  interruptions: "time-limits-postponed",
  "re-authenticating": "time-limits-server-timeout",
  seizures: "seizure",
  "three-flashes-or-below-threshold": "seizure-does-not-violate",
  "three-flashes": "seizure-three-times",
  navigable: "navigation-mechanisms",
  "bypass-blocks": "navigation-mechanisms-skip",
  "page-titled": "navigation-mechanisms-title",
  "focus-order": "navigation-mechanisms-focus-order",
  "link-purpose-in-context": "navigation-mechanisms-refs",
  "multiple-ways": "navigation-mechanisms-mult-loc",
  "headings-and-labels": "navigation-mechanisms-descriptive",
  "focus-visible": "navigation-mechanisms-focus-visible",
  location: "navigation-mechanisms-location",
  "link-purpose-link-only": "navigation-mechanisms-link",
  "section-headings": "navigation-mechanisms-headings",
  understandable: "understandable",
  readable: "meaning",
  "language-of-page": "meaning-doc-lang-id",
  "language-of-parts": "meaning-other-lang-id",
  "unusual-words": "meaning-idioms",
  abbreviations: "meaning-located",
  "reading-level": "meaning-supplements",
  pronunciation: "meaning-pronunciation",
  predictable: "consistent-behavior",
  "on-focus": "consistent-behavior-receive-focus",
  "on-input": "consistent-behavior-unpredictable-change",
  "consistent-navigation": "consistent-behavior-consistent-locations",
  "consistent-identification": "consistent-behavior-consistent-functionality",
  "change-on-request": "consistent-behavior-no-extreme-changes-context",
  "input-assistance": "minimize-error",
  "error-identification": "minimize-error-identified",
  "labels-or-instructions": "minimize-error-cues",
  "error-suggestion": "minimize-error-suggestions",
  "error-prevention-legal-financial-data": "minimize-error-reversible",
  help: "minimize-error-context-help",
  "error-prevention-all": "minimize-error-reversible-all",
  robust: "robust",
  compatible: "ensure-compat",
  parsing: "ensure-compat-parses",
  "name-role-value": "ensure-compat-rsv",
};

export async function generateWcagJson(principles: Principle[]) {
  const flatGuidelines: Record<WcagVersion, Record<string, WcagItem>> = {
    "20": getFlatGuidelines(await getPrinciplesForVersion("20")),
    "21": getFlatGuidelines(await getPrinciplesForVersion("21")),
    "22": getFlatGuidelines(principles),
  };

  const spreadCommonProps = (item: WcagItem) => ({
    ...pick(item, "id", "num", "content"),
    alt_id: item.id in altIds ? [altIds[item.id]] : [],
    handle: item.name,
    // TODO: title - non-HTML version of content
    versions: (Object.keys(flatGuidelines) as WcagVersion[])
      .filter((version) => item.id in flatGuidelines[version] && (item.type !== "SC" || item.level))
      .map((version) => resolveDecimalVersion(version)),
  });

  const data = {
    principles: principles.map((principle) => ({
      ...spreadCommonProps(principle),
      guidelines: principle.guidelines.map((guideline) => ({
        ...spreadCommonProps(guideline),
        successCriteria: guideline.successCriteria.map((sc) => ({
          ...spreadCommonProps(sc),
          level: sc.level,
          // TODO: details
        })),
      })),
    })),
  };
  return JSON.stringify(data, null, "  ");
}

// Version-specific APIs

const guidelinesCache: Partial<Record<WcagVersion, string>> = {};

/** Loads guidelines from TR space for specific version, caching for future calls. */
const loadRemoteGuidelines = async (version: WcagVersion, stripRespec = true) => {
  const html =
    guidelinesCache[version] ||
    (guidelinesCache[version] = (
      await axios.get(`https://www.w3.org/TR/WCAG${version}/`, { responseType: "text" })
    ).data);

  const $ = load(html);
  if (!stripRespec) return $;

  // Re-collapse definition links and notes, to be processed by this build system
  $("a.internalDFN").removeAttr("class data-link-type id href title");
  $("[role='note'] .marker").remove();
  $("[role='note']").find("> div, > p").addClass("note").unwrap();

  // Un-process bibliography references, to be processed by CustomLiquid
  $("cite:has(a.bibref:only-child)").each((_, el) => {
    const $el = $(el);
    $el.replaceWith(`[${$el.find("a.bibref").html()}]`);
  });

  // Remove generated IDs and markers from examples
  $(".example[id]").removeAttr("id");
  $(".example .marker:has(.self-link)").remove();

  // Remove extra markup from headings so they can be parsed for names
  $("bdi").remove();

  // Remove abbr elements which exist only in TR, not in informative docs
  $("#acknowledgements li abbr, #glossary abbr").each((_, abbrEl) => {
    $(abbrEl).replaceWith($(abbrEl).text());
  });

  return $;
};

/**
 * Retrieves heading and content information for acknowledgement subsections,
 * for preserving the section in About pages for earlier versions.
 */
export const getAcknowledgementsForVersion = async (version: WcagVersion) => {
  const $ = await loadRemoteGuidelines(version);
  const subsections: Record<string, string> = {};

  $("section#acknowledgements section").each((_, el) => {
    subsections[el.attribs.id] = $(".header-wrapper + *", el).html()!;
  });

  return subsections;
};

/**
 * Retrieves and processes a pinned WCAG version using published guidelines.
 */
export const getPrinciplesForVersion = async (version: WcagVersion) =>
  processPrinciples(await loadRemoteGuidelines(version));

/** Parses errata items from the errata document for the specified WCAG version. */
export const getErrataForVersion = async (version: WcagVersion) => {
  const $ = await loadFromFile(join("errata", `${version}.html`));
  const $guidelines = await loadRemoteGuidelines(version, false);
  const aSelector = `a[href*='#']:first-of-type`;
  const errata: Record<string, string[]> = {};

  $("main > section[id]")
    .last()
    .find(`li:has(${aSelector})`)
    .each((_, el) => {
      const $el = $(el);
      const $aEl = $el.find(aSelector);
      let hash: string | undefined = $aEl.attr("href")!.replace(/^.*#/, "");

      // Check whether hash pertains to a guideline/SC section or term definition;
      // if it doesn't, attempt to resolve it to one
      const $hashEl = $guidelines(`#${hash}`);
      if (!$hashEl.is("section.guideline, #terms dfn")) {
        const $closest = $hashEl.closest("#terms dd, section.guideline");
        if ($closest.is("#terms dd")) hash = $closest.prev().find("dfn[id]").attr("id");
        else hash = $closest.attr("id");
      }
      if (!hash) return;

      const erratumHtml = $el
        .html()!
        .replace(/^.*?<\/a>,?\s*/g, "")
        .replace(/^(\w)/, (_, p1) => p1.toUpperCase());
      if (hash in errata) errata[hash].push(erratumHtml);
      else errata[hash] = [erratumHtml];
    });

  return errata;
};
