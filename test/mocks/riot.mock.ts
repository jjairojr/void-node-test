jest.mock('../../src/services/riot-service', () => {
  return {
    RiotService: jest.fn().mockImplementation(() => {
      return {
        getPlayer: jest.fn().mockResolvedValue({
          data: {
            player: {
              id: 'wKc9f26Bs_lfbT23j8qACEfHYf4Q9YKex4nL6KXW98G4tg',
              accountId: 'DHEPkoIs18rQExe-pHnlg17oEcMqfl28lgqubuTvSQh2AfM',
              puuid:
                '8Z_bk4dCbyXmGaUvqptkG_g3dn0TmwdMOfmoFflD06AaJBm_ejGbdBNSsxP3F1iSQcSMNpIZxfn31w',
              name: 'brTT',
              profileIconId: 28,
              revisionDate: 1694066761000,
              summonerLevel: 53,
            },
          },
        }),
      };
    }),
  };
});
