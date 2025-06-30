import React, { useState, useEffect } from 'react';
import { 
  Row, 
  Col, 
  Card, 
  Statistic, 
  Table, 
  Progress, 
  Typography, 
  Button,
  DatePicker
} from 'antd';
import { 
  ArrowUpOutlined, 
  ArrowDownOutlined, 
  ReloadOutlined,
  CalendarOutlined
} from '@ant-design/icons';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './Dashboard.css';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

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

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);
  
  // Function to refresh data
  const refreshData = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  
  // Weight logging chart options
  const weightChartOptions = {
    chart: {
      type: 'spline',
      height: 250
    },
    title: {
      text: null
    },
    xAxis: {
      categories: mockData.weightLoggingData.map(item => item.month)
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
      data: mockData.weightLoggingData.map(item => item.value)
    }],
    credits: {
      enabled: false
    }
  };
  
  // Users by city pie chart options
  const cityChartOptions = {
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
      data: mockData.usersByCity.map(city => ({
        name: city.name,
        y: city.percentage
      }))
    }],
    colors: ['#00C49F', '#8676FF', '#00A3FF', '#FF6B6B'],
    credits: {
      enabled: false
    }
  };
  
  // Table columns for top lessons
  const columns = [
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
  ];
  
  return (
    <div className="dashboard-container">
     
      {/* Stats cards */}
      <Row gutter={[16, 16]} className="stats-row">
        <Col xs={24} sm={8}>
          <Card bordered={false} loading={loading}>
            <Statistic
              title="Total Users"
              value={mockData.totalUsers}
              precision={0}
              valueStyle={{ color: '#3f8600' }}
              prefix={mockData.totalUsersChange > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
              suffix={<Text type={mockData.totalUsersChange > 0 ? "success" : "danger"}>{`${Math.abs(mockData.totalUsersChange)}% (${42} users)`}</Text>}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card bordered={false} loading={loading}>
            <Statistic
              title="Goals Completion Rate"
              value={mockData.goalsCompletionRate}
              precision={0}
              valueStyle={{ color: mockData.goalsCompletionChange > 0 ? '#3f8600' : '#cf1322' }}
              prefix={mockData.goalsCompletionChange > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
              suffix={<Text type={mockData.goalsCompletionChange > 0 ? "success" : "danger"}>{`${Math.abs(mockData.goalsCompletionChange)}% (${12} lessons)`}</Text>}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card bordered={false} loading={loading}>
            <Statistic
              title="Total Lessons View"
              value={mockData.totalLessonsView}
              precision={0}
              valueStyle={{ color: '#3f8600' }}
              prefix={mockData.totalLessonsViewChange > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
              suffix={<Text type={mockData.totalLessonsViewChange > 0 ? "success" : "danger"}>{`${Math.abs(mockData.totalLessonsViewChange)}% (${24} responses)`}</Text>}
            />
          </Card>
        </Col>
      </Row>
      
      {/* Charts row */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card 
            title="Users Logging Weight" 
            bordered={false} 
            loading={loading}
            extra={<Button icon={<ReloadOutlined />} onClick={refreshData} type="text" />}
          >
            <HighchartsReact highcharts={Highcharts} options={weightChartOptions} />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card 
            title="Top Goals Completed" 
            bordered={false} 
            loading={loading}
            extra={<Button icon={<ReloadOutlined />} onClick={refreshData} type="text" />}
          >
            {mockData.topGoalsCompleted.map((goal, index) => (
              <div key={index} className="goal-progress-item">
                <div className="goal-info">
                  <Text>{goal.name}</Text>
                  <Text strong>{`${goal.percentage}%`}</Text>
                </div>
                <Progress 
                  percent={goal.percentage} 
                  showInfo={false} 
                  strokeColor="#8676FF" 
                  trailColor="#F0F0F0"
                />
              </div>
            ))}
          </Card>
        </Col>
      </Row>
      
      {/* Bottom row */}
      <Row gutter={[16, 16]} className="bottom-row">
        <Col xs={24} lg={12}>
          <Card 
            title="Users by City" 
            bordered={false} 
            loading={loading}
            extra={<Button icon={<ReloadOutlined />} onClick={refreshData} type="text" />}
          >
            <HighchartsReact highcharts={Highcharts} options={cityChartOptions} />
            <div className="chart-legend">
              {mockData.usersByCity.map((city, index) => (
                <div key={index} className="legend-item">
                  <span className={`legend-color color-${index}`}></span>
                  <Text>{city.name}</Text>
                  <Text strong>{`${city.percentage}%`}</Text>
                </div>
              ))}
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card 
            title="Top Lessons Viewed" 
            bordered={false} 
            loading={loading}
            extra={
              <Button type="link" size="small">
                View all
              </Button>
            }
          >
            <Table 
              dataSource={mockData.topLessonsViewed} 
              columns={columns} 
              pagination={false} 
              rowKey="name"
              loading={loading}
              size="middle"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
