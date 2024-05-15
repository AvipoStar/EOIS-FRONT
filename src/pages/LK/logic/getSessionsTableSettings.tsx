export const getSessionsTableSettings = (profiles: any[], sessions: any) => {
  return [
    {
      label: "Сессия",
      key: "session_id",
      unusualView: function (value: any): any {
        return sessions.map(
          (s: any) => s.id == value && `${s.place} ${s.dateStart} ${s.dateEnd}`
        );
      },
    },
    {
      label: "Номер фирмы",
      key: "firm_number",
    },
    {
      label: "Название фирмы",
      key: "firm_name",
    },
    {
      label: "Профиль",
      key: "id_profile",
      unusualView: function (value: any): any {
        return profiles.map((p: any) => p.id == value && p.nameProfile);
      },
    },
  ];
};
