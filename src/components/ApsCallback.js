import { useSearchParams } from "react-router-dom"
import { useState, useEffect, useRef  } from "react";
import GetHubs from "./GetHubs";

const ApsCallback = () => {
    const [searchParams] = useSearchParams();
    const [accessToken, setAccessToken] = useState(null);
    const hasFetched = useRef(false); // Ref to prevent multiple API calls

    const code = searchParams.get('code')

    const getThreeLeggedAccessToken = async(code) => {
        if (!code) {
            console.log('No authorization code found in URL');
        }
    
        const basicAuthHeader = btoa(`${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`);
    
        try {
            const response = await fetch('https://developer.api.autodesk.com/authentication/v2/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic ${basicAuthHeader}`, // Basic Auth Header
                },
                body: new URLSearchParams({
                    grant_type: 'authorization_code',
                    code: code, // Authorization code received
                    redirect_uri: process.env.REACT_APP_CALLBACK_URL,
                }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to exchange token');
            }
    
            const data = await response.json();
            console.log('Access Token:', data.access_token);
            console.log('Token Details:', data);
            setAccessToken(data.access_token); // Save the access token in state
    
        } catch (error) {
            console.error('Error exchanging token:', error.message);
        }
        
    };

    useEffect(() => {
        if (code && !hasFetched.current) { // Ensure it runs only once
            hasFetched.current = true;
            getThreeLeggedAccessToken(code);
        }
    }, [code]);


    return (
        <div>
            {accessToken ? (
                <GetHubs accessToken={accessToken} />
            ) : (
                <p>Fetching access token...</p>
            )}
        </div>
    )
}

export default ApsCallback;