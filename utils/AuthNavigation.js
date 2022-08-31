import React, { useEffect, useState } from "react";
import { SignedInStack, SignedOutStack } from "./navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";

export default function AuthNavigation() {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        user ? setCurrentUser(user) : setCurrentUser(null);
      }),
    []
  );

  return <>{currentUser ? <SignedInStack /> : <SignedOutStack />}</>;
}
