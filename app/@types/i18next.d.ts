import resources from "./resources.ts";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "en";
    resources: typeof resources;
  }
}
