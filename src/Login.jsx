import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "./firebase";


// Turn Firebase error codes into messages a user understands
function friendlyMessage(code) {
  switch (code) {
    case "auth/invalid-email": return "That email address is not valid.";
    case "auth/missing-password": return "Please enter your password.";
    case "auth/invalid-credential": return "Wrong email or password.";
    case "auth/email-already-in-use": return "That email already has an account. Try logging in.";
    case "auth/weak-password": return "Password needs at least 6 characters.";
    case "auth/operation-not-allowed": return "This sign-in method is not turned on in Firebase.";
    case "auth/network-request-failed": return "No internet connection.";
    case "auth/popup-closed-by-user":
    case "auth/cancelled-popup-request": return "Sign-in was cancelled.";
    case "auth/popup-blocked": return "Your browser blocked the sign-in window. Allow pop-ups and try again.";
    case "auth/account-exists-with-different-credential": return "This email is already used with another sign-in method. Use that method instead.";
    case "auth/unauthorized-domain": return "This web address is not allowed for sign-in. Open the app from localhost or your hosted address.";
    default: return "Something went wrong. Please try again.";
  }
}


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handle(isNew) {
    setError("");
    setLoading(true);
    try {
      if (isNew) {
        await createUserWithEmailAndPassword(auth, email.trim(), password);
      } else {
        await signInWithEmailAndPassword(auth, email.trim(), password);
      }
    } catch (e) {
      setError(friendlyMessage(e.code));
    }
    setLoading(false);
  }

  function handleSubmit(e) {
    e.preventDefault(); // stop the page from reloading
    handle(false);      // pressing Enter or Go on the phone keyboard = Log in
  }
    async function handleSocial(provider) {
    setError("");
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
    } catch (e) {
      setError(friendlyMessage(e.code));
    }
    setLoading(false);
  }


  return (
    <div className="screen">
      <form className="card" onSubmit={handleSubmit}>
        <h1>Welcome</h1>

        <input
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          autoComplete="current-password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Please wait..." : "Log in"}
        </button>
        <button
          type="button"
          className="secondary"
          disabled={loading}
          onClick={() => handle(true)}
        >
          Sign up
        </button>
                <p className="divider">or</p>
        <button
          type="button"
          className="google"
          disabled={loading}
          onClick={() => handleSocial(new GoogleAuthProvider())}
        >
          Continue with Google
        </button>

      </form>
    </div>
  );
}
