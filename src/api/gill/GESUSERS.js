import { POST } from "./apiServices";

export const walletAutocomplete = ({
  queryString
}) => {
  return POST("GESUSERS/walletAutocomplete", {
    queryString
  });
};

export const getBalances = ({
  wallet_id
}) => {
  return POST("GESUSERS/getBalances", {
    wallet_id
  });
};

export const transfer = ({
  wallet_src,
  wallet_dst,
  amount,
  message
}) => {
  return POST("GESUSERS/transfer", {
    wallet_src,
    wallet_dst,
    amount,
    message
  });
};
