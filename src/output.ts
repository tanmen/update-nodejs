import {readdir, writeFile} from "fs/promises";
import {join} from "path";

export const SupportedManagers = {
  nodenv: '.node-version',
  nvm: '.nvmrc'
}

export const output = async (path: string, version: string) => {
  const files = await readdir(path).then(paths => paths.filter(p => Object.values(SupportedManagers).includes(p)));
  const processes = [];
  if (files.includes(SupportedManagers.nodenv)) {
    processes.push(writer(join(path, SupportedManagers.nodenv), version));
  }
  if (files.includes(SupportedManagers.nvm)) {
    processes.push(writer(join(path, SupportedManagers.nvm), version));
  }
  await Promise.all(processes);
};

const writer = (path: string, version: string) =>
  writeFile(path, version);
