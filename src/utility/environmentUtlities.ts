const environment = process.env.NODE_ENV;

export const isDevelopmentEnvironment = environment === 'development';
export const isProductionEnvironment = environment === 'production';
