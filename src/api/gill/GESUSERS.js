import { POST } from "./apiServices";
import heimdalConfig from "../../config";

export const walletAutocomplete = ({
  queryString,
  user__merged_into = false,
  weez_removed = false,
  event = heimdalConfig.EVENT_ID
}) => {
  return POST("GESUSERS/walletAutocomplete", {
    queryString,
    user__merged_into,
    weez_removed,
    event
  });
};

export const getBalances = ({ wallet_id }) => {
  return POST("GESUSERS/getBalances", {
    wallet_id
  });
};

export const transfer = ({ wallet_src, wallet_dst, amount, message }) => {
  return POST("GESUSERS/transfer", {
    wallet_src,
    wallet_dst,
    amount,
    message
  });
};

export const createPairing = ({ wallet, uid = null, short_tag = null }) => {
  return POST("GESUSERS/createPairing", {
    wallet,
    uid,
    short_tag
  });
};
