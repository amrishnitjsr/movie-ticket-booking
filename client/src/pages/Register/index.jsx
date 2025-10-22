// Importing the necessary libraries and components
import React, { useEffect } from "react";
import { Form, message, Input, Button, Card, Typography, Row, Col, Divider, Checkbox } from "antd";
import { UserOutlined, MailOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone, UserAddOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { RegisterUser } from "../../apicalls/users";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";

const { Title, Text } = Typography;

// Defining the 'Register' functional component
function Register() {
  const dispatch = useDispatch(); // Creating a dispatch function using the 'useDispatch' hook from the 'react-redux' library
  const navigate = useNavigate(); // Creating a navigate function using the 'useNavigate' hook from the 'react-router-dom' library

  // Callback function for form submission
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading()); // Dispatching the 'ShowLoading' action to show the loading indicator
      const response = await RegisterUser(values); // Making an asynchronous API call to register the user
      dispatch(HideLoading()); // Dispatching the 'HideLoading' action to hide the loading indicator
      if (response.success) {
        message.success(response.message); // Displaying a success message using the 'message' component from the 'antd' library
      } else {
        message.error(response.message); // Displaying an error message using the 'message' component from the 'antd' library
      }
    } catch (error) {
      dispatch(HideLoading()); // Dispatching the 'HideLoading' action to hide the loading indicator
      message.error(error.message); // Handling API call errors and displaying an error message
    }
  };

  // useEffect hook to check if the user is already logged in and redirect to the homepage if a token is present
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/"); // Redirecting the user to the homepage using the 'navigate' function
    }
  }, [navigate]);

  // JSX code representing the UI of the 'Register' component
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <Row justify="center" align="middle" style={{ width: '100%', maxWidth: '1200px' }}>
        <Col xs={24} sm={20} md={16} lg={12} xl={10}>
          <Card 
            style={{ 
              borderRadius: '16px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              border: 'none',
              overflow: 'hidden'
            }}
          >
            {/* Header Section */}
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div style={{ 
                fontSize: '48px', 
                marginBottom: '16px',
                background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 'bold'
              }}>
                🎬
              </div>
              <Title level={2} style={{ margin: 0, color: '#1a1a1a' }}>
                Join BookMyMovie
              </Title>
              <Text type="secondary" style={{ fontSize: '16px' }}>
                Create your account and start booking amazing movies
              </Text>
            </div>

            {/* Registration Form */}
            <Form layout="vertical" onFinish={onFinish} size="large">
              <Form.Item
                label="Full Name"
                name="name"
                rules={[
                  { required: true, message: "Please enter your full name!" },
                  { min: 2, message: "Name must be at least 2 characters!" }
                ]}
              >
                <Input
                  prefix={<UserOutlined style={{ color: '#764ba2' }} />}
                  placeholder="Enter your full name"
                  style={{ borderRadius: '8px', padding: '12px' }}
                />
              </Form.Item>

              <Form.Item
                label="Email Address"
                name="email"
                rules={[
                  { required: true, message: "Please enter your email!" },
                  { type: 'email', message: "Please enter a valid email!" }
                ]}
              >
                <Input
                  prefix={<MailOutlined style={{ color: '#764ba2' }} />}
                  placeholder="Enter your email address"
                  style={{ borderRadius: '8px', padding: '12px' }}
                />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please create a password!" },
                  { min: 6, message: "Password must be at least 6 characters!" },
                  { 
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                    message: "Password must contain at least one uppercase letter, one lowercase letter, and one number!"
                  }
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined style={{ color: '#764ba2' }} />}
                  placeholder="Create a strong password"
                  iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  style={{ borderRadius: '8px', padding: '12px' }}
                />
              </Form.Item>

              <Form.Item
                label="Confirm Password"
                name="confirmPassword"
                dependencies={['password']}
                rules={[
                  { required: true, message: "Please confirm your password!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('The two passwords do not match!'));
                    },
                  }),
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined style={{ color: '#764ba2' }} />}
                  placeholder="Confirm your password"
                  iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  style={{ borderRadius: '8px', padding: '12px' }}
                />
              </Form.Item>

              {/* Admin Role Selection */}
              <Form.Item
                name="isAdmin"
                valuePropName="checked"
                style={{ marginTop: '16px' }}
              >
                <Checkbox style={{ fontSize: '14px', color: '#666' }}>
                  <span style={{ marginLeft: '8px' }}>
                    Register as Admin
                    <Text type="secondary" style={{ display: 'block', fontSize: '12px', marginLeft: '0px' }}>
                      Check this box if you want admin privileges to manage movies, theatres, and bookings
                    </Text>
                  </span>
                </Checkbox>
              </Form.Item>

              <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                  { 
                    validator: (_, value) =>
                      value ? Promise.resolve() : Promise.reject(new Error('Please accept the terms and conditions!')),
                  },
                ]}
              >
                <Checkbox>
                  I agree to the <Link to="/terms" style={{ color: '#764ba2' }}>Terms of Service</Link> and{' '}
                  <Link to="/privacy" style={{ color: '#764ba2' }}>Privacy Policy</Link>
                </Checkbox>
              </Form.Item>

              <Form.Item style={{ marginBottom: '16px' }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  icon={<UserAddOutlined />}
                  style={{
                    height: '48px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                    border: 'none',
                    fontSize: '16px',
                    fontWeight: '500'
                  }}
                >
                  Create Account
                </Button>
              </Form.Item>

              <Divider style={{ margin: '24px 0' }}>
                <Text type="secondary">Already have an account?</Text>
              </Divider>

              <div style={{ textAlign: 'center' }}>
                <Text>
                  Already a member?{' '}
                  <Link 
                    to="/login" 
                    style={{ 
                      color: '#764ba2', 
                      fontWeight: '500',
                      textDecoration: 'none'
                    }}
                  >
                    Sign In
                  </Link>
                </Text>
              </div>
            </Form>

            {/* Benefits Section */}
            <div style={{ 
              marginTop: '24px', 
              padding: '16px', 
              background: '#f8f9fa', 
              borderRadius: '8px',
              border: '1px solid #e9ecef'
            }}>
              <Text strong style={{ display: 'block', marginBottom: '8px', color: '#495057' }}>
                Why join BookMyMovie?
              </Text>
              <ul style={{ margin: 0, paddingLeft: '20px', color: '#6c757d', fontSize: '13px' }}>
                <li>🎟️ Easy online movie ticket booking</li>
                <li>🎬 Access to latest movies and showtimes</li>
                <li>💳 Secure payment processing</li>
                <li>📱 Mobile-friendly booking experience</li>
              </ul>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

// Exporting the 'Register' component as the default export
export default Register;