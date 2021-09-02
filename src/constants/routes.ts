export const HOME = "/";
export const DETAILS = "/country/:name";
export const NOT_FOUND = "/404";

export const buildHomeRoute = (): string => {
  return process.env.NODE_ENV === "production" ? `/nicasource-p1` : HOME;
};

export const buildDetailsRoute = (name: string): string => {
  return `/country/${name}`;
};
