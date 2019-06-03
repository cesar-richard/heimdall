import { createFetchAction } from './fetchAction';

import { fundations } from '../../api/gill/resources';

export const getFundations = () => createFetchAction('FUNDATION', () => fundations());
