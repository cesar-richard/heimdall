import { POST } from "./apiServices";
const { heimdalConfig } = window;

export const walletAutocomplete = ({
  queryString,
  user__merged_into=False,
  weez_removed=False,
  event=heimdalConfig.EVENT_ID
}) => {
  return POST("GESUSERS/walletAutocomplete", {
    queryString,
    user__merged_into,
    weez_removed,
    event
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
