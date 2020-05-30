import {
  ConfigurationManager,
  IConfigurationManager,
} from "./configurationManager";

class EosioConfiguration extends ConfigurationManager<{ url: string }> {
  /**
   *
   */
  constructor(options: { url: string }) {
    super(options);
    this.addConfiguration("url", options.url);
  }

  get utl(): string {
    return this.configuration['url']
  }
}

export const createEosioConfiguration = (): IConfigurationManager => {
  return new EosioConfiguration({
    url: "http://127.0.0.1:8888",
  });
};