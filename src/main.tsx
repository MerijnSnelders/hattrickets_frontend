import { createRoot } from 'react-dom/client'
import "./styles/global.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

import App from './App.tsx'

createRoot(document.getElementById('root')!).render( 
    <GoogleOAuthProvider clientId="470943653508-sb09ekl3nkmhsham3clnk50anv7fs6cn.apps.googleusercontent.com">
        <App />
    </GoogleOAuthProvider>
)
