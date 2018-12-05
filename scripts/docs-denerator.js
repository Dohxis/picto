const fs = require("async-file");

async function addFullReadmes(docs) {
  const withReadmes = { ...docs };
  for (let i = 0; i < withReadmes.components.length; i++) {
    const { readmePath } = withReadmes.components[i];
    const readmeFile = await fs.readTextFile(readmePath);
    withReadmes.components[i]["fullReadme"] = readmeFile;
  }
  return withReadmes;
}

async function addLibraryVersion(docs) {
  const withLibraryVersion = { ...docs };
  let packageFile = await fs.readTextFile("package.json");

  packageFile = await JSON.parse(packageFile);
  if (withLibraryVersion["library"] === undefined) {
    withLibraryVersion["library"] = {};
  }
  withLibraryVersion["library"]["version"] = packageFile["version"];
  return withLibraryVersion;
}

async function docsRenderer(json) {
  let generatedDocs = { ...json };
  generatedDocs = await addFullReadmes(generatedDocs);
  generatedDocs = await addLibraryVersion(generatedDocs);
  await fs.writeTextFile("docs/components.json", JSON.stringify(generatedDocs));
}

exports.docsRenderer = docsRenderer;
