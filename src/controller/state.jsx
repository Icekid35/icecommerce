import { useReducer, createContext } from "react";
import fake from "../assets/fake.json";

export const DataContext = createContext();

export default function Wrapper({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    fake,
    cart: [],
    wishlist: [],
  });
  function reducer(state, action) {
    const { type, payload,quantity } = action;
    switch (type) {
      case "add-to-cart":
        if (state.cart.find((product) => product.id == payload.id)) {
            let update = state.cart.find((product) => product.id == payload.id);
          return {
            ...state,
              cart: [
                  ...state.cart.slice().splice(0, state.cart.indexOf(update)),
                {
                    ...update, quantity: update.quantity + 1,sizes:[...update.sizes, ...payload.sizes ?? 'default'],colors:[...update.colors, ...payload.colors ?? 'default']
                },
                ...state.cart.slice().splice(state.cart.indexOf(update)+ 1,state.cart.length - 1)
            ],
          };
        }
        return { ...state, cart: [{ ...payload, quantity: 1,sizes:payload.sizes ?? ['default'],colors:payload.colors ?? ['default'] }, ...state.cart] };

        break;
      case "decrease-cart":
        if (state.cart.find((product) => product.id == payload.id)) {
          let update = state.cart.find((product) => product.id == payload.id);
          return {
            ...state,
            cart: [
              
                ...state.cart.slice().splice(0, state.cart.indexOf(update)),
                {
                    ...update, quantity: update.quantity<=1 ?1:update.quantity - 1
                },
                ...state.cart.slice().splice(state.cart.indexOf(update)+ 1,state.cart.length - 1)
            ],
          };
        }

        return state;

        break;
      case "remove-from-cart":
        return {
          ...state,
          cart: [...state.cart.filter((product) => product.id != payload.id)],
        };

        break;
      case "custom-cart-quantity":
        let update = state.cart.find((product) => product.id == payload.id);
          return {
            ...state,
            cart: [
                ...state.cart.slice().splice(0, state.cart.indexOf(update)),
                {
                    ...update, quantity
                },
                ...state.cart.slice().splice(state.cart.indexOf(update)+ 1,state.cart.length - 1)
           ],
          };

        break;
      case "add-to-wishlist":
        return { ...state, wishlist: [{ ...payload }, ...state.wishlist] };


        break;
      case "remove-from-wishlist":
        return {
            ...state,
            wishlist: [...state.wishlist.filter((product) => product.id != payload.id)],
          };

        break;
      case "empty-cart":
        return {
          ...state,
          cart: [],
        };

        break;

      default:
        return state;

        break;
    }
  }

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
}