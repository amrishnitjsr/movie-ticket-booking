import React, { useEffect } from "react"; // Importing React and useEffect hook from React
import { Col, Row, message, Tabs, Card, Button, Input, Typography } from "antd"; // Importing UI components from Ant Design
import { useDispatch } from "react-redux"; // Importing useDispatch hook from Redux
import { HideLoading, ShowLoading } from "../../redux/loadersSlice"; // Importing Redux actions related to loading indicators
import { 
  GetAllMovies, 
  GetLatestMoviesFromTMDB, 
  GetPopularMoviesFromTMDB, 
  GetUpcomingMoviesFromTMDB, 
  GetTopRatedMoviesFromTMDB, 
  GetMovieGenresFromTMDB,
  GetMoviesByGenreFromTMDB,
  SearchMoviesFromTMDB,
  ImportMovieFromTMDB,
  GetMovieDetailsFromTMDB
} from "../../apicalls/movies"; // Importing API call functions for movies
import { useNavigate } from "react-router-dom"; // Importing useNavigate hook from React Router DOM
import moment from "moment";
import MovieDetailsModal from "../../components/MovieDetailsModal";

const { Meta } = Card;
const { Search } = Input;
const { Title, Text } = Typography;

// Define a function component called 'Home'.
function Home() {
  const [movies, setMovies] = React.useState([]); // Local movies from database
  const [tmdbMovies, setTmdbMovies] = React.useState([]); // TMDB movies
  const [latestMovies, setLatestMovies] = React.useState([]);
  const [popularMovies, setPopularMovies] = React.useState([]);
  const [upcomingMovies, setUpcomingMovies] = React.useState([]);
  const [topRatedMovies, setTopRatedMovies] = React.useState([]);
  const [genres, setGenres] = React.useState([]);
  const [searchResults, setSearchResults] = React.useState([]);
  const [activeTab, setActiveTab] = React.useState('latest');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedMovie, setSelectedMovie] = React.useState(null);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [movieDetails, setMovieDetails] = React.useState(null);
  const [isLocalMovie, setIsLocalMovie] = React.useState(false);
  const [isSearching, setIsSearching] = React.useState(false);
  const [searchState, setSearchState] = React.useState(''); // '', 'searching', 'success', 'error'
  
  const navigate = useNavigate(); // Creating a navigate function using the useNavigate hook
  const dispatch = useDispatch(); // Creating a dispatch function using the useDispatch hook

  // Define a function called 'getData' to fetch all movies from the API.
  const getData = async () => {
    try {
      dispatch(ShowLoading()); // `dispatch` is a function provided to every Redux component by the `react-redux` package.
      const response = await GetAllMovies(); // Calling the API function to fetch all movies
      if (response.success) {
        setMovies(response.data); // Setting the state variable to store the movies
      } else {
        message.error(response.message); // Displaying an error message using Ant Design's message component
      }
      dispatch(HideLoading()); // Dispatching a Redux action to hide loading indicator
    } catch (error) {
      dispatch(HideLoading()); // Dispatching a Redux action to hide loading indicator
      message.error(error.message); // Displaying an error message using Ant Design's message component
    }
  };

  // Function to get TMDB movies
  const getTMDBMovies = async () => {
    try {
      dispatch(ShowLoading());
      
      // Fetch different categories
      const [latestRes, popularRes, upcomingRes, topRatedRes, genresRes] = await Promise.all([
        GetLatestMoviesFromTMDB(),
        GetPopularMoviesFromTMDB(),
        GetUpcomingMoviesFromTMDB(),
        GetTopRatedMoviesFromTMDB(),
        GetMovieGenresFromTMDB()
      ]);

      if (latestRes.success) setLatestMovies(latestRes.data);
      if (popularRes.success) setPopularMovies(popularRes.data);
      if (upcomingRes.success) setUpcomingMovies(upcomingRes.data);
      if (topRatedRes.success) setTopRatedMovies(topRatedRes.data);
      if (genresRes.success) setGenres(genresRes.data);

      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error('Failed to fetch movies from TMDB');
    }
  };

  // Function to search movies
  const handleSearch = async (value) => {
    const searchValue = value.trim();
    
    if (!searchValue) {
      setSearchResults([]);
      setSearchQuery('');
      setIsSearching(false);
      setSearchState('');
      // Switch back to latest movies if search is cleared
      if (activeTab === 'search') {
        setActiveTab('latest');
      }
      return;
    }
    
    try {
      setIsSearching(true);
      setSearchState('searching');
      dispatch(ShowLoading());
      setSearchQuery(searchValue);
      
      const response = await SearchMoviesFromTMDB(searchValue);
      
      if (response.success) {
        setSearchResults(response.data || []);
        setActiveTab('search');
        setSearchState('success');
        
        if (!response.data || response.data.length === 0) {
          message.info(`🔍 No movies found for "${searchValue}". Try a different search term.`);
        } else {
          message.success(`🎬 Found ${response.data.length} movies for "${searchValue}"`);
        }
        
        // Clear success state after 2 seconds
        setTimeout(() => setSearchState(''), 2000);
      } else {
        message.error(response.message || 'Search failed. Please try again.');
        setSearchResults([]);
        setSearchState('error');
        setTimeout(() => setSearchState(''), 3000);
      }
      
      setIsSearching(false);
      dispatch(HideLoading());
    } catch (error) {
      setIsSearching(false);
      setSearchState('error');
      dispatch(HideLoading());
      console.error('Search error:', error);
      message.error('🚫 Search failed. Please check your internet connection and try again.');
      setSearchResults([]);
      setTimeout(() => setSearchState(''), 3000);
    }
  };

  // Function to get movies by genre
  const getMoviesByGenre = async (genreId) => {
    try {
      dispatch(ShowLoading());
      const response = await GetMoviesByGenreFromTMDB(genreId);
      if (response.success) {
        setTmdbMovies(response.data);
        setActiveTab('genre');
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error('Failed to fetch movies by genre');
    }
  };

  // Function to handle movie click for details
  const handleMovieClick = async (movie, isLocal = false) => {
    try {
      setIsLocalMovie(isLocal);
      if (isLocal) {
        setMovieDetails(movie);
        setSelectedMovie(movie);
      } else {
        // Fetch detailed movie info from TMDB
        dispatch(ShowLoading());
        const response = await GetMovieDetailsFromTMDB(movie.id);
        if (response.success) {
          setMovieDetails(response.data);
          setSelectedMovie(response.data);
        }
        dispatch(HideLoading());
      }
      setIsModalVisible(true);
    } catch (error) {
      dispatch(HideLoading());
      message.error('Failed to load movie details');
    }
  };

  // Function to handle booking
  const handleBookNow = (movie) => {
    navigate(`/movie/${movie._id}?date=${moment().format("YYYY-MM-DD")}`);
    setIsModalVisible(false);
  };

  // Function to import TMDB movie to local database
  const handleImportMovie = async (movie) => {
    try {
      dispatch(ShowLoading());
      const response = await ImportMovieFromTMDB(movie);
      if (response.success) {
        message.success('Movie imported successfully! You can now add it to theatres.');
        getData(); // Refresh local movies
      } else {
        message.error(response.message || 'Failed to import movie');
      }
      dispatch(HideLoading());
      setIsModalVisible(false);
    } catch (error) {
      dispatch(HideLoading());
      message.error('Failed to import movie');
    }
  };

  // The useEffect hook is used to run the functions when the component is mounted.
  useEffect(() => {
    getData();
    getTMDBMovies();
  }, []); // Passing an empty array as the second argument ensures that the functions are called only once.

  // Function to render movie cards
  const renderMovieCards = (movieList, isLocal = false) => {
    return (
      <Row gutter={[20, 20]} className="mt-2">
        {movieList.map((movie, index) => (
          <Col xs={24} sm={12} md={8} lg={6} key={isLocal ? movie._id : movie.id}>
            <Card
              hoverable
              style={{ height: '100%' }}
              cover={
                <img
                  alt={movie.title}
                  src={
                    isLocal 
                      ? movie.poster 
                      : `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  }
                  style={{ height: 300, objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/500x750?text=No+Image';
                  }}
                />
              }
              actions={[
                <Button 
                  type="primary" 
                  onClick={() => handleMovieClick(movie, isLocal)}
                >
                  {isLocal ? 'Book Now' : 'View Details'}
                </Button>
              ]}
            >
              <Meta
                title={movie.title}
                description={
                  <div>
                    <p style={{ fontSize: '12px', color: '#888' }}>
                      {isLocal 
                        ? `${movie.genre} • ${movie.duration} min`
                        : `Rating: ${movie.vote_average}/10 • ${movie.release_date}`
                      }
                    </p>
                    <p style={{ 
                      fontSize: '13px', 
                      overflow: 'hidden', 
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical'
                    }}>
                      {isLocal ? movie.description : movie.overview}
                    </p>
                  </div>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    );
  };

  return (
    <div>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 100%), url("https://images.unsplash.com/photo-1489599735188-900ba889928d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '80px 20px',
        color: 'white',
        textAlign: 'center',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Title level={1} style={{ color: 'white', fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>
            🎬 BookMyMovie
          </Title>
          <Title level={3} style={{ color: 'white', fontWeight: '300', marginBottom: '32px', opacity: 0.9 }}>
            Discover, Book & Enjoy the Latest Movies
          </Title>
          <Text style={{ fontSize: '18px', color: 'white', display: 'block', marginBottom: '40px', opacity: 0.8 }}>
            Browse thousands of movies, from the latest blockbusters to timeless classics. 
            Find showtimes, book tickets, and create unforgettable movie experiences.
          </Text>
          
          {/* Hero Search */}
          <div className={`movie-search-container ${searchState}`}>
            <Search
              placeholder="🔍 Search for movies, genres, or actors..."
              allowClear
              enterButton={
                isSearching 
                  ? "🔄 Searching..." 
                  : searchState === 'success'
                  ? "✅ Found Movies!"
                  : searchState === 'error'
                  ? "❌ Try Again"
                  : "🎬 Search Movies"
              }
              size="large"
              value={searchQuery}
              onSearch={handleSearch}
              onChange={(e) => {
                const value = e.target.value;
                setSearchQuery(value);
                // Clear search results if input is empty
                if (!value.trim()) {
                  setSearchResults([]);
                  setIsSearching(false);
                  setSearchState('');
                  if (activeTab === 'search') {
                    setActiveTab('latest');
                  }
                }
              }}
              onPressEnter={(e) => handleSearch(e.target.value)}
              loading={isSearching}
              disabled={isSearching}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: '40px 20px' }}>
        {/* Quick Stats */}
        <Row gutter={[24, 24]} style={{ marginBottom: '40px' }}>
          <Col xs={24} sm={8}>
            <Card style={{ textAlign: 'center', borderRadius: '12px', border: '1px solid #f0f0f0' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>🎬</div>
              <Title level={4} style={{ margin: 0, color: '#1890ff' }}>
                {latestMovies.length + popularMovies.length}+
              </Title>
              <Text type="secondary">Movies Available</Text>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card style={{ textAlign: 'center', borderRadius: '12px', border: '1px solid #f0f0f0' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>🎭</div>
              <Title level={4} style={{ margin: 0, color: '#52c41a' }}>
                {genres.length}+
              </Title>
              <Text type="secondary">Genres</Text>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card style={{ textAlign: 'center', borderRadius: '12px', border: '1px solid #f0f0f0' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>🏛️</div>
              <Title level={4} style={{ margin: 0, color: '#fa541c' }}>
                {movies.length}
              </Title>
              <Text type="secondary">Local Theatres</Text>
            </Card>
          </Col>
        </Row>

        {/* Search Results Info */}
        {activeTab === 'search' && searchQuery && (
          <div style={{ 
            marginBottom: '20px', 
            padding: '16px', 
            background: '#f0f8ff', 
            borderRadius: '8px',
            border: '1px solid #d6e4ff' 
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ margin: 0, color: '#1890ff' }}>
                  🔍 Showing results for "{searchQuery}"
                </h4>
                <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
                  {searchResults.length} movies found
                </p>
              </div>
              <Button 
                type="primary" 
                ghost 
                onClick={() => {
                  setSearchQuery('');
                  setSearchResults([]);
                  setActiveTab('latest');
                }}
              >
                Clear Search
              </Button>
            </div>
          </div>
        )}

        {/* Genre Filter */}
        {activeTab !== 'search' && (
          <div style={{ marginBottom: '30px' }}>
            <h3>Browse by Genre:</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {genres.slice(0, 10).map((genre) => (
                <Button
                  key={genre.id}
                  type="default"
                  onClick={() => getMoviesByGenre(genre.id)}
                  style={{ borderRadius: '20px' }}
                >
                  {genre.name}
                </Button>
              ))}
            </div>
          </div>
        )}

      {/* Movie Tabs */}
      <Tabs 
        activeKey={activeTab} 
        onChange={setActiveTab} 
        type="card"
        items={[
          // Local Movies Tab
          {
            key: 'local',
            label: `Local Theatre Movies (${movies.length})`,
            children: (
              <div>
                <h2>Movies Available in Local Theatres</h2>
                {movies.length > 0 ? (
                  renderMovieCards(movies, true)
                ) : (
                  <div style={{ textAlign: 'center', padding: '40px' }}>
                    <p>No local movies available. Check back later!</p>
                  </div>
                )}
              </div>
            )
          },
          // Latest Movies Tab
          {
            key: 'latest',
            label: `Now Playing (${latestMovies.length})`,
            children: (
              <div>
                <h2>Now Playing in Cinemas</h2>
                {activeTab === 'search' && searchResults.length > 0 ? (
                  <div>
                    <div style={{ marginBottom: '20px' }}>
                      <h3 style={{ color: '#1890ff', marginBottom: '8px' }}>
                        🔍 Search Results for "{searchQuery}"
                      </h3>
                      <p style={{ color: '#666', fontSize: '14px' }}>
                        Found {searchResults.length} movies matching your search
                      </p>
                    </div>
                    {renderMovieCards(searchResults)}
                  </div>
                ) : (
                  renderMovieCards(latestMovies)
                )}
              </div>
            )
          },
          // Popular Movies Tab
          {
            key: 'popular',
            label: `Popular (${popularMovies.length})`,
            children: (
              <div>
                <h2>Popular Movies</h2>
                {activeTab === 'search' && searchResults.length > 0 ? (
                  <div>
                    <div style={{ marginBottom: '20px' }}>
                      <h3 style={{ color: '#1890ff', marginBottom: '8px' }}>
                        🔍 Search Results for "{searchQuery}"
                      </h3>
                      <p style={{ color: '#666', fontSize: '14px' }}>
                        Found {searchResults.length} movies matching your search
                      </p>
                    </div>
                    {renderMovieCards(searchResults)}
                  </div>
                ) : (
                  renderMovieCards(popularMovies)
                )}
              </div>
            )
          },
          // Upcoming Movies Tab
          {
            key: 'upcoming',
            label: `Upcoming (${upcomingMovies.length})`,
            children: (
              <div>
                <h2>Coming Soon</h2>
                {activeTab === 'search' && searchResults.length > 0 ? (
                  <div>
                    <div style={{ marginBottom: '20px' }}>
                      <h3 style={{ color: '#1890ff', marginBottom: '8px' }}>
                        🔍 Search Results for "{searchQuery}"
                      </h3>
                      <p style={{ color: '#666', fontSize: '14px' }}>
                        Found {searchResults.length} movies matching your search
                      </p>
                    </div>
                    {renderMovieCards(searchResults)}
                  </div>
                ) : (
                  renderMovieCards(upcomingMovies)
                )}
              </div>
            )
          },
          // Top Rated Movies Tab
          {
            key: 'toprated',
            label: `Top Rated (${topRatedMovies.length})`,
            children: (
              <div>
                <h2>Top Rated Movies</h2>
                {activeTab === 'search' && searchResults.length > 0 ? (
                  <div>
                    <div style={{ marginBottom: '20px' }}>
                      <h3 style={{ color: '#1890ff', marginBottom: '8px' }}>
                        🔍 Search Results for "{searchQuery}"
                      </h3>
                      <p style={{ color: '#666', fontSize: '14px' }}>
                        Found {searchResults.length} movies matching your search
                      </p>
                    </div>
                    {renderMovieCards(searchResults)}
                  </div>
                ) : (
                  renderMovieCards(topRatedMovies)
                )}
              </div>
            )
          },
          // Genre Results Tab (conditionally rendered)
          ...(activeTab === 'genre' ? [{
            key: 'genre',
            label: `Genre Movies (${tmdbMovies.length})`,
            children: (
              <div>
                <h2>Movies by Genre</h2>
                {renderMovieCards(tmdbMovies)}
              </div>
            )
          }] : [])
        ]}
      />

        {/* Movie Details Modal */}
        <MovieDetailsModal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          movie={movieDetails}
          onBookNow={handleBookNow}
          onImportMovie={handleImportMovie}
          isLocal={isLocalMovie}
        />
      </div>
    </div>
  );
}

// Exporting the Home component so that it can be imported in other files.
export default Home;