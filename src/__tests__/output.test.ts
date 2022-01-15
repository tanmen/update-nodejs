import {readFile, writeFile} from "fs/promises";
import {dirname, join} from "path";
import {output, SupportedManagers} from "../output";

const __dir = dirname(new URL(import.meta.url).pathname)

beforeEach(async () => {
  for (const filename of Object.values(SupportedManagers)) {
    writeFile(join(__dir, 'output', filename), '16.13.1');
  }
});

describe('nominal', () => {
  it('should be update version files', async () => {
    const version = '0.0.0';
    const path = join(__dir, 'output');
    await output(path, version);
    for (const filename of Object.values(SupportedManagers)) {
      expect(await readFile(join(path, filename), {encoding: 'utf-8'})).toBe(version);
    }
  });
});
