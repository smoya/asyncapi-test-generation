import Generator from '@asyncapi/generator'; // Version 1.14.1
import path from 'path';
import fsPromises from 'fs/promises';

const main = async () => {
  const yamlFile = await fsPromises.readFile(
    path.resolve(process.cwd(), './asyncapi.yaml'),
    "utf-8",
  );

  await generateWithTemplateVersion('1.0.0', yamlFile);
  await generateWithTemplateVersion('0.28.4', yamlFile);
};

main();

async function generateWithTemplateVersion(version, yamlFile) {
  const generator = new Generator(
    `html-template-${version}`,
    path.resolve(process.cwd(), `./out/${version}`),
    {forceWrite: true}
  );
  
  await generator.generate(yamlFile);
}
