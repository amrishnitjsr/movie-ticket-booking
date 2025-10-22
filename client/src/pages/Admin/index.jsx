import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { 
  Layout,
  Menu,
  Card, 
  Row, 
  Col, 
  Statistic, 
  Typography, 
  Progress, 
  Table, 
  Tag, 
  Space,
  Button,
  Avatar,
  Dropdown,
  message,
  Modal,
  Badge,
  Select,
  Form,
  Input,
  DatePicker
} from "antd";
import { 
  UserOutlined, 
  VideoCameraOutlined, 
  HomeOutlined,
  CalendarOutlined,
  LogoutOutlined,
  SettingOutlined,
  DashboardOutlined,
  CreditCardOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  ReloadOutlined,
  ExportOutlined,
  BlockOutlined,
  CheckOutlined,
  CloseOutlined,
  TeamOutlined,
  BarChartOutlined,
  BellOutlined
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

function Admin() {
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();
  
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('dashboard');
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalMovies: 0,
    totalTheatres: 0,
    totalRevenue: 0,
    todayBookings: 0,
    activeShows: 0,
    topMovies: [],
    recentActivities: []
  });

  // Sample data states
  const [bookings, setBookings] = useState([]);
  const [movies, setMovies] = useState([]);
  const [theatres, setTheatres] = useState([]);
  const [users, setUsers] = useState([]);
  const [revenueData, setRevenueData] = useState([]);

  // Modal states
  const [isMovieModalVisible, setIsMovieModalVisible] = useState(false);
  const [isTheatreModalVisible, setIsTheatreModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  // Check if user is admin
  useEffect(() => {
    if (user && !user.isAdmin) {
      message.error("Access denied. Admin privileges required.");
      navigate('/');
    }
  }, [user, navigate]);

  // Initialize sample data
  useEffect(() => {
    // Sample stats
    setStats({
      totalUsers: 1248,
      totalMovies: 45,
      totalTheatres: 12,
      totalRevenue: 125430,
      todayBookings: 23,
      activeShows: 67,
      topMovies: [
        { key: 1, title: 'Spider-Man: No Way Home', bookings: 342, revenue: 15600 },
        { key: 2, title: 'Avengers: Endgame', bookings: 298, revenue: 13200 },
        { key: 3, title: 'The Batman', bookings: 265, revenue: 12100 },
        { key: 4, title: 'Dune', bookings: 198, revenue: 9800 },
        { key: 5, title: 'No Time to Die', bookings: 156, revenue: 7800 }
      ],
      recentActivities: [
        { id: 1, action: 'New movie added', details: 'The Matrix Resurrections', time: '2 hours ago', type: 'movie' },
        { id: 2, action: 'Theatre registered', details: 'Cineplex Downtown', time: '4 hours ago', type: 'theatre' },
        { id: 3, action: 'Show scheduled', details: 'Spider-Man - 7:00 PM', time: '6 hours ago', type: 'show' },
        { id: 4, action: 'User registered', details: 'john.doe@example.com', time: '8 hours ago', type: 'user' }
      ]
    });

    // Sample bookings data
    setBookings([
      { 
        key: 1, 
        id: 'BK001', 
        userName: 'John Doe', 
        userEmail: 'john@example.com',
        movieName: 'Spider-Man: No Way Home', 
        theatreName: 'PVR Cinemas',
        screen: 'Screen 1',
        seats: ['A1', 'A2'], 
        showTime: '7:00 PM', 
        showDate: '2024-01-15',
        amount: 600,
        bookingDate: '2024-01-10',
        status: 'confirmed'
      },
      { 
        key: 2, 
        id: 'BK002', 
        userName: 'Jane Smith', 
        userEmail: 'jane@example.com',
        movieName: 'The Batman', 
        theatreName: 'INOX Megaplex',
        screen: 'Screen 2',
        seats: ['B3', 'B4', 'B5'], 
        showTime: '9:30 PM', 
        showDate: '2024-01-16',
        amount: 900,
        bookingDate: '2024-01-11',
        status: 'confirmed'
      },
      // Add more sample bookings...
    ]);

    // Sample movies data
    setMovies([
      {
        key: 1,
        title: 'Spider-Man: No Way Home',
        genre: 'Action, Adventure',
        duration: '148 min',
        rating: '8.4/10',
        releaseDate: '2021-12-17',
        status: 'active',
        poster: 'https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg'
      },
      {
        key: 2,
        title: 'The Batman',
        genre: 'Action, Crime, Drama',
        duration: '176 min',
        rating: '7.8/10',
        releaseDate: '2022-03-04',
        status: 'active',
        poster: 'https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg'
      }
    ]);

    // Sample users data
    setUsers([
      {
        key: 1,
        name: 'John Doe',
        email: 'john@example.com',
        joinDate: '2024-01-01',
        totalBookings: 5,
        totalSpent: 2500,
        status: 'active',
        isAdmin: false
      },
      {
        key: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        joinDate: '2024-01-05',
        totalBookings: 3,
        totalSpent: 1800,
        status: 'active',
        isAdmin: false
      }
    ]);

    // Sample theatres data
    setTheatres([
      {
        key: 1,
        name: 'PVR Cinemas',
        location: 'Mall Road, Delhi',
        screens: 5,
        totalSeats: 1250,
        facilities: ['3D', 'IMAX', 'Dolby Atmos'],
        status: 'active'
      },
      {
        key: 2,
        name: 'INOX Megaplex',
        location: 'City Center, Mumbai',
        screens: 8,
        totalSeats: 2000,
        facilities: ['3D', '4DX', 'Laser Projection'],
        status: 'active'
      }
    ]);

    // Sample revenue data
    setRevenueData([
      { period: 'Today', amount: 12450, bookings: 23, growth: 5.2 },
      { period: 'This Week', amount: 89750, bookings: 165, growth: 12.8 },
      { period: 'This Month', amount: 345670, bookings: 687, growth: 8.5 },
      { period: 'This Year', amount: 2876540, bookings: 5432, growth: 15.3 }
    ]);
  }, []);

  // Handler functions
  const handleLogout = () => {
    localStorage.removeItem("token");
    message.success("Logged out successfully");
    navigate('/login');
  };

  const handleCancelBooking = (booking) => {
    Modal.confirm({
      title: 'Cancel Booking',
      content: `Are you sure you want to cancel booking ${booking.id}?`,
      onOk: () => {
        setBookings(prev => prev.map(b => 
          b.key === booking.key ? { ...b, status: 'cancelled' } : b
        ));
        message.success('Booking cancelled successfully');
      }
    });
  };

  const handleBlockUser = (user) => {
    Modal.confirm({
      title: `${user.status === 'active' ? 'Block' : 'Unblock'} User`,
      content: `Are you sure you want to ${user.status === 'active' ? 'block' : 'unblock'} ${user.name}?`,
      onOk: () => {
        setUsers(prev => prev.map(u => 
          u.key === user.key ? { ...u, status: u.status === 'active' ? 'blocked' : 'active' } : u
        ));
        message.success(`User ${user.status === 'active' ? 'blocked' : 'unblocked'} successfully`);
      }
    });
  };

  const handleDeleteMovie = (movie) => {
    Modal.confirm({
      title: 'Delete Movie',
      content: `Are you sure you want to delete "${movie.title}"?`,
      onOk: () => {
        setMovies(prev => prev.filter(m => m.key !== movie.key));
        message.success('Movie deleted successfully');
      }
    });
  };

  const handleAddMovie = (values) => {
    const newMovie = {
      key: editingRecord ? editingRecord.key : Date.now().toString(),
      title: values.title,
      genre: values.genre,
      duration: `${values.duration} min`,
      rating: 'N/A',
      releaseDate: values.releaseDate?.format('YYYY-MM-DD'),
      status: 'active',
      poster: values.poster || 'https://via.placeholder.com/200x300?text=Movie'
    };

    if (editingRecord) {
      setMovies(movies.map(movie => 
        movie.key === editingRecord.key ? newMovie : movie
      ));
      message.success('Movie updated successfully');
    } else {
      setMovies([...movies, newMovie]);
      message.success('Movie added successfully');
    }
    
    setIsMovieModalVisible(false);
    setEditingRecord(null);
  };

  const handleAddTheatre = (values) => {
    const newTheatre = {
      key: editingRecord ? editingRecord.key : Date.now().toString(),
      name: values.name,
      location: values.address,
      screens: Math.floor(Math.random() * 8) + 1,
      phone: values.phone,
      email: values.email,
      status: 'active'
    };

    if (editingRecord) {
      setTheatres(theatres.map(theatre => 
        theatre.key === editingRecord.key ? newTheatre : theatre
      ));
      message.success('Theatre updated successfully');
    } else {
      setTheatres([...theatres, newTheatre]);
      message.success('Theatre added successfully');
    }
    
    setIsTheatreModalVisible(false);
    setEditingRecord(null);
  };

  const handleEditMovie = (record) => {
    setEditingRecord(record);
    setIsMovieModalVisible(true);
  };

  const handleEditTheatre = (record) => {
    setEditingRecord(record);
    setIsTheatreModalVisible(true);
  };

  // Menu items for sidebar
  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: 'bookings',
      icon: <CreditCardOutlined />,
      label: 'Bookings Management',
    },
    {
      key: 'movies',
      icon: <VideoCameraOutlined />,
      label: 'Movies Management',
    },
    {
      key: 'theatres',
      icon: <HomeOutlined />,
      label: 'Theatres Management',
    },
    {
      key: 'users',
      icon: <TeamOutlined />,
      label: 'User Management',
    },
    {
      key: 'revenue',
      icon: <BarChartOutlined />,
      label: 'Revenue Analytics',
    }
  ];

  const topMoviesColumns = [
    {
      title: 'Movie',
      dataIndex: 'title',
      key: 'title',
      render: (text) => <strong>{text}</strong>
    },
    {
      title: 'Bookings',
      dataIndex: 'bookings',
      key: 'bookings',
      render: (value) => <span>{value}</span>
    },
    {
      title: 'Revenue',
      dataIndex: 'revenue',
      key: 'revenue',
      render: (value) => <span style={{ color: '#52c41a' }}>₹{value.toLocaleString()}</span>
    }
  ];

  // Bookings table columns
  const bookingsColumns = [
    {
      title: 'Booking ID',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <strong>{text}</strong>
    },
    {
      title: 'Customer',
      dataIndex: 'userName',
      key: 'userName',
      render: (text, record) => (
        <div>
          <div><strong>{text}</strong></div>
          <div style={{ fontSize: '12px', color: '#666' }}>{record.userEmail}</div>
        </div>
      )
    },
    {
      title: 'Movie',
      dataIndex: 'movieName',
      key: 'movieName'
    },
    {
      title: 'Theatre & Screen',
      dataIndex: 'theatreName',
      key: 'theatreName',
      render: (text, record) => (
        <div>
          <div>{text}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>{record.screen}</div>
        </div>
      )
    },
    {
      title: 'Seats',
      dataIndex: 'seats',
      key: 'seats',
      render: (seats) => seats.join(', ')
    },
    {
      title: 'Show Details',
      key: 'showDetails',
      render: (record) => (
        <div>
          <div>{record.showDate}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>{record.showTime}</div>
        </div>
      )
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => <span style={{ color: '#52c41a' }}>₹{amount}</span>
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'confirmed' ? 'green' : status === 'cancelled' ? 'red' : 'orange'}>
          {status.toUpperCase()}
        </Tag>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record) => (
        <Space>
          {record.status === 'confirmed' && (
            <Button 
              size="small" 
              danger 
              icon={<CloseOutlined />}
              onClick={() => handleCancelBooking(record)}
            >
              Cancel
            </Button>
          )}
        </Space>
      )
    }
  ];

  // Movies table columns
  const moviesColumns = [
    {
      title: 'Poster',
      dataIndex: 'poster',
      key: 'poster',
      render: (poster) => (
        <Avatar shape="square" size={64} src={poster} icon={<VideoCameraOutlined />} />
      )
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text) => <strong>{text}</strong>
    },
    {
      title: 'Genre',
      dataIndex: 'genre',
      key: 'genre'
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration'
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating'
    },
    {
      title: 'Release Date',
      dataIndex: 'releaseDate',
      key: 'releaseDate'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status.toUpperCase()}
        </Tag>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record) => (
        <Space>
          <Button size="small" icon={<EditOutlined />} onClick={() => handleEditMovie(record)}>Edit</Button>
          <Button size="small" danger icon={<DeleteOutlined />} onClick={() => handleDeleteMovie(record)}>
            Delete
          </Button>
        </Space>
      )
    }
  ];

  // Users table columns
  const usersColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div>
          <div><strong>{text}</strong></div>
          <div style={{ fontSize: '12px', color: '#666' }}>{record.email}</div>
        </div>
      )
    },
    {
      title: 'Join Date',
      dataIndex: 'joinDate',
      key: 'joinDate'
    },
    {
      title: 'Total Bookings',
      dataIndex: 'totalBookings',
      key: 'totalBookings'
    },
    {
      title: 'Total Spent',
      dataIndex: 'totalSpent',
      key: 'totalSpent',
      render: (amount) => <span>₹{amount.toLocaleString()}</span>
    },
    {
      title: 'Role',
      dataIndex: 'isAdmin',
      key: 'isAdmin',
      render: (isAdmin) => (
        <Tag color={isAdmin ? 'purple' : 'blue'}>
          {isAdmin ? 'ADMIN' : 'USER'}
        </Tag>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status.toUpperCase()}
        </Tag>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record) => (
        <Space>
          <Button 
            size="small" 
            danger={record.status === 'active'} 
            type={record.status === 'active' ? 'primary' : 'default'}
            icon={record.status === 'active' ? <BlockOutlined /> : <CheckOutlined />}
            onClick={() => handleBlockUser(record)}
          >
            {record.status === 'active' ? 'Block' : 'Unblock'}
          </Button>
        </Space>
      )
    }
  ];

  // Theatres table columns
  const theatresColumns = [
    {
      title: 'Theatre Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <strong>{text}</strong>
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location'
    },
    {
      title: 'Screens',
      dataIndex: 'screens',
      key: 'screens'
    },
    {
      title: 'Total Seats',
      dataIndex: 'totalSeats',
      key: 'totalSeats'
    },
    {
      title: 'Facilities',
      dataIndex: 'facilities',
      key: 'facilities',
      render: (facilities) => (
        <div>
          {facilities.map(facility => (
            <Tag key={facility} color="blue">{facility}</Tag>
          ))}
        </div>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status.toUpperCase()}
        </Tag>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record) => (
        <Space>
          <Button size="small" icon={<EditOutlined />} onClick={() => handleEditTheatre(record)}>Edit</Button>
          <Button size="small" danger icon={<DeleteOutlined />}>Delete</Button>
        </Space>
      )
    }
  ];

  const recentActivitiesColumns = [
    {
      title: 'Activity',
      dataIndex: 'action',
      key: 'action'
    },
    {
      title: 'Details',
      dataIndex: 'details',
      key: 'details',
      render: (text) => <Text type="secondary">{text}</Text>
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => {
        const colors = {
          movie: 'blue',
          theatre: 'green',
          show: 'orange',
          user: 'purple'
        };
        return <Tag color={colors[type]}>{type}</Tag>
      }
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
      render: (text) => <Text type="secondary">{text}</Text>
    }
  ];

  // Render different content based on selected menu
  const renderContent = () => {
    switch (selectedMenu) {
      case 'dashboard':
        return (
          <div>
            {/* Welcome Banner */}
            <Card style={{ marginBottom: '24px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', border: 'none' }}>
              <div style={{ color: 'white' }}>
                <Title level={2} style={{ color: 'white', marginBottom: '8px' }}>
                  🎬 Welcome Back, {user?.name}!
                </Title>
                <Text style={{ color: 'white', fontSize: '16px' }}>
                  Admin Dashboard - Manage your cinema business efficiently
                </Text>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card title="Quick Actions" style={{ marginBottom: '24px' }}>
              <Row gutter={[16, 16]}>
                <Col xs={12} sm={6}>
                  <Button type="primary" block icon={<PlusOutlined />} onClick={() => setIsMovieModalVisible(true)}>
                    Add Movie
                  </Button>
                </Col>
                <Col xs={12} sm={6}>
                  <Button type="default" block icon={<HomeOutlined />} onClick={() => setIsTheatreModalVisible(true)}>
                    Add Theatre
                  </Button>
                </Col>
                <Col xs={12} sm={6}>
                  <Button type="default" block icon={<CalendarOutlined />}>
                    Schedule Show
                  </Button>
                </Col>
                <Col xs={12} sm={6}>
                  <Button type="default" block icon={<ExportOutlined />}>
                    Export Reports
                  </Button>
                </Col>
              </Row>
            </Card>

            {/* Statistics Cards */}
            <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
              <Col xs={12} sm={12} lg={6}>
                <Card>
                  <Statistic
                    title="Total Users"
                    value={stats.totalUsers}
                    prefix={<UserOutlined style={{ color: '#1890ff' }} />}
                    valueStyle={{ color: '#1890ff' }}
                  />
                  <Progress percent={75} size="small" showInfo={false} />
                  <Text type="secondary">75% active users</Text>
                </Card>
              </Col>
              <Col xs={12} sm={12} lg={6}>
                <Card>
                  <Statistic
                    title="Total Movies"
                    value={stats.totalMovies}
                    prefix={<VideoCameraOutlined style={{ color: '#52c41a' }} />}
                    valueStyle={{ color: '#52c41a' }}
                  />
                  <Progress percent={90} size="small" showInfo={false} strokeColor="#52c41a" />
                  <Text type="secondary">90% with shows</Text>
                </Card>
              </Col>
              <Col xs={12} sm={12} lg={6}>
                <Card>
                  <Statistic
                    title="Total Theatres"
                    value={stats.totalTheatres}
                    prefix={<HomeOutlined style={{ color: '#faad14' }} />}
                    valueStyle={{ color: '#faad14' }}
                  />
                  <Progress percent={83} size="small" showInfo={false} strokeColor="#faad14" />
                  <Text type="secondary">83% operational</Text>
                </Card>
              </Col>
              <Col xs={12} sm={12} lg={6}>
                <Card>
                  <Statistic
                    title="Total Revenue"
                    value={stats.totalRevenue}
                    prefix="₹"
                    valueStyle={{ color: '#f5222d' }}
                  />
                  <Progress percent={68} size="small" showInfo={false} strokeColor="#f5222d" />
                  <Text type="secondary">68% of target</Text>
                </Card>
              </Col>
            </Row>

            {/* Charts and Tables */}
            <Row gutter={[16, 16]}>
              <Col xs={24} lg={12}>
                <Card title="Top Movies" extra={<Button type="link">View All</Button>}>
                  <Table
                    dataSource={stats.topMovies}
                    columns={topMoviesColumns}
                    pagination={false}
                    size="small"
                  />
                </Card>
              </Col>
              <Col xs={24} lg={12}>
                <Card title="Recent Activities">
                  <Table
                    dataSource={stats.recentActivities}
                    columns={recentActivitiesColumns}
                    pagination={false}
                    size="small"
                  />
                </Card>
              </Col>
            </Row>
          </div>
        );

      case 'bookings':
        return (
          <div>
            <Card 
              title={
                <Space>
                  <CreditCardOutlined />
                  Booking Management
                  <Badge count={bookings.length} style={{ backgroundColor: '#52c41a' }} />
                </Space>
              }
              extra={
                <Space>
                  <Button icon={<ReloadOutlined />}>Refresh</Button>
                  <Button type="primary" icon={<ExportOutlined />}>Export</Button>
                </Space>
              }
            >
              <Table
                dataSource={bookings}
                columns={bookingsColumns}
                pagination={{ pageSize: 10 }}
                scroll={{ x: 1000 }}
              />
            </Card>
          </div>
        );

      case 'movies':
        return (
          <div>
            <Card 
              title={
                <Space>
                  <VideoCameraOutlined />
                  Movies Management
                  <Badge count={movies.length} style={{ backgroundColor: '#52c41a' }} />
                </Space>
              }
              extra={
                <Space>
                  <Button icon={<ReloadOutlined />}>Refresh</Button>
                  <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsMovieModalVisible(true)}>
                    Add Movie
                  </Button>
                </Space>
              }
            >
              <Table
                dataSource={movies}
                columns={moviesColumns}
                pagination={{ pageSize: 8 }}
              />
            </Card>
          </div>
        );

      case 'theatres':
        return (
          <div>
            <Card 
              title={
                <Space>
                  <HomeOutlined />
                  Theatres Management
                  <Badge count={theatres.length} style={{ backgroundColor: '#52c41a' }} />
                </Space>
              }
              extra={
                <Space>
                  <Button icon={<ReloadOutlined />}>Refresh</Button>
                  <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsTheatreModalVisible(true)}>
                    Add Theatre
                  </Button>
                </Space>
              }
            >
              <Table
                dataSource={theatres}
                columns={theatresColumns}
                pagination={{ pageSize: 8 }}
              />
            </Card>
          </div>
        );

      case 'users':
        return (
          <div>
            <Card 
              title={
                <Space>
                  <TeamOutlined />
                  User Management
                  <Badge count={users.length} style={{ backgroundColor: '#52c41a' }} />
                </Space>
              }
              extra={
                <Space>
                  <Button icon={<ReloadOutlined />}>Refresh</Button>
                  <Button type="primary" icon={<ExportOutlined />}>Export Users</Button>
                </Space>
              }
            >
              <Table
                dataSource={users}
                columns={usersColumns}
                pagination={{ pageSize: 10 }}
              />
            </Card>
          </div>
        );

      case 'revenue':
        return (
          <div>
            <Card title={<Space><BarChartOutlined />Revenue Analytics</Space>}>
              <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
                {revenueData.map((item, index) => (
                  <Col xs={12} sm={6} key={index}>
                    <Card>
                      <Statistic
                        title={item.period}
                        value={item.amount}
                        prefix="₹"
                        suffix={
                          <div style={{ fontSize: '12px', color: '#52c41a' }}>
                            ↗ {item.growth}%
                          </div>
                        }
                      />
                      <div style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
                        {item.bookings} bookings
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card>
          </div>
        );

      default:
        return <div>Content not found</div>;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={setCollapsed}
        style={{ background: '#001529' }}
        width={250}
      >
        <div style={{ 
          height: '64px', 
          background: 'rgba(255,255,255,0.1)', 
          margin: '16px', 
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: collapsed ? '16px' : '18px',
          fontWeight: 'bold'
        }}>
          {collapsed ? '🎬' : '🎬 Admin Panel'}
        </div>
        
        <Menu
          theme="dark"
          selectedKeys={[selectedMenu]}
          mode="inline"
          items={menuItems}
          onClick={({ key }) => setSelectedMenu(key)}
        />
      </Sider>

      {/* Main Layout */}
      <Layout>
        {/* Header */}
        <Header style={{ 
          background: '#fff', 
          padding: '0 24px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{ fontSize: '16px', width: 64, height: 64 }}
            />
            <Title level={4} style={{ margin: 0, marginLeft: '16px' }}>
              {menuItems.find(item => item.key === selectedMenu)?.label || 'Dashboard'}
            </Title>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Badge count={5}>
              <Button type="text" icon={<BellOutlined />} size="large" />
            </Badge>
            
            <Dropdown
              menu={{
                items: [
                  {
                    key: 'profile',
                    icon: <UserOutlined />,
                    label: 'Profile',
                  },
                  {
                    key: 'settings',
                    icon: <SettingOutlined />,
                    label: 'Settings',
                  },
                  { type: 'divider' },
                  {
                    key: 'logout',
                    icon: <LogoutOutlined />,
                    label: 'Logout',
                    onClick: handleLogout
                  }
                ]
              }}
              placement="bottomRight"
            >
              <Button type="text" style={{ height: 'auto', display: 'flex', alignItems: 'center' }}>
                <Avatar icon={<UserOutlined />} style={{ marginRight: '8px' }} />
                <span>{user?.name}</span>
              </Button>
            </Dropdown>
          </div>
        </Header>

        {/* Content */}
        <Content style={{ margin: '24px', background: '#f0f2f5', minHeight: 280 }}>
          <div style={{ padding: '24px', background: '#fff', borderRadius: '8px' }}>
            {renderContent()}
          </div>
        </Content>
      </Layout>

      {/* Movie Modal */}
      <Modal
        title={editingRecord ? "Edit Movie" : "Add New Movie"}
        open={isMovieModalVisible}
        onCancel={() => {
          setIsMovieModalVisible(false);
          setEditingRecord(null);
        }}
        footer={null}
        width={800}
      >
        <Form
          layout="vertical"
          onFinish={handleAddMovie}
          initialValues={editingRecord}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Movie Title"
                name="title"
                rules={[{ required: true, message: 'Please input movie title!' }]}
              >
                <Input placeholder="Enter movie title" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Language"
                name="language"
                rules={[{ required: true, message: 'Please select language!' }]}
              >
                <Select placeholder="Select language">
                  <Select.Option value="english">English</Select.Option>
                  <Select.Option value="hindi">Hindi</Select.Option>
                  <Select.Option value="tamil">Tamil</Select.Option>
                  <Select.Option value="telugu">Telugu</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="Duration (minutes)"
                name="duration"
                rules={[{ required: true, message: 'Please input duration!' }]}
              >
                <Input type="number" placeholder="120" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Release Date"
                name="releaseDate"
                rules={[{ required: true, message: 'Please select release date!' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Genre"
                name="genre"
                rules={[{ required: true, message: 'Please select genre!' }]}
              >
                <Select placeholder="Select genre">
                  <Select.Option value="action">Action</Select.Option>
                  <Select.Option value="comedy">Comedy</Select.Option>
                  <Select.Option value="drama">Drama</Select.Option>
                  <Select.Option value="horror">Horror</Select.Option>
                  <Select.Option value="thriller">Thriller</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please input description!' }]}
          >
            <Input.TextArea rows={3} placeholder="Enter movie description" />
          </Form.Item>

          <Form.Item
            label="Poster URL"
            name="poster"
          >
            <Input placeholder="Enter poster image URL" />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                {editingRecord ? 'Update Movie' : 'Add Movie'}
              </Button>
              <Button onClick={() => {
                setIsMovieModalVisible(false);
                setEditingRecord(null);
              }}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Theatre Modal */}
      <Modal
        title={editingRecord ? "Edit Theatre" : "Add New Theatre"}
        open={isTheatreModalVisible}
        onCancel={() => {
          setIsTheatreModalVisible(false);
          setEditingRecord(null);
        }}
        footer={null}
        width={600}
      >
        <Form
          layout="vertical"
          onFinish={handleAddTheatre}
          initialValues={editingRecord}
        >
          <Form.Item
            label="Theatre Name"
            name="name"
            rules={[{ required: true, message: 'Please input theatre name!' }]}
          >
            <Input placeholder="Enter theatre name" />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: 'Please input address!' }]}
          >
            <Input.TextArea rows={2} placeholder="Enter theatre address" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Phone Number"
                name="phone"
                rules={[{ required: true, message: 'Please input phone number!' }]}
              >
                <Input placeholder="Enter phone number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: 'Please input email!' },
                  { type: 'email', message: 'Please enter valid email!' }
                ]}
              >
                <Input placeholder="Enter email address" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                {editingRecord ? 'Update Theatre' : 'Add Theatre'}
              </Button>
              <Button onClick={() => {
                setIsTheatreModalVisible(false);
                setEditingRecord(null);
              }}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
}

export default Admin;