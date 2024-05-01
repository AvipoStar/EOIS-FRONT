export const getTasksTableSettings = (
  priorities: any[],
) => {
  return [
    {
      label: "Номер",
      key: "id",
    },
    {
      label: "Название",
      key: "name",
    },
    {
      label: "Приоритет",
      key: "priority",
      unusualView: function (value: any): any {
        return priorities.map((p: any) => p.id == value && p.name);
      },
    },
    // {
    //   label: "Готово",
    //   key: "id",

    // },
  ];
};
