declare module "all-node-versions" {
  export type Major = {
    major: number,
    latest: string,
    lts?: string
  };
  export type AllNodeVersions = () => Promise<{
    versions: string[];
    majors: Major[];
  }>

  const versions: AllNodeVersions;

  export default versions;
}
