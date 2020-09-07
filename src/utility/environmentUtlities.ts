const environment = process.env.NODE_ENV;

export const isDevelopmentEnvironment = environment === 'development';
export const isProductionEnvironment = environment === 'production';

export const resolveEnvironmentVariableOrThrow = (key: string): string => {
    const value = process.env[key];

    if (!value) {
        throw new Error(
            `Expecting '${key}' environment variable to be available through environment variables`,
        );
    }

    return value;
};
