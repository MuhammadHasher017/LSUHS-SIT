import { useState, useCallback, useMemo } from 'react';
import tableData from '../data/tableData';

// Generate library data
const generateLibraryData = () => {
  const libraryItems = [
    { title: '5 Fun Ways to Stay Active', category: 'Lifestyle', tags: 'kids, activity, fitness', author: 'Coach Jenny', status: 'Published', date: '10/10/2025' },
    { title: 'How to Set Realistic Goals', category: 'Coaching', tags: 'goal-setting, progress, tips', author: 'Coach Marcus', status: 'Published', date: '10/10/2025' },
    { title: 'Understanding Childhood Obesity', category: 'Health Tips', tags: 'nutrition, growth, BMI', author: 'Dr. Ramos', status: 'Scheduled', date: '10/10/2025' },
    { title: '5 Fun Ways to Stay Active', category: 'Lifestyle', tags: 'kids, activity, fitness', author: 'Coach Jenny', status: 'Published', date: '10/10/2025' },
    { title: 'Smart Snacks for School Days', category: 'Nutrition', tags: 'snacks, healthy eating, family', author: 'Admin Sophia', status: 'Draft', date: '10/10/2025' },
    { title: 'Weekend Wellness Challenges', category: 'Lifestyle', tags: 'gamification, wellness, kids', author: 'Coach Jenny', status: 'Scheduled', date: '10/10/2025' },
    { title: '5 Fun Ways to Stay Active', category: 'Lifestyle', tags: 'kids, activity, fitness', author: 'Coach Jenny', status: 'Published', date: '10/10/2025' },
    { title: 'How to Set Realistic Goals', category: 'Coaching', tags: 'goal-setting, progress, tips', author: 'Coach Marcus', status: 'Published', date: '10/10/2025' },
    { title: 'Understanding Childhood Obesity', category: 'Health Tips', tags: 'nutrition, growth, BMI', author: 'Dr. Ramos', status: 'Scheduled', date: '10/10/2025' },
    { title: '5 Fun Ways to Stay Active', category: 'Lifestyle', tags: 'kids, activity, fitness', author: 'Coach Jenny', status: 'Published', date: '10/10/2025' },
  ];

  return libraryItems.map((item, index) => ({
    key: `library-${index + 1}`,
    id: `LIB${10000 + index}`,
    title: item.title,
    category: item.category,
    tags: item.tags,
    author: item.author,
    status: item.status,
    datePublished: item.date
  }));
};

// Generate media data
const generateMediaData = () => {
  const mediaTypes = [
    { name: 'Staying Active Every Day', type: 'pdf', size: '1 MB', tags: 'Lose weight', date: '10/10/2025' },
    { name: 'Welcome to Your Health Journey', type: 'video', size: '20 MB', tags: 'Intro, Family Health', date: '10/10/2025' },
    { name: 'Fun Ways to Stay Active', type: 'pdf', size: '1 MB', tags: 'Exercise, Kids, Movement', date: '10/10/2025' },
    { name: 'Healthy Eating Made Simple', type: 'pdf', size: '1 MB', tags: 'Nutrition, Meal, Planning', date: '10/10/2025' },
    { name: 'Setting Goals as a Family', type: 'video', size: '20 MB', tags: 'GoalSetting, Motivation', date: '10/10/2025' },
    { name: 'Why Sleep is Important', type: 'video', size: '20 MB', tags: 'Sleep, Wellness', date: '10/10/2025' },
    { name: 'Understanding Growth & BMI', type: 'video', size: '20 MB', tags: 'Health, Tracking', date: '10/10/2025' },
    { name: 'Making Healthy Habits Fun', type: 'pdf', size: '1 MB', tags: 'Routine, KidsHealth', date: '10/10/2025' },
    { name: 'Staying Hydrated Every Day', type: 'pdf', size: '1 MB', tags: 'Water, Wellness', date: '10/10/2025' },
    { name: 'Fun Ways to Stay Active', type: 'pdf', size: '1 MB', tags: 'Exercise, Kids, Movement', date: '10/10/2025' },
  ];

  return mediaTypes.map((item, index) => ({
    key: `media-${index + 1}`,
    id: `MED${10000 + index}`,
    name: item.name,
    fileSize: item.size,
    tags: item.tags,
    dateAdded: item.date,
    type: item.type,
    icon: item.type === 'pdf' ? 'pdf' : 'video'
  }));
};

// Get initial data based on data type
const getInitialData = (dataType) => {
  switch (dataType) {
    case 'goals':
      return tableData;
    case 'library':
      return generateLibraryData();
    case 'media':
      return generateMediaData();
    default:
      return [];
  }
};

// Get search fields based on data type
const getSearchFields = (dataType) => {
  switch (dataType) {
    case 'goals':
      return ['name', 'goal', 'category', 'address', 'id'];
    case 'library':
      return ['title', 'category', 'tags', 'author', 'status', 'datePublished'];
    case 'media':
      return ['name', 'tags', 'fileSize', 'dateAdded'];
    default:
      return ['name', 'id'];
  }
};

const useTableData = (dataType = 'goals', mediaType = 'all') => {
  // Get initial data based on data type
  const initialData = useMemo(() => getInitialData(dataType), [dataType]);
  
  // Get search fields based on data type
  const searchFields = useMemo(() => getSearchFields(dataType), [dataType]);
  
  // Filter media data based on media type
  const filteredInitialData = useMemo(() => {
    if (dataType !== 'media' || mediaType === 'all') {
      return initialData;
    }
    
    const typeMap = {
      'images': 'image',
      'videos': 'video',
      'audio': 'audio',
      'documents': 'pdf'
    };
    
    const fileType = typeMap[mediaType] || null;
    if (!fileType) return initialData;
    
    return initialData.filter(item => item.type === fileType);
  }, [initialData, dataType, mediaType]);
  
  const [data, setData] = useState(filteredInitialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState('ascend');

  // Handle search
  const handleSearch = useCallback((value) => {
    setLoading(true);
    setSearchTerm(value);
    
    if (!value) {
      setData(initialData);
      setLoading(false);
      return;
    }
    
    const lowerCaseValue = value.toLowerCase();
    const filteredData = initialData.filter(item => 
      searchFields.some(field => {
        const fieldValue = item[field];
        return fieldValue && String(fieldValue).toLowerCase().includes(lowerCaseValue);
      })
    );
    
    setData(filteredData);
    setLoading(false);
  }, [initialData, searchFields]);

  // Handle sorting
  const handleSort = useCallback((field) => {
    setLoading(true);
    
    // If clicking the same field, toggle sort order
    const newSortOrder = field === sortField && sortOrder === 'ascend' ? 'descend' : 'ascend';
    
    setSortField(field);
    setSortOrder(newSortOrder);
    
    const sortedData = [...data].sort((a, b) => {
      const valueA = a[field];
      const valueB = b[field];
      
      // Handle string comparison
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return newSortOrder === 'ascend' 
          ? valueA.localeCompare(valueB) 
          : valueB.localeCompare(valueA);
      }
      
      // Handle number comparison
      if (valueA < valueB) return newSortOrder === 'ascend' ? -1 : 1;
      if (valueA > valueB) return newSortOrder === 'ascend' ? 1 : -1;
      return 0;
    });
    
    setData(sortedData);
    setLoading(false);
  }, [data, sortField, sortOrder]);

  return {
    data,
    searchTerm,
    loading,
    handleSearch,
    handleSort
  };
};

export default useTableData;
