import { build } from "./src/build.ts";

if (import.meta.main) {
  await build(["src/dom.ts"]);
}
