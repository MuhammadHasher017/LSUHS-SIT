import React from 'react';
import DynamicTable from './DynamicTable';

const randomColumns = [
  { title: 'Location', dataIndex: 'location', key: 'location', width: 200 },
  { title: 'Type', dataIndex: 'type', key: 'type', width: 120 },
  { title: 'Contact Person', dataIndex: 'contact', key: 'contact', width: 180 },
  { title: 'Number of Tests', dataIndex: 'tests', key: 'tests', width: 140 },
];

const randomData = [
  { key: 1, location: 'Evergreen Health Center', type: 'Clinic', contact: 'Dr. James Miller', tests: 1200 },
  { key: 2, location: 'Sunrise Medical Clinic', type: 'Hospital', contact: 'Dr. Sarah Lee', tests: 1600 },
  { key: 3, location: 'Blue River Diagnostic Lab', type: 'Laboratory', contact: 'Dr. Alex Kim', tests: 2000 },
  { key: 4, location: 'Lakeside Wellness Hub', type: 'Clinic', contact: 'Dr. Emily Stone', tests: 1100 },
  { key: 5, location: 'Summit Care Testing Facility', type: 'Clinic', contact: 'Dr. James Miller', tests: 900 },
  { key: 6, location: 'Green Valley Hospital', type: 'Hospital', contact: 'Dr. Olivia Brown', tests: 1500 },
  { key: 7, location: 'Downtown Health Lab', type: 'Laboratory', contact: 'Dr. Ethan White', tests: 1300 },
  { key: 8, location: 'Riverbend Clinic', type: 'Clinic', contact: 'Dr. Mia Clark', tests: 1000 },
];

const DashboardRandomTable = () => {
  return (
    <div style={{ marginTop: 32 }}>
      <h3>Test per Location</h3>
      <DynamicTable
        dataType={null} // disables default columns
        data={randomData}
        loading={false}
        pagination={{ pageSize: 5 }}
        customColumns={randomColumns}
      />
    </div>
  );
};

export default DashboardRandomTable; 