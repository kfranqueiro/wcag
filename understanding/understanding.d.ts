export interface UnderstandingAssociatedTechniqueEntry {
  id?: string;
  title?: string;
}

interface UnderstandingAssociatedTechniqueUsingMixin {
  skipUsingText?: boolean;
  using: UnderstandingAssociatedTechniqueArray;
  usingConjunction?: string;
  usingPrefix?: string;
  usingQuantity?: string;
}

interface UnderstandingAssociatedTechniqueEntryWithUsing
  extends UnderstandingAssociatedTechniqueEntry,
    UnderstandingAssociatedTechniqueUsingMixin {}

interface UnderstandingAssociatedTechniqueConjunction {
  and: Array<string | UnderstandingAssociatedTechniqueEntry>;
  andConjunction?: string;
}

interface UnderstandingAssociatedTechniqueConjunctionWithUsing
  extends UnderstandingAssociatedTechniqueConjunction,
    UnderstandingAssociatedTechniqueUsingMixin {}

/** Represents either type of associated technique entry that contains `using` */
export type UnderstandingAssociatedTechniqueParent =
  | UnderstandingAssociatedTechniqueEntryWithUsing
  | UnderstandingAssociatedTechniqueConjunctionWithUsing;

type UnderstandingAssociatedTechniqueArrayElement =
  | string
  | UnderstandingAssociatedTechniqueEntry
  | UnderstandingAssociatedTechniqueConjunction
  | UnderstandingAssociatedTechniqueParent;

/** Array of shorthand strings or objects defining associated techniques */
export type UnderstandingAssociatedTechniqueArray = UnderstandingAssociatedTechniqueArrayElement[];

/** An associated technique that has already been run through expandTechniqueToObject */
export type ResolvedUnderstandingAssociatedTechnique = Exclude<
  UnderstandingAssociatedTechniqueArray[number],
  string
>;

/** A top-level section (most commonly used to define multiple situations) */
export interface UnderstandingAssociatedTechniqueSection {
  title: string;
  groups?: Array<{
    id: string;
    title: string;
    techniques: UnderstandingAssociatedTechniqueArray;
  }>;
  techniques: UnderstandingAssociatedTechniqueArray;
  note?: string;
}

/** Object defining various types of techniques for a success criterion */
interface UnderstandingAssociatedTechniques {
  advisory?: UnderstandingAssociatedTechniqueArray;
  failure?: UnderstandingAssociatedTechniqueArray;
  sufficient?: UnderstandingAssociatedTechniqueSection[] | UnderstandingAssociatedTechniqueArray;
  sufficientIntro?: string;
  sufficientNote?: string;
}

export type UnderstandingAssociatedTechniquesMap = Record<string, UnderstandingAssociatedTechniques>;
