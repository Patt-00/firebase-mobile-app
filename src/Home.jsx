import { signOut } from "firebase/auth";
import { auth } from "./firebase";

const PROVIDER_NAMES = {
  password: "Email and password",
  "google.com": "Google",
  "facebook.com": "Facebook",
};

export default function Home({ user }) {
  const providerId = user.providerData[0]?.providerId;

  return (
    <div className="screen">
      <div className="card">
        <h1>You are logged in</h1>

        {user.photoURL && (
          <img
            className="avatar"
            src={user.photoURL}
            alt="Profile"
            referrerPolicy="no-referrer"
          />
        )}

        <p className="label">Name</p>
        <p className="value">{user.displayName || "(no name)"}</p>

        <p className="label">Email</p>
        <p className="value">{user.email}</p>

        <p className="label">Signed in with</p>
        <p className="value">{PROVIDER_NAMES[providerId] || providerId}</p>

        <p className="label">User ID</p>
        <p className="value">{user.uid}</p>

        <button className="danger" onClick={() => signOut(auth)}>
          Log out
        </button>
      </div>
    </div>
  );
}
