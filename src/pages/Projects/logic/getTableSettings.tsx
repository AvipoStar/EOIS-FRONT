export const getTableSettings = (directions: any[]) => {
  return [
    {
      label: "№",
      key: "id",
    },
    {
      label: "Название",
      key: "nameProject",
    },
    {
      label: "Направление",
      key: "direction",
      unusualView: function (value: any): any {
        return directions.map((d: any) => d.id == value && d.name);
      },
    },
  ];
};
