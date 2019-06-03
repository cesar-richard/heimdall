import { createFetchReducer } from './fetchReducer';
import { createBlockReducer } from './blockedReducer';
export default {
  fundations: createFetchReducer('FUNDATION'),
  blocked: createBlockReducer(),
}
