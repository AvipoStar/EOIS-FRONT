import { IPerfectTableSettings } from "../organelles/PerfectTable";
import "../styles/PerfectTableInfo.css";
export interface IPerfectTableInfo {
  table?: any[] | null;
  forDoubleClick?: (value: any) => void | null;
  tableSettings?: IPerfectTableSettings[] | null;
  height?: string;
}

export const PerfectTableInfo = (params: IPerfectTableInfo) => {
  const view = (
    tableItem: any,
    tableSettingsItem: IPerfectTableSettings
  ): any => {
    if (tableItem?.[tableSettingsItem.key]) {
      if (tableSettingsItem?.unusualView) {
        return tableSettingsItem?.unusualView(
          tableItem?.[tableSettingsItem.key]
        );
      } else {
        return tableItem?.[tableSettingsItem.key];
      }
    }
  };
  const doubleClick = (element: any) => {
    if (params?.forDoubleClick) {
      params?.forDoubleClick(element);
    }
  };
  return (
    <tbody>
      {params.table?.map((tableItem: any, id: number) => (
        <tr
          className={`PerfectTableInfo`}
          key={id}
          onDoubleClick={() => doubleClick(tableItem)}
        >
          {params?.tableSettings?.map(
            (tableSettingsItem: IPerfectTableSettings, id: number) => (
              <td
                className={`${tableSettingsItem?.className} PerfectTableInfo__td`}
                key={id}
              >
                <div className="PerfectTableInfo__Block">
                  <div className="PerfectTableInfo__Block__Value">
                    {view(tableItem, tableSettingsItem)}
                  </div>
                </div>
              </td>
            )
          )}
        </tr>
      ))}
    </tbody>
  );
};
