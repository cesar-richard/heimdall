import { GET, POST } from "./apiResources";

export const search = ({
  queryString,
  event = 1,
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

export const batchRefill = ({
  walletIds,
  quantity,
  currency,
  kind = "set",
  refillKind = "Gratuités"
}) => {
  return POST(`wallets/batch_refill?id__in:${walletIds.join()}`, {
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
