import { POST } from "./apiClient";
import heimdalConfig from "../../config";

export const walletAutocomplete = ({
  queryString,
  system_id,
  event_id,
  user__merged_into = false,
  weez_removed = false
} = {}) => {
  if (
    system_id === undefined ||
    event_id === undefined ||
    queryString === undefined
  )
    throw new Error("missing parameters");
  return POST(
    "services",
    "GESUSERS/walletAutocomplete",
    {
      queryString,
      user__merged_into,
      weez_removed,
      event: event_id
    },
    {},
    { system_id }
  );
};

export const getBalances = ({ wallet_id, system_id, event_id } = {}) => {
  if (
    system_id === undefined ||
    event_id === undefined ||
    wallet_id === undefined
  )
    throw new Error("missing parameters");
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
  system_id,
  event_id
} = {}) => {
  if (
    system_id === undefined ||
    event_id === undefined ||
    wallet_src === undefined ||
    wallet_dst === undefined ||
    message === undefined ||
    amount === undefined
  )
    throw new Error("missing parameters");
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
  wallet_id,
  system_id,
  event_id,
  uid = null,
  short_tag = null
} = {}) => {
  if (
    system_id === undefined ||
    event_id === undefined ||
    wallet_id === undefined
  )
    throw new Error("missing parameters");
  return POST(
    "services",
    "GESUSERS/createPairing",
    {
      wallet: wallet_id,
      uid,
      short_tag
    },
    {},
    { system_id, event_id }
  );
};
