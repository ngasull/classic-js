import * as esbuild from "npm:esbuild";

export const build = async (entryPoints: string[]): Promise<void> => {
  await esbuild.build({
    entryPoints,
    outbase: "src",
    outdir: "dist",
    bundle: true,
    minify: true,
    sourcemap: true,
    format: "esm",
    charset: "utf8",
  });
  await esbuild.stop();
};
