import {
    redirectToAuthenticate,
    fetchAccessToken,
} from './../../../storage/dropbox/dropboxClient';
import { parseQueryString } from '../../../utility/requestUtilities';
import { useState, useEffect } from 'react';
import {
    get as getTokenFromStorage,
    save as writeToStorage,
} from '../../../model/repository/accessTokenRepository';

export default function useResolveAccessTokenOrRedirect() {
    const [redirecting, setRedirecting] = useState<boolean>(false);
    const [fetching, setFetching] = useState<boolean>(false);

    const [accessToken, setAccessToken] = useState<string | null>(
        getTokenFromStorage(),
    );

    // store access token in storage for future requests
    useEffect(() => {
        if (accessToken) {
            writeToStorage(accessToken);
        }
    }, [accessToken]);

    const { code } = parseQueryString(window.location.search);

    const redirectUri = location.origin;

    // on mount, check if there is an access token or a code to fetch it
    useEffect(() => {
        if (accessToken || fetching) {
            return;
        }

        if (code) {
            if (Array.isArray(code)) {
                throw new Error('Expecting code to be of type string');
            }

            setFetching(true);

            fetchAccessToken(code, redirectUri)
                .then((token) => setAccessToken(token))
                .catch((error) => {
                    console.error(
                        'Something went wrong fetching the access token',
                        error,
                    );
                })
                .finally(() => setFetching(false));
        } else {
            setRedirecting(true);
            redirectToAuthenticate(redirectUri);
        }
    }, []);

    return { accessToken, redirecting };
}