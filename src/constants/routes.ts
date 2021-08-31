export const HOME = "/";
export const DETAILS = "/country/:name";

export const buildDetailsRoute = (name: string): string => {
  return `/country/${name}`;
};
