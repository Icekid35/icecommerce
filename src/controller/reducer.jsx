export default   function reducer(state, action) {
    const { type, payload, quantity,size,color } = action;

   
    switch (type) {
      case 'getUser':
        return {
          ...state,
          user: {
            ...payload,
          }
        }
        break;
      case 'login':
        return {
          ...state,
          user: {
            ...state.user,
            ...payload,
          }
        }
        break;
      case "add-to-cart":
        if (state.user.cart.find((product) => product.id == payload.id)) {
          let update = state.user.cart.find(
            (product) => product.id == payload.id
          );
          return {
            ...state,
            user: {
              ...state.user,
              cart: [
                ...state.user.cart
                  .slice()
                  .splice(0, state.user.cart.indexOf(update)),
                {
                  ...update,
                  quantity: update.quantity + 1,
                  sizes: [...update.sizes,(size ?? "default")],
                  colors: [...update.colors,(color ?? "default")],
                },
                ...state.user.cart
                  .slice()
                  .splice(
                    state.user.cart.indexOf(update) + 1,
                    state.user.cart.length - 1
                  ),
              ],
            },
          };
        }
        return {
          ...state,
          user: {
            ...state.user,

            cart: [
              {
                ...payload,
                quantity: 1,
                sizes: payload.sizes ?? ["default"],
                colors: payload.colors ?? ["default"],
              },
              ...state.user.cart,
            ],
          },
        };

        break;
      case "decrease-cart":
        if (state.user.cart.find((product) => product.id == payload.id)) {
          let update = state.user.cart.find(
            (product) => product.id == payload.id
          );
          return {
            ...state,
            user: {
              ...state.user,
              cart: [
                ...state.user.cart
                  .slice()
                  .splice(0, state.user.cart.indexOf(update)),
                {
                  ...update,
                  quantity: update.quantity <= 1 ? 1 : update.quantity - 1,
                },
                ...state.user.cart
                  .slice()
                  .splice(
                    state.user.cart.indexOf(update) + 1,
                    state.user.cart.length - 1
                  ),
              ],
            },
          };
        }

        return state;

        break;
      case "remove-from-cart":
        return {
          ...state,
          user: {
            ...state.user,
            cart: [
              ...state.user.cart.filter((product) => product.id != payload.id),
            ],
          },
        };

        break;
      case "custom-cart-quantity":
        let update = state.user.cart.find(
          (product) => product.id == payload.id
        );
        return {
          ...state,
          user: {
            ...state.user,
            cart: [
              ...state.user.cart
                .slice()
                .splice(0, state.user.cart.indexOf(update)),
              {
                ...update,
                quantity,
              },
              ...state.user.cart
                .slice()
                .splice(
                  state.user.cart.indexOf(update) + 1,
                  state.user.cart.length - 1
                ),
            ],
          },
        };

        break;
      case "add-to-wishlist":
        return {
          ...state,
          user: {
            ...state.user,
            wishlist: [{ ...payload }, ...state.user.wishlist],
          },
        };

        break;
      case "remove-from-wishlist":
        return {
          ...state,
          user: {
            ...state.user,
            wishlist: [
              ...state.user.wishlist.filter(
                (product) => product.id != payload.id
              ),
            ],
          },
        };

        break;
      case "empty-cart":
        return {
          ...state,
          user: {
            cart: [],
          },
        };

        break;

      default:
        return state;

        break;
    }
  }