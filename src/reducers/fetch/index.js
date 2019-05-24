import { createFetchReducer } from "./fetchReducer";
export default {
  wallets: createFetchReducer("WALLETS")
};
