import React, { useEffect } from "react";
import { 
  Col, 
  Row, 
  message, 
  Card, 
  Typography, 
  Button, 
  Divider, 
  Tag, 
  Rate, 
  DatePicker,
  List,
  Badge,
  Space,
  Empty
} from "antd";
import { 
  CalendarOutlined, 
  ClockCircleOutlined, 
  EnvironmentOutlined,
  StarOutlined,
  PlayCircleOutlined 
} from "@ant-design/icons";
import { useDispatch } from "react-redux"; // Importing useDispatch hook from Redux
import { HideLoading, ShowLoading } from "../../redux/loadersSlice"; // Importing Redux actions related to loading indicators
import { GetMovieById } from "../../apicalls/movies"; // Importing API call functions for movies
import { useNavigate, useParams } from "react-router-dom"; // Importing useNavigate hook from React Router DOM
import moment from "moment"; // Importing moment library for date and time manipulation
import { GetAllTheatresByMovie } from "../../apicalls/theatres"; // Importing API call functions for theatres

function TheatresForMovie() {
  // get all theatres for a movie
  const tempDate = new URLSearchParams(window.location.search).get("date"); // Getting the date from the URL query parameters
  const [date, setDate] = React.useState(
    tempDate || moment().format("YYYY-MM-DD")
  ); // Defining a state variable to store the date

  const [movie, setMovie] = React.useState([]); // Defining a state variable to store all movies
  const [theatres, setTheatres] = React.useState([]); // Defining a state variable to store all movies
  const navigate = useNavigate(); // Creating a navigate function using the useNavigate hook
  const dispatch = useDispatch(); // Creating a dispatch function using the useDispatch hook
  const params = useParams(); // Creating a params variable using the useParams hook

  // Define a function called 'getData' to fetch all movies from the API.
  const getData = async () => {
    try {
      dispatch(ShowLoading()); // `dispatch` is a function provided to every Redux component by the `react-redux` package.
      const response = await GetMovieById(params.id); // Calling the API function to fetch all movies
      if (response.success) {
        setMovie(response.data); // Setting the state variable to store the movies
      } else {
        message.error(response.message); // Displaying an error message using Ant Design's message component
      }
      dispatch(HideLoading()); // Dispatching a Redux action to hide loading indicator
    } catch (error) {
      dispatch(HideLoading()); // Dispatching a Redux action to hide loading indicator
      message.error(error.message); // Displaying an error message using Ant Design's message component
    }
  };

  const getTheatres = async () => {
    try {
      dispatch(ShowLoading()); // `dispatch` is a function provided to every Redux component by the `react-redux` package.
      const response = await GetAllTheatresByMovie({
        date,
        movie: params.id,
      }); // Calling the API function to fetch all movies
      if (response.success) {
        setTheatres(response.data); // Setting the state variable to store the movies
      } else {
        message.error(response.message); // Displaying an error message using Ant Design's message component
      }
      dispatch(HideLoading()); // Dispatching a Redux action to hide loading indicator
    } catch (error) {
      dispatch(HideLoading()); // Dispatching a Redux action to hide loading indicator
      message.error(error.message); // Displaying an error message using Ant Design's message component
    }
  };

  // The useEffect hook is used to run the 'getData' function when the component is mounted.
  useEffect(() => {
    getData();
  }, []); // Passing an empty array as the second argument ensures that the 'getData' function is called only once.

  // Use the useEffect hook to run the 'getTheatres' function when the 'date' state variable changes.
  useEffect(() => {
    getTheatres();
  }, [date]); // Passing the 'date' state variable as the second argument ensures that the 'getTheatres' function is called whenever the 'date' state variable changes.

  const { Title, Text } = Typography;

  // Render the component content
  return (
    movie && (
      <div style={{ padding: '20px', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        {/* Movie Header Card */}
        <Card 
          style={{ 
            marginBottom: '24px', 
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
          }}
        >
          <Row gutter={[24, 24]} align="middle">
            <Col xs={24} md={6}>
              <img
                src={movie.poster}
                alt={movie.title}
                style={{
                  width: '100%',
                  maxWidth: '200px',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/200x300?text=Movie+Poster';
                }}
              />
            </Col>
            <Col xs={24} md={12}>
              <Title level={2} style={{ margin: 0, marginBottom: '8px' }}>
                {movie.title}
              </Title>
              <Space direction="vertical" size="small">
                <div>
                  <Tag color="blue">{movie.language}</Tag>
                  <Tag color="green">{movie.genre}</Tag>
                </div>
                <Text>
                  <ClockCircleOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
                  Duration: {movie.duration} minutes
                </Text>
                <Text>
                  <CalendarOutlined style={{ marginRight: '8px', color: '#52c41a' }} />
                  Release Date: {moment(movie.releaseDate).format("MMM Do, YYYY")}
                </Text>
                <Rate disabled value={4.2} style={{ fontSize: '16px' }} />
                <Text type="secondary" style={{ marginLeft: '8px' }}>4.2/5</Text>
              </Space>
            </Col>
            <Col xs={24} md={6}>
              <Card size="small" title="Select Date" style={{ textAlign: 'center' }}>
                <DatePicker
                  value={moment(date)}
                  disabledDate={(current) => current && current < moment().startOf('day')}
                  onChange={(dateValue) => {
                    const selectedDate = dateValue.format("YYYY-MM-DD");
                    setDate(selectedDate);
                    navigate(`/movie/${params.id}?date=${selectedDate}`);
                  }}
                  style={{ width: '100%' }}
                />
                <Divider style={{ margin: '12px 0' }} />
                <Text type="secondary">
                  <PlayCircleOutlined style={{ marginRight: '4px' }} />
                  {theatres.reduce((total, theatre) => total + theatre.shows.length, 0)} shows available
                </Text>
              </Card>
            </Col>
          </Row>
        </Card>

        {/* Movie Description */}
        <Card style={{ marginBottom: '24px', borderRadius: '8px' }}>
          <Title level={4}>About the Movie</Title>
          <Text>{movie.description}</Text>
        </Card>

        {/* Theatres Section */}
        <Card 
          title={
            <div>
              <EnvironmentOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
              Available Theatres ({theatres.length})
            </div>
          }
          style={{ borderRadius: '8px' }}
        >
          {theatres.length > 0 ? (
            <List
              itemLayout="vertical"
              dataSource={theatres}
              renderItem={(theatre) => (
                <List.Item style={{ padding: '16px 0' }}>
                  <Card 
                    hoverable
                    style={{ 
                      border: '1px solid #f0f0f0',
                      borderRadius: '8px',
                      marginBottom: '16px'
                    }}
                    bodyStyle={{ padding: '16px' }}
                  >
                    <Row>
                      <Col xs={24} md={16}>
                        <Title level={4} style={{ margin: 0, marginBottom: '8px' }}>
                          {theatre.name}
                        </Title>
                        <Text type="secondary">
                          <EnvironmentOutlined style={{ marginRight: '8px' }} />
                          {theatre.address}
                        </Text>
                        <br />
                        <Badge count={theatre.shows.length} showZero style={{ marginTop: '8px' }}>
                          <Button type="link" style={{ padding: 0 }}>
                            <StarOutlined /> Premium Theatre
                          </Button>
                        </Badge>
                      </Col>
                      <Col xs={24} md={8}>
                        <div style={{ marginTop: '16px' }}>
                          <Text strong>Show Times:</Text>
                          <div style={{ 
                            display: 'flex', 
                            flexWrap: 'wrap', 
                            gap: '8px', 
                            marginTop: '8px' 
                          }}>
                            {theatre.shows
                              .sort((a, b) => moment(a.time, "HH:mm") - moment(b.time, "HH:mm"))
                              .map((show, index) => (
                                <Button
                                  key={index}
                                  type="primary"
                                  ghost
                                  size="small"
                                  style={{ 
                                    borderRadius: '6px',
                                    fontWeight: '500'
                                  }}
                                  onClick={() => navigate(`/book-show/${show._id}`)}
                                >
                                  {moment(show.time, "HH:mm").format("hh:mm A")}
                                </Button>
                              ))}
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Card>
                </List.Item>
              )}
            />
          ) : (
            <Empty
              description="No theatres available for this date"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            >
              <Button type="primary" onClick={() => setDate(moment().format("YYYY-MM-DD"))}>
                Try Today's Shows
              </Button>
            </Empty>
          )}
        </Card>
      </div>
    )
  );
}

// Export the component as the default object
export default TheatresForMovie;