import { useReducer, createContext, useEffect, useState } from "react";
import fake from "../assets/fake.json";
import reducer from "./reducer";

export const DataContext = createContext();

export default function Wrapper({ children }) {
  const [runOnce] = useState(null);
  const [state, dispatch] = useReducer(reducer, {
    shopProducts: fake,
    user: {
      cart: [],
      wishlist: [],
    },
  });

  useEffect(() => {
    const StoredUserData = window.localStorage.getItem("user");
    if (StoredUserData)
      dispatch({ type: "getUser", payload: JSON.parse(StoredUserData) });
  }, [runOnce]);
  useEffect(() => {
    const StoredUserData = window.localStorage.getItem("user");
    if (JSON.parse(StoredUserData)?.name && !state.user?.name) return () => {};

    window.localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
}
