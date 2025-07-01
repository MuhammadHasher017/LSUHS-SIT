import { useState, useEffect, useCallback } from 'react';

// Mock data for the dashboard
const mockData = {
  totalUsers: 1250,
  totalUsersChange: 12,
  goalsCompletionRate: 76,
  goalsCompletionChange: -12,
  totalLessonsView: 680,
  totalLessonsViewChange: 12,
  
  weightLoggingData: [
    { month: 'Jan', value: 150 },
    { month: 'Feb', value: 220 },
    { month: 'Mar', value: 180 },
    { month: 'Apr', value: 240 },
    { month: 'May', value: 260 },
    { month: 'Jun', value: 290 }
  ],
  
  topGoalsCompleted: [
    { name: 'Meal Planning & Preparation', percentage: 85 },
    { name: 'Caloric Awareness', percentage: 82 },
    { name: 'Resistance Training', percentage: 78 },
    { name: 'Flexibility & Mobility Work', percentage: 74 },
  ],
  
  usersByCity: [
    { name: 'Baton Rouge', percentage: 33 },
    { name: 'New Orleans', percentage: 19 },
    { name: 'Lafayette', percentage: 15 },
    { name: 'Others', percentage: 33 }
  ],
  
  topLessonsViewed: [
    { name: 'Meal Planning & Preparation', users: 3200, completionRate: 92 },
    { name: 'Caloric Awareness', users: 2900, completionRate: 87 },
    { name: 'Resistance Training', users: 2700, completionRate: 78 },
    { name: 'Flexibility & Mobility Work', users: 2650, completionRate: 70 },
    { name: 'Sleep Optimization', users: 2400, completionRate: 68 }
  ]
};

const useDashboard = () => {
  // State management
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);
  const [dashboardData, setDashboardData] = useState(mockData);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  // Function to simulate API call and refresh data
  const refreshData = useCallback(async () => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real implementation, you would fetch data from your API here
      // const response = await fetch('/api/dashboard-data');
      // const newData = await response.json();
      // setDashboardData(newData);
      
      setDashboardData(prevData => ({
        ...prevData,
        totalUsers: prevData.totalUsers + Math.floor(Math.random() * 10),
        lastUpdated: new Date().toISOString()
      }));
      
      setLastRefresh(new Date());
    } catch (error) {
      console.error('Error refreshing dashboard data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const filterDataByDateRange = useCallback((startDate, endDate) => {
    if (!startDate || !endDate) {
      setDashboardData(mockData);
      return;
    }

    const filteredData = {
      ...mockData,
      totalUsers: Math.floor(mockData.totalUsers * 0.8),
      totalLessonsView: Math.floor(mockData.totalLessonsView * 0.9),
    };
    
    setDashboardData(filteredData);
  }, []);

  const handleDateRangeChange = useCallback((dates) => {
    setDateRange(dates);
    if (dates && dates[0] && dates[1]) {
      filterDataByDateRange(dates[0], dates[1]);
    } else {
      setDashboardData(mockData);
    }
  }, [filterDataByDateRange]);

  const getWeightChartOptions = useCallback(() => ({
    chart: {
      type: 'spline',
      height: 250
    },
    title: {
      text: null
    },
    xAxis: {
      categories: dashboardData.weightLoggingData.map(item => item.month)
    },
    yAxis: {
      title: {
        text: null
      }
    },
    tooltip: {
      crosshairs: true,
      shared: true
    },
    plotOptions: {
      spline: {
        marker: {
          radius: 4,
          lineColor: '#666666',
          lineWidth: 1
        }
      }
    },
    series: [{
      name: 'Weight Logs',
      marker: {
        symbol: 'circle'
      },
      color: '#8676FF',
      data: dashboardData.weightLoggingData.map(item => item.value)
    }],
    credits: {
      enabled: false
    }
  }), [dashboardData.weightLoggingData]);

  const getCityChartOptions = useCallback(() => ({
    chart: {
      type: 'pie',
      height: 250
    },
    title: {
      text: null
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false
        },
        showInLegend: true
      }
    },
    series: [{
      name: 'Users',
      colorByPoint: true,
      data: dashboardData.usersByCity.map(city => ({
        name: city.name,
        y: city.percentage
      }))
    }],
    colors: ['#00C49F', '#8676FF', '#00A3FF', '#FF6B6B'],
    credits: {
      enabled: false
    }
  }), [dashboardData.usersByCity]);

  const getTableColumns = useCallback(() => [
    {
      title: 'Lesson Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Users',
      dataIndex: 'users',
      key: 'users',
      sorter: (a, b) => a.users - b.users,
    },
    {
      title: 'Completion Rate',
      dataIndex: 'completionRate',
      key: 'completionRate',
      sorter: (a, b) => a.completionRate - b.completionRate,
      render: (rate) => `${rate}%`,
    },
  ], []);

  const getDerivedMetrics = useCallback(() => {
    const totalGoalAttempts = dashboardData.topGoalsCompleted.reduce(
      (sum, goal) => sum + goal.percentage, 0
    );
    const avgGoalCompletion = totalGoalAttempts / dashboardData.topGoalsCompleted.length;
    
    const totalLessonUsers = dashboardData.topLessonsViewed.reduce(
      (sum, lesson) => sum + lesson.users, 0
    );
    const avgCompletionRate = dashboardData.topLessonsViewed.reduce(
      (sum, lesson) => sum + lesson.completionRate, 0
    ) / dashboardData.topLessonsViewed.length;

    return {
      avgGoalCompletion: Math.round(avgGoalCompletion),
      totalLessonUsers,
      avgCompletionRate: Math.round(avgCompletionRate)
    };
  }, [dashboardData]);

  useEffect(() => {
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!loading) {
        refreshData();
      }
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, [loading, refreshData]);

  return {
    loading,
    dateRange,
    dashboardData,
    lastRefresh,
    
    refreshData,
    handleDateRangeChange,
    
    weightChartOptions: getWeightChartOptions(),
    cityChartOptions: getCityChartOptions(),
    tableColumns: getTableColumns(),
    
    derivedMetrics: getDerivedMetrics(),
    
    filterDataByDateRange,
  };
};

export default useDashboard;