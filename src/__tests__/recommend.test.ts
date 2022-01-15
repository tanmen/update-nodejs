import {recommend} from "../recommend";
import {jest} from '@jest/globals';

jest.mock('all-node-versions');

describe('nominal', () => {
  it('should be recommended new version in lts', async () => {
    const version = await recommend('14.15.3', 'lts');
    expect(version).toBe('16.13.2')
  });

  it('should be recommended new version in all', async () => {
    const version = await recommend('14.15.3', 'all');
    expect(version).toBe('17.3.1')
  });

  it('should be recommended new version in major', async () => {
    const version = await recommend('14.15.3', 'major');
    expect(version).toBe('14.18.3')
  });

  it('should be recommended new version in minor', async () => {
    const version = await recommend('14.15.3', 'minor');
    expect(version).toBe('14.15.5')
  });
});
