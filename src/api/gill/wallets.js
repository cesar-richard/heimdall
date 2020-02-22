import { GET, POST } from "./apiClient";
import heimdalConfig from "../../config";

export const search = ({
  queryString,
  system_id,
  event_id,
  limit = 25,
  offset = 0,
  ordering = "id",
  user__merged_into = false,
  weez_removed = false
} = {}) => {
  if (
    system_id === undefined ||
    event_id === undefined ||
    queryString === undefined
  )
    throw new Error("missing parameters");
  return GET(
    "resources",
    "wallets",
    {
      event: event_id,
      limit,
      offset,
      ordering,
      search: queryString,
      user__merged_into,
      weez_removed
    },
    {},
    { system_id }
  );
};

export const find = ({ walletId, system_id }) => {
  return GET("resources", `wallets/${walletId}`, {}, {}, { system_id });
};

export const batchAccess = ({
  walletIds,
  quantity,
  zones,
  system_id,
  kind = "set",
  periods = [4]
} = {}) => {
  if (
    walletIds === undefined ||
    quantity === undefined ||
    zones === undefined ||
    system_id === undefined
  )
    throw new Error("missing parameters");
  return POST(
    "resources",
    `wallets/batch_access?id__in=${walletIds.join()}`,
    {
      action_set: [
        {
          zone_set: zones,
          quantity,
          kind,
          period_set: periods
        }
      ]
    },
    {},
    { system_id }
  );
};

export const batchRefill = ({
  walletIds,
  quantity,
  currency,
  system_id,
  kind = "set",
  refillKind = "Heimdall"
} = {}) => {
  if (
    walletIds === undefined ||
    quantity === undefined ||
    currency === undefined ||
    system_id === undefined
  )
    throw new Error("missing parameters");
  return POST(
    "resources",
    `wallets/batch_refill?id__in=${walletIds.join()}`,
    {
      action_set: [
        {
          currency,
          quantity,
          kind,
          refill_kind: refillKind
        }
      ]
    },
    {},
    { system_id }
  );
};
