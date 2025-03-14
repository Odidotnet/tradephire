import React, { useState } from 'react';
import axios from 'axios';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value.trim() }); // Trim whitespace
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { email, password } = formData;

    try {
      const response = await axios.post(
        'https://xchange.booknest.com.ng/api/login',
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        }
      );if (response.data.success) {
        window.location.href = response.data.redirect; // Redirect to React dashboard
      }

      console.log('Login response:', response.data);

      if (response.status === 200) {
        // Extract token from response
        const token = response.data.token || response.data.access_token;
        if (!token) {
          alert("Login successful, but no token received.");
          return;
        }

        // Store token and user data
        localStorage.setItem('authToken', token);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', email);

        // Fetch dashboard data before navigating
        await fetchDashboardData();

        // Redirect to dashboard
        navigate('/login/dashboard'); // Update path

        window.location.href = '/Dashboard';
      } else {
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error(
        'Login error:',
        error.response ? error.response.data : error.message
      );
      if (error.response) {
        console.log('Response data:', error.response.data);
        console.log('Response status:', error.response.status);
        console.log('Response headers:', error.response.headers);
      }
      alert(
        error.response
          ? error.response.data.message
          : 'An error occurred during login. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch protected dashboard data
  const fetchDashboardData = async () => {
    const token = localStorage.getItem('authToken');
  
    if (!token) {
      console.error("No authentication token found.");
      return;
    }
  
    try {
      const response = await axios.get(
        '/dashboard/Dashboard', // Update to match your backend URL
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        }
      );
  
      console.log('Dashboard Data:', response.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };
  

  return (
    <div className="container-fluid">
      <div className="container phorm_box">
        <div className="row">
          <div className="col-md-6 phorm-box-beeg">
            <form className="row g-3" onSubmit={handleSubmit}>
              <div className="col-md-12">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-12">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-check IAgree">
                <input className="form-check-input" type="checkbox" id="rememberMe" />
                <label className="form-check-label" htmlFor="rememberMe">
                  Remember me
                </label>
              </div>

              <button type="submit" className="btn btn-primary" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
              <br />

              <div className="log">
                <p>
                  Don't have an account? <Link to="/">Sign up</Link>
                </p>
              </div>
            </form>
          </div>
          <div className="col-md-6 left">
            <h3>Welcome Back!</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
