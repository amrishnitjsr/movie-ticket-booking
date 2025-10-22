import React, { useEffect, useState } from "react";
import { 
  Tabs, 
  Card, 
  Avatar, 
  Typography, 
  Row, 
  Col, 
  Statistic, 
  Timeline, 
  Tag, 
  Button,
  List,
  Badge
} from "antd";
import { 
  UserOutlined, 
  CalendarOutlined, 
  HomeOutlined, 
  StarOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined 
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import PageTitle from "../../components/PageTitle";
import TheatresList from "./TheatresList";

const { Title, Text } = Typography;

function Profile() {
  const { user } = useSelector((state) => state.users);
  const [bookingStats, setBookingStats] = useState({
    totalBookings: 0,
    upcomingShows: 0,
    favoriteGenre: 'Action',
    totalSpent: 0
  });

  useEffect(() => {
    // Mock data - in real app, fetch from API
    setBookingStats({
      totalBookings: 12,
      upcomingShows: 3,
      favoriteGenre: 'Action',
      totalSpent: 480
    });
  }, []);

  const recentBookings = [
    {
      id: 1,
      movie: 'Avengers: Endgame',
      theatre: 'PVR Cinemas',
      date: '2023-11-15',
      time: '7:00 PM',
      seats: 'A1, A2',
      status: 'completed'
    },
    {
      id: 2,
      movie: 'Spider-Man: No Way Home',
      theatre: 'INOX Theatre',
      date: '2023-11-20',
      time: '9:30 PM',
      seats: 'B5, B6',
      status: 'upcoming'
    },
    {
      id: 3,
      movie: 'The Batman',
      theatre: 'Cinepolis',
      date: '2023-10-28',
      time: '6:00 PM',
      seats: 'C3, C4, C5',
      status: 'completed'
    }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <PageTitle title="My Dashboard" />
      
      {/* User Profile Header */}
      <Card style={{ marginBottom: '24px', borderRadius: '12px' }}>
        <Row gutter={[24, 24]} align="middle">
          <Col>
            <Avatar 
              size={80} 
              icon={<UserOutlined />} 
              style={{ 
                backgroundColor: '#1890ff',
                border: '4px solid #f0f2f5'
              }} 
            />
          </Col>
          <Col flex={1}>
            <Title level={3} style={{ margin: 0 }}>
              Welcome back, {user?.name || 'Movie Lover'}!
            </Title>
            <Text type="secondary" style={{ fontSize: '16px' }}>
              {user?.email || 'user@bookmymovie.com'}
            </Text>
            <br />
            <Text type="secondary">
              Member since October 2023 • Last login: Today
            </Text>
          </Col>
          <Col>
            <Button type="primary" size="large">
              Edit Profile
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ textAlign: 'center', borderRadius: '8px' }}>
            <Statistic
              title="Total Bookings"
              value={bookingStats.totalBookings}
              prefix={<CalendarOutlined style={{ color: '#1890ff' }} />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ textAlign: 'center', borderRadius: '8px' }}>
            <Statistic
              title="Upcoming Shows"
              value={bookingStats.upcomingShows}
              prefix={<ClockCircleOutlined style={{ color: '#52c41a' }} />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ textAlign: 'center', borderRadius: '8px' }}>
            <Statistic
              title="Favorite Genre"
              value={bookingStats.favoriteGenre}
              prefix={<StarOutlined style={{ color: '#faad14' }} />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ textAlign: 'center', borderRadius: '8px' }}>
            <Statistic
              title="Total Spent"
              value={bookingStats.totalSpent}
              prefix="₹"
              valueStyle={{ color: '#f5222d' }}
            />
          </Card>
        </Col>
      </Row>

      <Tabs 
        defaultActiveKey="1" 
        size="large"
        items={[
          {
            key: '1',
            label: (
              <span>
                <CalendarOutlined />
                Bookings & History
              </span>
            ),
            children: (
              <Row gutter={[24, 24]}>
                <Col xs={24} lg={16}>
                  <Card title="Recent Bookings" extra={<Button type="link">View All</Button>}>
                    <List
                      itemLayout="horizontal"
                      dataSource={recentBookings}
                      renderItem={(booking) => (
                        <List.Item
                          actions={[
                            <Badge 
                              status={booking.status === 'upcoming' ? 'processing' : 'success'} 
                              text={booking.status === 'upcoming' ? 'Upcoming' : 'Completed'} 
                            />
                          ]}
                        >
                          <List.Item.Meta
                            avatar={<Avatar icon={<CalendarOutlined />} />}
                            title={
                              <div>
                                <strong>{booking.movie}</strong>
                                <Tag color="blue" style={{ marginLeft: 8 }}>
                                  {booking.theatre}
                                </Tag>
                              </div>
                            }
                            description={
                              <div>
                                <EnvironmentOutlined /> {booking.date} at {booking.time}
                                <br />
                                Seats: {booking.seats}
                              </div>
                            }
                          />
                        </List.Item>
                      )}
                    />
                  </Card>
                </Col>
                <Col xs={24} lg={8}>
                  <Card title="Booking Timeline">
                    <Timeline>
                      <Timeline.Item color="green">
                        <strong>Spider-Man: No Way Home</strong>
                        <br />
                        <Text type="secondary">Nov 20, 2023 - Upcoming</Text>
                      </Timeline.Item>
                      <Timeline.Item color="blue">
                        <strong>Avengers: Endgame</strong>
                        <br />
                        <Text type="secondary">Nov 15, 2023 - Watched</Text>
                      </Timeline.Item>
                      <Timeline.Item>
                        <strong>The Batman</strong>
                        <br />
                        <Text type="secondary">Oct 28, 2023 - Watched</Text>
                      </Timeline.Item>
                      <Timeline.Item>
                        <strong>Dune</strong>
                        <br />
                        <Text type="secondary">Oct 15, 2023 - Watched</Text>
                      </Timeline.Item>
                    </Timeline>
                  </Card>
                </Col>
              </Row>
            )
          },
          {
            key: '2',
            label: (
              <span>
                <HomeOutlined />
                My Theatres
              </span>
            ),
            children: <TheatresList />
          },
          {
            key: '3',
            label: (
              <span>
                <StarOutlined />
                My Shows
              </span>
            ),
            children: (
              <Card title="My Shows Management">
                <div style={{ textAlign: 'center', padding: '40px' }}>
                  <StarOutlined style={{ fontSize: '48px', color: '#d9d9d9', marginBottom: '16px' }} />
                  <Title level={4} type="secondary">No Theatre Selected</Title>
                  <Text type="secondary">
                    To manage shows, you need to first add and select a theatre from the "My Theatres" tab.
                  </Text>
                  <br />
                  <br />
                  <Button type="primary" onClick={() => window.location.href = '#'}>
                    Go to My Theatres
                  </Button>
                </div>
              </Card>
            )
          }
        ]}
      />
    </div>
  );
}

// Exporting the 'Profile' component as the default export of this module.
export default Profile;