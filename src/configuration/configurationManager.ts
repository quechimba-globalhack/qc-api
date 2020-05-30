export interface IConfigurationManager {
  get: (key: string) => string;
}

export class ConfigurationManager<T> implements IConfigurationManager {
  private configuration: {[key:string]: string} = {}
  /**
   *
   */
  constructor(options: T) {
  }

  public get(key: string): string {
      return this.configuration[key];
  }

  protected addConfiguration(key: string, value: string): void {
      this.configuration[key] = value;
  }
}