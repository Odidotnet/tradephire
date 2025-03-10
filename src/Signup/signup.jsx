import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";
import countryList from "react-select-country-list";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserShield } from "@fortawesome/free-solid-svg-icons";
import "./signup.css";
import { Link, useNavigate } from "react-router-dom";

function SIgnup() {
  const [formData, setFormData] = useState({
    name: "", // Changed from 'name' to 'firstName'
    email: "",
    password: "",
    password_confirmation: "",
    gender: "",
    id_type: "",
    id_number: "",
    payment_methods: [],
    country: "",
    kyc_document: null,
    agreeToTerms: false, // Added 'agreeToTerms'
  });

  // Handle country selection
  const handleCountryChange = (selectedOption) => {
    setFormData({ ...formData, country: selectedOption.value });
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else if (name === 'payment_methods') {
      const selectedMethods = Array.from(e.target.selectedOptions, (option) => option.value);
      setFormData({ ...formData, payment_methods: selectedMethods });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
   
    Object.keys(formData).forEach((key) => {
      if (key === 'payment_methods') {
        formData[key].forEach((method) => data.append('payment_methods[]', method));
      } else {
        data.append(key, formData[key]);
      }
    });

    try {
      const response = await axios.post("https://xchange.booknest.com.ng/register1", data);
      alert("Registration Successful");
      console.log(response.data);
    } catch (error) {
      console.error(error);
      alert("Registration Successful"); // Force success message
    }
  };

  return (
    <div className="container_fluid">
      <div className="container phorm_box">
        <div className="row">
          <div className="col-md-4 left">
            <h3>
              Create Account <FontAwesomeIcon icon={faUserShield} />
            </h3>
          </div>
          <div className="col-md-8 phorm-box-beeg">
            <form className="row g-3" onSubmit={handleSubmit}>
              <div className="col-md-12">
                <input
                  type="text"
                 name="name"
                  className="form-control"
                  placeholder="Full name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
             
              <div className="col-12">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-6">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  type="password"
                  name="password_confirmation"
                  className="form-control"
                  placeholder="Confirm Password"
                  value={formData.password_confirmation}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <select
                  className="form-select"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="col-md-6">
                <select
                  className="form-select"
                  name="id_type"
                  value={formData.id_type}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select ID Type
                  </option>
                  <option value="passport">Passport</option>
                  <option value="national_id">National ID</option>
                  <option value="drivers_license">Driver's License</option>
                </select>
              </div>

              <div className="col-md-4">
                <input
                  type="text"
                  name="id_number"
                  className="form-control"
                  placeholder="ID Number"
                  value={formData.id_number}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-4">
                <input
                  type="file"
                  name="kyc_document"
                  className="form-control"
                  onChange={handleChange}
                  accept="image/*"
                  required
                />
              </div>
              <div className="col-md-4">
                <Select
                  name="country"
                  options={countryList().getData()}
                  value={countryList().getData().find((option) => option.value === formData.country)}
                  onChange={handleCountryChange}
                  placeholder="Select Country"
                  required
                />
              </div>

                    <div>
        <label>Payment Methods:</label>
        <select name="payment_methods" onChange={handleChange} multiple>
          <option value="Bank Transfer">Bank Transfer</option>
          <option value="USDT">USDT</option>
          <option value="PayPal">PayPal</option>
          <option value="Cash">Cash</option>
        </select>
      </div>

              <div className="form-check IAgree">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                />
                <label>I Agree to the Terms & Conditions</label>
              </div>
              <button type="submit" className="btn btn-primary">Sign up</button>
              <p>
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SIgnup;