const {REACT_APP_CLIENT_ID, REACT_APP_CALLBACK_URL} = process.env;

const ApsLogin = () => {

    const onButtonClick = () => {
        const url = 'https://developer.api.autodesk.com/authentication/v2/authorize';
        const responseType = 'code';
        const scope = 'data:read';
        const authUrl = `${url}?response_type=${responseType}&client_id=${REACT_APP_CLIENT_ID}&redirect_uri=${REACT_APP_CALLBACK_URL}&scope=${scope}`;
        window.location.href = authUrl;
    }

    return (
        <>
            <button onClick={onButtonClick}>Autodesk Login</button>
        </>
    )
    
}

export default ApsLogin;