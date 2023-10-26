jest.mock('../../src/services/riot-service', () => {
  return {
    RiotService: jest.fn().mockImplementation(() => {
      return {
        getPlayer: jest.fn().mockResolvedValue({
          data: {
            id: 'QPM6PHuLuCMuI4zA-1ezIKpI_Epj7fTObhwt47IhOhi_',
            accountId: 'vB2nsAKqpKjLu7Y8Y0zhinr2SbpWKjJo6Xw1sSD-ztM',
            puuid:
              'XjwBfnpRoWRIUAIAjMbE5cH8hzTseE_gtzhwAhIiFxmhf62xSX2-UBOTZkpQ1un6fbpEjll3gfiUQg',
            name: 'CACHOCOUDET',
            profileIconId: 3004,
            revisionDate: 1698345942885,
            summonerLevel: 185,
          },
        }),
        getPlayerRank: jest.fn().mockResolvedValue({
          data: [
            {
              leagueId: '57a1f398-38ce-3315-82c7-95c36634952d',
              queueType: 'RANKED_SOLO_5x5',
              tier: 'MASTER',
              rank: 'I',
              summonerId: 'QPM6PHuLuCMuI4zA-1ezIKpI_Epj7fTObhwt47IhOhi_',
              summonerName: 'CACHOCOUDET',
              leaguePoints: 147,
              wins: 187,
              losses: 173,
              veteran: true,
              inactive: false,
              freshBlood: false,
              hotStreak: true,
            },
          ],
        }),
        getMatchesByPlayerId: jest.fn().mockResolvedValue({
          data: ['BR1_2826686012', 'BR1_2826667263'],
        }),
        getMatchDetailsByMatchId: jest.fn().mockResolvedValue({
          data: {
            info: {
              gameDuration: 1234,
              queueId: 420,
              participants: [
                {
                  puuid:
                    'XjwBfnpRoWRIUAIAjMbE5cH8hzTseE_gtzhwAhIiFxmhf62xSX2-UBOTZkpQ1un6fbpEjll3gfiUQg',
                  assists: 1,
                  kills: 2,
                  deaths: 3,
                  totalMinionsKilled: 160,
                  challenges: {
                    visionScorePerMinute: 1.2,
                  },
                },
              ],
            },
          },
        }),
      };
    }),
  };
});
