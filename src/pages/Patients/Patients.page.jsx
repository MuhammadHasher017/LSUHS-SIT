import React from 'react';
import usePatients from './usePatients.hook';
import Icon from "../../assets/images/icon1.svg"
import InfoCard from '@/components/common/InfoCard';
import SelectableChips from '@/components/common/SelectableChips';
import DynamicTable from '@/components/tables/DynamicTable';
import { getTableColumns } from '@/components/tables/tableUtils';
import tableData from '@/data/tableData';

const Patients = () => {
  usePatients();

  const infoCards = [
    {
      title: "Total Patients",
      value: 1250,
      change: 12,
      changeValue: 42,
      changeType: "up",
      changeUnit: "users",
      changeColor: "success",
      suffix: "",
      percent: null,
      iconSrc: Icon,
    },
    {
      title: "Total Result",
      value: 200,
      change: 1.2,
      changeValue: 24,
      changeType: "up",
      changeUnit: "result",
      changeColor: "success",
      suffix: "",
      percent: null,
      iconSrc: Icon,
    },
    {
      title: "Positive Results",
      value: 40,
      change: 1.2,
      changeValue: 12,
      changeType: "down",
      changeUnit: "order",
      changeColor: "danger",
      suffix: "",
      percent: null,
      iconSrc: Icon,
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