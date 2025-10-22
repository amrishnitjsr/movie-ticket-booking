// Importing the necessary libraries and components
import React, { useEffect } from "react";
import { Form, message, Input, Button, Card, Typography, Row, Col, Divider } from "antd";
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone, LoginOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser, GetCurrentUser } from "../../apicalls/users";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";

const { Title, Text } = Typography;

// Defining the 'Register' functional component
function Register() {
  const navigate = useNavigate(); // Creating a navigate function using the 'useNavigate' hook from the 'react-router-dom' library
  const dispatch = useDispatch(); // Creating a dispatch function using the 'useDispatch' hook from the 'react-redux' library
  // Creating a function 'onFinish' that will be called when the form is submitted successfully
  const onFinish = async (values) => {
    // console.log("Success:", values); // Output the form values to the console

    try {
      dispatch(ShowLoading()); // Dispatching the 'ShowLoading' action to show the loading indicator
      const response = await LoginUser(values); // Calling the 'LoginUser' function with the form values as the argument
      dispatch(HideLoading()); // Dispatching the 'HideLoading' action to hide the loading indicator
      if (response.success) {
        message.success(response.message); // Displaying a success message if the login was successful
        localStorage.setItem("token", response.data); // Storing the JWT token in the browser's local storage

        // Check if user is admin and redirect accordingly
        // We'll fetch user data to check admin status
        const userResponse = await GetCurrentUser();
        if (userResponse.success && userResponse.data.isAdmin) {
          window.location.href = "/admin"; // Redirect admin to admin panel
        } else {
          window.location.href = "/"; // Redirect regular user to home page
        }
      } else {
        message.error(response.message); // Displaying an error message if the login was unsuccessful
      }
    } catch (error) {
      dispatch(HideLoading()); // Dispatching the 'HideLoading' action to hide the loading indicator
      message.error(error.message); // Displaying an error message if an error occurred while processing the request
    }
  };

  // The 'useEffect' hook runs once after the component is mounted
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/"); // If a token is found in local storage, redirect the user to the home page
    }
  }, [navigate]);

  // Rendering the component's UI using JSX
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 'bold'
              }}>
                🎬
              </div>
              <Title level={2} style={{ margin: 0, color: '#1a1a1a' }}>
                Welcome Back
              </Title>
              <Text type="secondary" style={{ fontSize: '16px' }}>
                Sign in to BookMyMovie and discover amazing films
              </Text>
            </div>

            {/* Login Form */}
            <Form layout="vertical" onFinish={onFinish} size="large">
              <Form.Item
                label="Email Address"
                name="email"
                rules={[
                  { required: true, message: "Please enter your email!" },
                  { type: 'email', message: "Please enter a valid email!" }
                ]}
              >
                <Input
                  prefix={<UserOutlined style={{ color: '#667eea' }} />}
                  placeholder="Enter your email address"
                  style={{ borderRadius: '8px', padding: '12px' }}
                />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please enter your password!" },
                  { min: 6, message: "Password must be at least 6 characters!" }
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined style={{ color: '#667eea' }} />}
                  placeholder="Enter your password"
                  iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  style={{ borderRadius: '8px', padding: '12px' }}
                />
              </Form.Item>

              <Form.Item style={{ marginBottom: '16px' }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  icon={<LoginOutlined />}
                  style={{
                    height: '48px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none',
                    fontSize: '16px',
                    fontWeight: '500'
                  }}
                >
                  Sign In
                </Button>
              </Form.Item>

              <Divider style={{ margin: '24px 0' }}>
                <Text type="secondary">New to BookMyMovie?</Text>
              </Divider>

              <div style={{ textAlign: 'center' }}>
                <Text>
                  Don't have an account?{' '}
                  <Link
                    to="/register"
                    style={{
                      color: '#667eea',
                      fontWeight: '500',
                      textDecoration: 'none'
                    }}
                  >
                    Create Account
                  </Link>
                </Text>
              </div>
            </Form>

            {/* Demo Credentials */}
            <div style={{
              marginTop: '24px',
              padding: '16px',
              background: '#f8f9fa',
              borderRadius: '8px',
              border: '1px solid #e9ecef'
            }}>
              <Text strong style={{ display: 'block', marginBottom: '8px', color: '#495057' }}>
                Demo Credentials:
              </Text>
              <Text style={{ display: 'block', fontSize: '13px', color: '#6c757d' }}>
                <strong>Admin:</strong> admin@bookmymovie.com / password123
              </Text>
              <Text style={{ display: 'block', fontSize: '13px', color: '#6c757d' }}>
                <strong>User:</strong> user@bookmymovie.com / password123
              </Text>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

// Exporting the 'Login' component as the default export
export default Register;