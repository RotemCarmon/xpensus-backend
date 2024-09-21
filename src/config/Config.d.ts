export interface SpecificConfig {
  env: string;
  db: Record<string, any>;
}

export type Config = SpecificConfig & Record<string, any>;
