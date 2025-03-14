import React, { useState, useEffect } from "react";
import axios from "axios";
import "./profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faCircleUser, faUserXmark, faUpload, faPen } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    country: "",
    profilePicture: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch user data on component mount
  useEffect(() => {
    axios
      .get("/api/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        setUser(response.data);
        setImage(response.data.profilePicture);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  }, []);

  // Handle profile picture upload
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  // Handle password reset
  const handleResetPassword = () => {
    if (!newPassword) {
      alert("Please enter a new password.");
      return;
    }

    axios
      .post(
        "/api/reset-password",
        { password: newPassword },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      )
      .then(() => alert("Password reset successfully!"))
      .catch((error) => console.error("Error resetting password:", error));
  };

  // Handle input changes for profile editing
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Handle profile deletion
  const handleDeleteProfile = () => {
    if (window.confirm("Are you sure you want to delete your profile? This action cannot be undone.")) {
      setIsDeleting(true);
      axios
        .delete("/api/profile/destroy", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        })
        .then(() => {
          toast.success("Profile deleted successfully!");
          localStorage.removeItem("authToken");
          navigate("/login");
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 401) {
              toast.error("You are not authorized to perform this action.");
            } else if (error.response.status === 404) {
              toast.error("Profile not found.");
            } else {
              toast.error("An unexpected error occurred. Please try again.");
            }
          } else {
            console.error("Error deleting profile:", error);
            toast.error("Failed to delete profile. Please check your connection and try again.");
          }
        })
        .finally(() => {
          setIsDeleting(false);
        });
    }
  };

  // Handle logout
  const handleLogout = () => {
    axios
      .post(
        "/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      )
      .then(() => {
        alert("Logged out successfully!");
        navigate("/login");
      })
      .catch((error) => console.error("Error logging out:", error));
  };

  // Handle profile save
  const handleSave = () => {
    axios
      .put(
        "https://xchange.booknest.com.ng/api/update",
        user,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      )
      .then(() => {
        toast.success("Profile updated successfully!");
        setEditing(false);
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        toast.error("Failed to update profile. Please try again.");
      });
  };

  return (
    <div className="container-fluid">
      <ToastContainer /> {/* Toast notifications container */}
      <div className="row">
        <div className="line">
          <h5 className="icon">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </h5>
          <h5 className="icon">
            <FontAwesomeIcon icon={faCircleUser} />
          </h5>
          <h5
            className="icon"
            onClick={!isDeleting ? handleDeleteProfile : undefined}
          >
            <FontAwesomeIcon icon={faUserXmark} aria-label="Delete Account" />
            <span className="icon-del">Delete Account</span>
          </h5>
        </div>
      </div>
      <div className="container-fluid kon2">
        <div className="container kon3">
          <div className="row">
            <div className="col-md-3 lepht">
              <h5 className="lepht-head">Account</h5>

              {[
                // Sidebar items
                {
                  title: "Personal Info",
                  text: "Update your Profile, Contact details, and Preferences.",
                },
                {
                  title: "Preferences",
                  text: "Tailor your Dashboard experience with custom settings and options.",
                },
                {
                  title: "Language & localization",
                  text: "Choose your preferred language and adjust your location settings.",
                },
                {
                  title: "Notifications",
                  text: "Control how you receive updates and alerts from the dashboard.",
                },
              ].map((item, index) => (
                <div className="card mb-2" key={index}>
                  <div className="card-header">{item.title}</div>
                  <div className="card-body">
                    <p className="card-text">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="col-md-8 right">
              <nav style={{ "--bs-breadcrumb-divider": "''" }}>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Personal info
                  </li>
                </ol>
              </nav>

              <div className="card p-4">
                <h4 className="mb-3">Personal Info</h4>
                <p className="text-muted">
                  Update your Profile, Contact details, and Preferences.
                </p>
                <hr />

                {/* Profile Picture Section */}
                <div className="mb-4 text-center">
                  <img
                    src={image || "https://via.placeholder.com/100"}
                    alt="Profile"
                    className="profile-image border shadow-sm"
                  />
                  <div className="mt-2">
                    <label
                      htmlFor="file-upload"
                      className="btn btn-outline-primary btn-sm"
                    >
                      <FontAwesomeIcon icon={faUpload} /> Upload Image
                    </label>
                    <button
                      className="btn btn-outline-danger btn-sm ms-2"
                      onClick={() => setImage(null)}
                    >
                      Remove
                    </button>
                  </div>
                  <input
                    type="file"
                    id="file-upload"
                    accept="image/*"
                    className="d-none"
                    onChange={handleImageChange}
                  />
                </div>

                {/* Editable Profile Form */}
                <form>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        readOnly={!editing}
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={user.email}
                        readOnly
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Phone Number</label>
                      <input
                        type="text"
                        className="form-control"
                        name="phone"
                        value={user.phone}
                        onChange={handleChange}
                        readOnly={!editing}
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Address</label>
                      <input
                        type="text"
                        className="form-control"
                        name="address"
                        value={user.address}
                        onChange={handleChange}
                        readOnly={!editing}
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Country</label>
                      <input
                        type="text"
                        className="form-control"
                        name="country"
                        value={user.country}
                        onChange={handleChange}
                        readOnly={!editing}
                      />
                    </div>
                  </div>

                  {/* Edit & Save Buttons */}
                  <ToastContainer />
                  <div className="d-flex justify-content-end">
                    {editing ? (
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={handleSave}
                      >
                        Save Changes
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => setEditing(true)}
                      >
                        <FontAwesomeIcon icon={faPen} /> Edit Profile
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;