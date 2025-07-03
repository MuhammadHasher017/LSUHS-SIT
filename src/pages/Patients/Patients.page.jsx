import React from 'react';
import tableData from '@/data/tableData';
import usePatients from './usePatients.hook';
import InfoCard from '@/components/common/InfoCard/InfoCard';
import DynamicTable from '@/components/tables/DynamicTable';
import { getTableColumns } from '@/components/tables/tableUtils';
import SelectableChips from '@/components/common/SelectedChips/SelectableChips';
import ActivityTabContent from '@/pages/Patients/Components/ActivityTabContent';
import OrderTabContent from '@/pages/Patients/Components/OrderTabContent';
import EventsTabContent from '@/pages/Patients/Components/EventsTabContent';
import { MultiUserIcon, ResultsIcon, SingleUserIcon } from '@/utils/icons';
import ResultsTabContent from '@/pages/Patients/Components/ResultsTabContent';
import OverviewTabContent from '@/pages/Patients/Components/OverviewTabContent';
import CommentTabContent from '@/pages/Patients/Components/CommentTabContent';
import InsuranceTabContent from '@/pages/Patients/Components/InsuranceTabContent';

import './Patients.styles.css'

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

  const patientTabs = [
    { key: 'overview', label: 'Overview', content: OverviewTabContent },
    { key: 'insurance', label: 'Insurance', content: InsuranceTabContent },
    { key: 'order', label: 'Order', content: OrderTabContent },
    { key: 'results', label: 'Results', content: ResultsTabContent },
    { key: 'events', label: 'Events', content: EventsTabContent },
    { key: 'comment', label: 'Comment', content: CommentTabContent },
    { key: 'activity', label: 'Activity', content: ActivityTabContent },
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
          isTab={true}
          tabsItem={patientTabs}
        />
      </div>
    </div>
  );
};

export default Patients; 