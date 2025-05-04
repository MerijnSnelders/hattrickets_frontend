// import { useState } from "react";
// import { GoogleLogin } from "@react-oauth/google";
// import axios from "axios";

// const LoginPage = () => {

//   const handleEmailLogin = async () => {
//     try {
//       const res = await axios.post("http://localhost:8080/auth/login", {
//         email,
//         password,
//       });
//       alert("Login successful: " + JSON.stringify(res.data));
//     } catch (err: any) {
//       alert("Login failed: " + (err.response?.data?.message || err.message));
//     }
//   };

//   const handleGoogleLogin = async (credentialResponse: any) => {
//     try {
//       const res = await axios.post("http://localhost:8080/auth/google", {
//         token: credentialResponse.credential,
//       });
//       alert("Google login success: " + JSON.stringify(res.data));
//     } catch (err: any) {
//       alert("Google login failed: " + (err.response?.data?.message || err.message));
//     }
//   };

//   return (
//     <div style={{ maxWidth: "400px", margin: "100px auto", textAlign: "center", background: "#244724"}}>
//       <h2>SIGN IN TO HATTRICKETS</h2>
//       <p>Welcome user, please sign in to continue</p>

//       <div style={{ marginBottom: "20px" }}>
//         <GoogleLogin onSuccess={handleGoogleLogin} onError={() => alert("Google Login Error")} />
//       </div>

//       <div style={{ margin: "20px 0", display: "flex", alignItems: "center" }}>
//         <hr style={{ flex: 1 }} />
//         <span style={{ margin: "0 10px" }}>or</span>
//         <hr style={{ flex: 1 }} />
//       </div>

//       <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           style={{ padding: "10px", fontSize: "16px" }}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           style={{ padding: "10px", fontSize: "16px" }}
//         />
//         <button onClick={handleEmailLogin} style={{ padding: "10px", fontSize: "16px" }}>
//           Sign In
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
