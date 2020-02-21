import { POST } from "./apiClient";
import heimdalConfig from "../../config";

export const walletAutocomplete = ({
  queryString,
  user__merged_into = false,
  weez_removed = false,
  system_id,
  event = heimdalConfig.EVENT_ID
}) => {
  return POST(
    "services",
    "GESUSERS/walletAutocomplete",
    {
      queryString,
      user__merged_into,
      weez_removed,
      event
    },
    {},
    { system_id }
  );
};

export const getBalances = ({ wallet_id, system_id, event_id }) => {
  return POST(
    "services",
    "GESUSERS/getBalances",
    {
      wallet_id
    },
    {},
    { system_id, event_id }
  );
};

export const transfer = ({
  wallet_src,
  wallet_dst,
  amount,
  message,
  system_id
}) => {
  return POST(
    "services",
    "GESUSERS/transfer",
    {
      wallet_src,
      wallet_dst,
      amount,
      message
    },
    {},
    { system_id, event_id }
  );
};

export const createPairing = ({
  wallet,
  system_id,
  event_id,
  uid = null,
  short_tag = null
}) => {
  return POST(
    "services",
    "GESUSERS/createPairing",
    {
      wallet,
      uid,
      short_tag
    },
    {},
    { system_id, event_id }
  );
};
