import allNodeVersions, {Major} from 'all-node-versions';

import {MODE} from "./types";

export const recommend = async (version: string, mode: MODE = 'lts'): Promise<string> => {
  const {majors, versions} = await allNodeVersions()
  switch (mode) {
    case 'lts':
      return recommendLtsVersion(majors);
    case 'all':
      return recommendAllVersion(majors);
    case 'major':
      return recommendMajorVersion(majors, version);
    case 'minor':
      return recommendMinorVersion(versions, version);
  }
  throw new Error(`Invalid mode. [${mode}]`);
}

const recommendLtsVersion = (majors: Major[]) =>
  majors.filter(major => major.lts)
    .reduce(compareToMajor).latest;

const recommendAllVersion = (majors: Major[]) =>
  majors.reduce(compareToMajor).latest;

const recommendMajorVersion = (majors: Major[], version: string) => {
  const major = Number(version.split('.').reduce((pre, cur, index) => index === 0 ? cur : pre))
  const recommendVersion = majors.find(m => m.major === major);
  if (!recommendVersion) {
    throw new Error(`Invalid major version. [${major}]`);
  }
  return recommendVersion.latest;
}

const recommendMinorVersion = (versions: string[], version: string) => {
  const prefix = version.split('.').filter((_, index, versions) => index + 1 < versions.length)
    .reduce((pre, cur) => [pre, cur].join('.'));
  const patch = versions.filter(v => v.startsWith(prefix))
    .reduce((pre, cur) => {
      const patch = Number(cur.replace(`${prefix}.`, ''));
      return patch > pre ? patch : pre;
    }, 0)

  return [prefix, patch].join('.')
}

const compareToMajor = (pre: Major, cur: Major) => pre.major < cur.major ? cur : pre;
