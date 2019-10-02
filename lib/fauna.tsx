import { query, Client } from 'faunadb';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

const parentClient = new Client({ secret: publicRuntimeConfig.FAUNA_DB_SECRET || '' });
const db = publicRuntimeConfig.FAUNA_DB_NAME || '';
const subSecret = publicRuntimeConfig.FAUNA_SUB_DB_SECRET;

export const q = query;
export const client: Promise<Client> = subSecret
  ? new Promise(resolve => resolve(new Client({ secret: subSecret })))
  : parentClient
      .query(q.Get(q.Match(q.Index('_keys_by_name'), db)))
      .then((resp: { data?: { secret?: string } }) => {
        if (resp.data && resp.data.secret) {
          return new Client({ secret: resp.data.secret });
        } else {
          throw Error('No secret');
        }
      })
      .catch(() => {
        return new Client({ secret: '' });
      });
