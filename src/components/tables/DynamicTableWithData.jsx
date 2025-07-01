import React from 'react';
import useTableData from '../../hooks/useTableData';
import DynamicTable from './DynamicTable';

export const DynamicTableWithData = ({ dataType, mediaType = 'all', searchText = '' }) => {
  const { data, loading, handleSearch } = useTableData(dataType, mediaType);

  // Apply search when searchText changes
  React.useEffect(() => {
    if (handleSearch) {
      handleSearch(searchText);
    }
  }, [searchText, handleSearch]);

  return (
    <DynamicTable 
      dataType={dataType} 
      data={data} 
      loading={loading}
      onSearch={handleSearch}
      mediaType={mediaType}
    />
  );
}; 