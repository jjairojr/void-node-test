import axios from 'axios';
import { env } from '../env';

export function getApi(region: string) {
  return axios.create({
    baseURL: `https://${region}.api.riotgames.com/lol`,
    headers: {
      'X-Riot-Token': env.RIOT_API_KEY,
    },
  });
}
