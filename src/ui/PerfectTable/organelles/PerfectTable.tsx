import '../styles/PerfectTable.css'
import { useEffect, useState } from "react"
import { PerfectTableHeader } from "../molecules/PerfectTableHeader"
import { PerfectTableInfo } from '../molecules/PerfectTableInfo'

export interface IPerfectTableSettings {
    label: string   //отображаемый название
    key: string  //ключ
    className?: string  //ключ
    unusualView?: (value: any) => JSX.Element //необычный вывод
    sort?: boolean | null   //сортировка вверх или вниз
    possibilitySort?: boolean   //необычный вывод
    disableDoubleTap?: boolean  //блокировка двойного нажатия по элементу
}

export interface IPerfectTable {
    nameTable: string;
    table: any[];
    tableSettings: IPerfectTableSettings[];
    forDoubleClick?: (value: any) => void | null;
    className?: string
    height?: string
}

export const PerfectTable = (params: IPerfectTable) => {
    const [tableSettings, setTableSettings] = useState<IPerfectTableSettings[] | null>()
    const [table, setTable] = useState<any[] | null>()

    const keyDefinitionFunction = (key: string) => 
    {
        let side: boolean | null = null;
        setTableSettings(tableSettings?.map((e: any) => 
        {
            if (e.key === key) 
            {
                side = e.sort == null ? true : !(e.sort);
                return { ...e, sort: e.sort == null ? true : !(e.sort) }
            } else {
                return { ...e, sort: null }
            }
        }))
        setTable(sortStateByKey(key, side, table))
    }

    const sortStateByKey = (key: string, side: boolean | null, state: any): any => 
    {
        if (state && state.length > 0) 
        {
            const sortedState = [...state].sort((a, b) => 
            {
                const valueA = key && a.hasOwnProperty(key) ? a[key] : '';
                const valueB = key && b.hasOwnProperty(key) ? b[key] : '';

                const isNumericStringA = typeof valueA === 'string' && /^\d+$/.test(valueA);
                const isNumericStringB = typeof valueB === 'string' && /^\d+$/.test(valueB);

                if ((isNumericStringA && isNumericStringB) && Number(valueA) < Number(valueB)) 
                {
                    return side ? 1 : -1;
                }
                if ((isNumericStringA && isNumericStringB) && Number(valueA) > Number(valueB)) 
                {
                    return side ? -1 : 1;
                }

                if (isNumericStringA && !isNumericStringB) 
                {
                    return side ? 1 : -1;
                }

                if (!isNumericStringA && isNumericStringB) 
                {
                    return side ? -1 : 1;
                }

                if (valueA < valueB) {
                    return side ? 1 : -1;
                }

                if (valueA > valueB) {
                    return side ? -1 : 1;
                }

                return 0;
            });
            return sortedState;
        }

        return state;
    };

    useEffect(() => 
    {
        if (params.tableSettings) {
            setTableSettings(params.tableSettings)
        }
    }, [params.tableSettings])

    useEffect(() => {
        if (params.table) 
        {
            let side: boolean | null = null;
            let key: string | null = null;
            tableSettings?.map((e: any) => 
            {
                if (e.sort !== null) {
                    side = e.sort;
                    key = e.key;
                }
            })
            key !== null && side !== null ? setTable(sortStateByKey(key, side, params.table)) : setTable(params.table)
        }
    }, [params.table])

    return (
        <table className={`${params?.className} PerfectTable`}>
            {tableSettings && 
            <PerfectTableHeader 
                tableSettings={tableSettings} 
                keyDefinitionFunction={keyDefinitionFunction} 
            />}
            {tableSettings && table && 
            <PerfectTableInfo 
                tableSettings={tableSettings} 
                table={table} 
                forDoubleClick={params.forDoubleClick} 
                height={params.height}
            />}
        </table>
    );
};
