import uniq from "lodash-es/uniq";

import { retrievePdfaTechniques } from "./pdfa";

const scopes = {
  pdfa: retrievePdfaTechniques,
};
type Scope = keyof typeof scopes;

async function retrieveScopes(selectedScopes: Scope[]) {
  console.log(`Retrieving data for ${selectedScopes.join(", ")}`);
  await Promise.all((selectedScopes as Scope[]).map((scope) => scopes[scope]()));
  console.log("Done.")
}

const [, filename, ...selectedScopes] = process.argv;
if (import.meta.filename !== filename)
  throw new Error("11ty/techniques/index.ts is intended to be run from the command line.");

if (selectedScopes.length) {
  if (selectedScopes.some((scope) => !(scope in scopes))) {
    console.error(`Invalid scope provided. Valid scopes: ${Object.keys(scopes).join(", ")}`);
    process.exit(1);
  }
  await retrieveScopes(uniq(selectedScopes) as Scope[]);
} else {
  await retrieveScopes(Object.keys(scopes) as Scope[]);
}
