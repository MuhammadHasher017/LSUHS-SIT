import React from 'react';
import usePatients from './usePatients.hook';
import InfoCard from '@/components/common/InfoCard';
import SelectableChips from '@/components/common/SelectableChips';
import DynamicTable from '@/components/tables/DynamicTable';
import { getTableColumns } from '@/components/tables/tableUtils';
import tableData from '@/data/tableData';
import { MultiUserIcon, ResultsIcon, SingleUserIcon } from '@/utils/icons';

const Patients = () => {
  usePatients();

  const infoCards = [
    {
      title: "Total Patients",
      value: 1250,
      trendDirection: "up",
      percent: null,
      userCount: '52',
      iconComponent: MultiUserIcon,
      
    },
    {
      title: "Total Result",
      value: 200,
      trendDirection: "up",
      percent: null,
      iconComponent: SingleUserIcon,
    },
    {
      title: "Positive Results",
      value: 40,
      trendDirection: "down",
      percent: null,
      iconComponent: ResultsIcon,
    },
  ];
  return (
    <div>
      <SelectableChips/>
      <div className="info-cards-flex">
        {infoCards.map((card) => (
          <div className="info-card-wrapper" key={card.title}>
            <InfoCard {...card} />
          </div>
        ))}
      </div>
      <div style={{ marginTop: '32px' }}>
        <DynamicTable
          data={tableData}
          customColumns={getTableColumns('patients')}
          dataType={null}
        />
      </div>
    </div>
  );
};

export default Patients; 