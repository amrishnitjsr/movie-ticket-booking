import React from 'react';
import { Modal, Button, Tag, Rate, Divider, Row, Col } from 'antd';
import { CalendarOutlined, ClockCircleOutlined, StarOutlined, GlobalOutlined } from '@ant-design/icons';
import moment from 'moment';

const MovieDetailsModal = ({ visible, onClose, movie, onBookNow, onImportMovie, isLocal = false }) => {
  if (!movie) return null;

  const renderMovieInfo = () => {
    if (isLocal) {
      return (
        <div>
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <img 
                src={movie.poster} 
                alt={movie.title}
                style={{ width: '100%', borderRadius: '8px' }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
                }}
              />
            </Col>
            <Col span={16}>
              <h2>{movie.title}</h2>
              <div style={{ marginBottom: '16px' }}>
                <Tag color="blue">{movie.genre}</Tag>
                <Tag color="green">{movie.language}</Tag>
              </div>
              
              <div style={{ marginBottom: '8px' }}>
                <ClockCircleOutlined /> <strong>Duration:</strong> {movie.duration} minutes
              </div>
              
              <div style={{ marginBottom: '8px' }}>
                <CalendarOutlined /> <strong>Release Date:</strong> {moment(movie.releaseDate).format('MMMM DD, YYYY')}
              </div>
              
              <Divider />
              
              <h4>Description</h4>
              <p>{movie.description}</p>
              
              <div style={{ marginTop: '20px' }}>
                <Button 
                  type="primary" 
                  size="large" 
                  onClick={() => onBookNow(movie)}
                  style={{ marginRight: '10px' }}
                >
                  Book Now
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      );
    } else {
      // TMDB movie
      return (
        <div>
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <img 
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                style={{ width: '100%', borderRadius: '8px' }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
                }}
              />
            </Col>
            <Col span={16}>
              <h2>{movie.title}</h2>
              {movie.tagline && <p style={{ fontStyle: 'italic', color: '#666' }}>{movie.tagline}</p>}
              
              <div style={{ marginBottom: '16px' }}>
                <Rate disabled value={movie.vote_average / 2} />
                <span style={{ marginLeft: '8px' }}>
                  <StarOutlined /> {movie.vote_average}/10 ({movie.vote_count} votes)
                </span>
              </div>
              
              <div style={{ marginBottom: '16px' }}>
                {movie.genres && movie.genres.map(genre => (
                  <Tag key={genre.id} color="blue">{genre.name}</Tag>
                ))}
                <Tag color="green">{movie.original_language?.toUpperCase()}</Tag>
              </div>
              
              <div style={{ marginBottom: '8px' }}>
                <ClockCircleOutlined /> <strong>Runtime:</strong> {movie.runtime || 'N/A'} minutes
              </div>
              
              <div style={{ marginBottom: '8px' }}>
                <CalendarOutlined /> <strong>Release Date:</strong> {moment(movie.release_date).format('MMMM DD, YYYY')}
              </div>
              
              {movie.budget > 0 && (
                <div style={{ marginBottom: '8px' }}>
                  <strong>Budget:</strong> ${movie.budget.toLocaleString()}
                </div>
              )}
              
              {movie.revenue > 0 && (
                <div style={{ marginBottom: '8px' }}>
                  <strong>Revenue:</strong> ${movie.revenue.toLocaleString()}
                </div>
              )}
              
              <Divider />
              
              <h4>Overview</h4>
              <p>{movie.overview}</p>
              
              {movie.production_companies && movie.production_companies.length > 0 && (
                <div style={{ marginTop: '16px' }}>
                  <h4>Production Companies</h4>
                  <div>
                    {movie.production_companies.map(company => (
                      <Tag key={company.id} style={{ marginBottom: '4px' }}>{company.name}</Tag>
                    ))}
                  </div>
                </div>
              )}
              
              <div style={{ marginTop: '20px' }}>
                <Button 
                  type="primary" 
                  size="large" 
                  onClick={() => onImportMovie(movie)}
                  style={{ marginRight: '10px' }}
                >
                  Import to Theatre
                </Button>
                <Button 
                  type="default" 
                  size="large"
                  icon={<GlobalOutlined />}
                  href={`https://www.themoviedb.org/movie/${movie.id}`}
                  target="_blank"
                >
                  View on TMDB
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      );
    }
  };

  return (
    <Modal
      title={movie.title}
      visible={visible}
      onCancel={onClose}
      footer={null}
      width={800}
      bodyStyle={{ padding: '20px' }}
    >
      {renderMovieInfo()}
    </Modal>
  );
};

export default MovieDetailsModal;