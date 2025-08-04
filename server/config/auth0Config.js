import {auth} from 'express-oauth2-jwt-bearer'

const jwtCheck = auth({
    audience: "http://localhost:8000",
    issuerBaseURL: "YOUR_AUTH0_DOMAIN",
    tokenSigningAlg:"RS256",
});

export default jwtCheck;