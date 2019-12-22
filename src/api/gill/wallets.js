import { GET, POST } from "./apiResources";
import heimdalConfig from "../../config";

export const search = ({
  queryString,
  system_id,
  event = heimdalConfig.EVENT_ID,
  limit = 25,
  offset = 0,
  ordering = "id",
  user__merged_into = false,
  weez_removed = false
}) => {
  return GET(
    "wallets",
    {
      event,
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
  return GET(`wallets/${walletId}`, {}, {}, { system_id });
};

export const batchAccess = ({
  walletIds,
  quantity,
  zones,
  system_id,
  event = heimdalConfig.EVENT_ID,
  kind = "set",
  periods = [4]
}) => {
  return POST(
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
  refillKind = "Heimdal"
}) => {
  return POST(
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
