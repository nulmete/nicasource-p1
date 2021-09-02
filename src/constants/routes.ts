export const HOME = "/";
export const DETAILS = "/country/:name";
export const NOT_FOUND = "/404";

export const buildDetailsRoute = (name: string): string => {
  return `/country/${name}`;
};
