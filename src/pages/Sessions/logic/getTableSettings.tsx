export const getTableSettings = (
  sessions: any[]
) => {
  return [
    {
      label: "№",
      key: "id",
    },
    {
      label: "Место",
      key: "place",
    },
    {
      label: "Дата начала / Дата конца",
      key: "id",
      unusualView: function (value: any): any {
        return sessions.map((d: any) => d.id == value && `${d.dateStart} / ${d.dateEnd}`);
      },
    },
  ];
};
