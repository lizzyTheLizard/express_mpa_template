interface Config {
  env: string;
  port: number;
  morgan: {
    format: string;
  };
  logLevel: string;
}

const defaultConfig = {
  port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  morgan: {
    format: 'tiny',
  },
};

const development: Config = {
  env: 'development',
  logLevel: 'debug',
  ...defaultConfig,
};

const test: Config = {
  env: 'test',
  logLevel: 'info',
  ...defaultConfig,
};

const production: Config = {
  env: 'production',
  logLevel: 'info',
  ...defaultConfig,
};

const environments = new Map<string, Config>([
  ['development', development],
  ['test', test],
  ['production', production],
]);

const env = process.env.NODE_ENV;
if (!env) {
  throw new Error('No environment defined');
}
export const config: Config = environments.get(env) as Config;
