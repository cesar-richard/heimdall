import { GET } from "./apiResources";

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

export const find = ({
  walletId
}) => {
  return GET(`wallets/${walletId}`);
};
