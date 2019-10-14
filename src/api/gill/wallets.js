import { GET, POST } from "./apiResources";
import heimdalConfig from "../../config";

export const search = ({
  queryString,
  event = heimdalConfig.EVENT_ID,
  limit = 25,
  offset = 0,
  ordering = "id",
  user__merged_into = false,
  weez_removed = false
}) => {
  return GET("wallets", {
    event,
    limit,
    offset,
    ordering,
    search: queryString,
    user__merged_into,
    weez_removed
  });
};

export const find = ({ walletId }) => {
  return GET(`wallets/${walletId}`);
};

export const batchAccess = ({
  walletIds,
  quantity,
  zones,
  event = heimdalConfig.EVENT_ID,
  kind = "set",
  periods = [4]
}) => {
  return POST(`wallets/batch_access?id__in=${walletIds.join()}`, {
    action_set: [
      {
        zone_set: zones,
        quantity,
        kind,
        period_set: periods
      }
    ]
  });
};

export const batchRefill = ({
  walletIds,
  quantity,
  currency,
  kind = "set",
  refillKind = "Heimdal"
}) => {
  return POST(`wallets/batch_refill?id__in=${walletIds.join()}`, {
    action_set: [
      {
        currency,
        quantity,
        kind,
        refill_kind: refillKind
      }
    ]
  });
};

test
