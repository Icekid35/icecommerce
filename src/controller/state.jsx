import { useReducer, createContext, useEffect, useState } from "react";
import reducer from "./reducer";
import fake from "../assets/fake.json";

export const DataContext = createContext();

export default function Wrapper({ children }) {
  const [runOnce] = useState(null);
  const [loadingText, setLoadingText] = useState("Loading...");
  const [state, dispatch] = useReducer(reducer, {
    shopProducts: [],
    user: {
      cart: [],
      wishlist: [],
    },
  });

  async function getProducts(times = 0) {
    let trialTimes = times;
    //     const response = await fetch('/get-products', {
    //       method: 'POST',
    //       headers: {
    //         "content-type":'text/json'
    //       }
    //     })
    //     if (!response.ok && trialTimes <= 2) {
    //      setLoadingText(response.statusText +  ' retrying...')
    //      return getProducts(trialTimes + 1)

    //     }
    //     if(trialTimes > 2) {
    //      setLoadingText( ' Something went wrong, Please try again later')
    // return
    //     }

    //     const products = await response.json()
    //     dispatch({type:'shopping-products',payload:products})
    setLoadingText("loaded")
    dispatch({ type: "shopping-products", payload: fake });
  }
  useEffect(() => {
    getProducts();
    const StoredUserData = window.localStorage.getItem("user");
    if (StoredUserData)
      dispatch({ type: "getUser", payload: JSON.parse(StoredUserData) });
 
  }, [runOnce]);
  useEffect(() => {
    const StoredUserData = window.localStorage.getItem("user");
    // alert(StoredUserData)

    if (JSON.parse(StoredUserData)?.name && !state.user?.name) return () => {};
    // alert(2)
    window.localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {loadingText != "loaded" ? (
        <div className="place-holder-loading">
          <div />
          {loadingText}
        </div>
      ) : (
        children
      )}
    </DataContext.Provider>
  );
}
