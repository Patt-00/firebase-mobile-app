import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Login from "./Login";
import Home from "./Home";

export default function App() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Firebase tells us whenever someone logs in or out
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setChecking(false);
    });
    return unsubscribe;
  }, []);

  // Wait until Firebase has checked for a saved login
  if (checking) {
    return <div className="screen"><p>Loading...</p></div>;
  }

  return user ? <Home user={user} /> : <Login />;
}
