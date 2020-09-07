const environment = process.env.NODE_ENV;

export const isDevelopmentEnvironment = environment === 'development';
export const isProductionEnvironment = environment === 'production';

const resolveEnvironmentVariableOrThrow = (key: string): string => {
    const value = process.env[key];

    if (!value) {
        throw new Error(
            `Expecting '${key}' environment variable to be available through environment variables`,
        );
    }

    return value;
};

export const resolveDropboxApiKey = () =>
    resolveEnvironmentVariableOrThrow('REACT_APP_DROPBOX_API_KEY');

export const resolveDropboxApiSecret = () =>
    resolveEnvironmentVariableOrThrow('REACT_APP_DROPBOX_API_SECRET');

export const resolveDropboxFileName = () =>
    resolveEnvironmentVariableOrThrow('REACT_APP_DROPBOX_FILE_NAME');
