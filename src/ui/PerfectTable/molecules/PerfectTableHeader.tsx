import '../styles/PerfectTableHeader.css'
import { IPerfectTableSettings } from "../organelles/PerfectTable";
import PerfectTableNull from "../../../Common/assets/icons/PerfectTableNull.svg"
import PerfectTableTrue from '../../../Common/assets/icons/PerfectTableTrue.svg'
import PerfectTableFalse from '../../../Common/assets/icons/PerfectTableFalse.svg'

export interface IPerfectTableHeader {
    tableSettings?: IPerfectTableSettings[] | null
    keyDefinitionFunction: (key: string) => void
}

export const PerfectTableHeader = (params: IPerfectTableHeader) => {
    return (
        <thead>
            <tr className={`PerfectTableHeader__BackgroundBlock`}>
            </tr>
            <tr className={`PerfectTableHeader`}>
                {params?.tableSettings?.map((e: IPerfectTableSettings, id: number) =>
                    <th 
                        key={id} 
                        className={`PerfectTableHeaderItem__th PerfectTableHeaderItem__VisibleImage`} 
                        onClick={() => { e.possibilitySort && params.keyDefinitionFunction(e.key) }}
                    >
                        <div className={`PerfectTableHeaderItem__Block`}>
                            {e.label}
                            {e.possibilitySort && e.sort === null ?
                                <img src={PerfectTableNull} alt="Perfect Table Null" /> : e.sort === true ?
                                    <img className='PerfectTableHeaderItem__VisibleImageAlways' src={PerfectTableTrue} alt="Perfect Table True" /> : e.sort === false ?
                                        <img className='PerfectTableHeaderItem__VisibleImageAlways' src={PerfectTableFalse} alt="Perfect Table False" /> : null
                            }
                        </div>
                    </th>
                )}
            </tr>
            <tr className={`PerfectTableHeader__FakeBlock`}>
            </tr>
        </thead>
    );
};
