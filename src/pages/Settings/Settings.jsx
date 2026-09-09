import { useEffect, useState } from "react";
import { FiUser, FiLock, FiSun, FiMoon, FiSave,} from "react-icons/fi";

import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";

function Settings() {
  const savedUser = JSON.parse(localStorage.getItem("sweetbiteUser") || "{}");
  const savedTheme = localStorage.getItem("sweetbiteTheme") || "light";
  const [profile, setProfile] = useState({
    name: savedUser.name || "SweetBite Admin",
    email: savedUser.email || "admin@sweetbite.com",
  });
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [theme, setTheme] = useState(savedTheme);
  const [profileMessage, setProfileMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      theme
    );

    localStorage.setItem(
      "sweetbiteTheme",
      theme
    );
  }, [theme]);

  const handleProfileChange = (event) => {
    const { name, value } = event.target;

    setProfile((previousProfile) => ({
      ...previousProfile,
      [name]: value,
    }));
  };

  const handleProfileSubmit = (event) => {
    event.preventDefault();

    localStorage.setItem(
      "sweetbiteUser",
      JSON.stringify(profile)
    );

    setProfileMessage(
      "Profile updated successfully!"
    );

    setTimeout(() => {
      setProfileMessage("");
    }, 3000);
  };
  const handlePasswordChange = (event) => {
    const { name, value } = event.target;

    setPasswords((previousPasswords) => ({
      ...previousPasswords,
      [name]: value,
    }));
  };
  const handlePasswordSubmit = (event) => {
    event.preventDefault();

    setPasswordError("");
    setPasswordMessage("");
    if (
      !passwords.currentPassword ||
      !passwords.newPassword ||
      !passwords.confirmPassword
    ) {
      setPasswordError(
        "Please fill in all password fields."
      );
      return;
    }
    if (
      passwords.newPassword !==
      passwords.confirmPassword
    ) {
      setPasswordError(
        "New passwords do not match."
      );
      return;
    }
    if (passwords.newPassword.length < 6) {
      setPasswordError(
        "New password must contain at least 6 characters."
      );
      return;
    }
    setPasswordMessage(
      "Password updated successfully!"
    );

    setPasswords({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setTimeout(() => {
      setPasswordMessage("");
    }, 3000);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">
        <Header title="Settings" subtitle="Manage your SweetBite account and preferences."/>
        <div className="settings-container">

          <section className="settings-card glass-card">
            <div className="settings-card-header">
              <div className="settings-icon">
                <FiUser />
              </div>

              <div>
                <h2>Profile Information</h2>
                <p> Update your account information.</p>
              </div>
            </div>

            {profileMessage && (
              <div className="settings-success">
                {profileMessage}
              </div>
            )}

            <form onSubmit={handleProfileSubmit}>
              <div className="settings-form-grid">

                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" name="name" value={profile.name} onChange={handleProfileChange}/>
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" name="email" value={profile.email} onChange={handleProfileChange}/>
                </div>
             </div>
             <button type="submit" className="settings-save-button">
                <FiSave />
                Save Profile
              </button>
            </form>
          </section>

          <section className="settings-card glass-card">
            <div className="settings-card-header">
              <div className="settings-icon password-icon">
                <FiLock />
              </div>
              <div>
                <h2>Change Password</h2>
                <p>Update your account password.</p>
              </div>
            </div>

            {passwordError && (
              <div className="settings-error">
                {passwordError}
              </div>
            )}

            {passwordMessage && (
              <div className="settings-success">
                {passwordMessage}
              </div>
            )}

            <form onSubmit={handlePasswordSubmit}>
              <div className="password-form">

                <div className="form-group">
                  <label>Current Password</label>
                  <input type="password" name="currentPassword" placeholder="Enter current password" value={passwords.currentPassword} onChange={handlePasswordChange} />
                </div>

                <div className="form-group">
                  <label>New Password</label>
                  <input type="password" name="newPassword" placeholder="Enter new password" value={passwords.newPassword} onChange={handlePasswordChange}/>
                </div>

                <div className="form-group">
                  <label>Confirm New Password</label>
                  <input type="password" name="confirmPassword" placeholder="Confirm new password" value={passwords.confirmPassword} onChange={handlePasswordChange}/>
                </div>

              </div>

              <button type="submit" className="settings-save-button">
                <FiLock />
                Change Password
              </button>
            </form>
          </section>

          <section className="settings-card glass-card">
            <div className="settings-card-header">
              <div className="settings-icon theme-icon">
                {theme === "light" ? (
                  <FiSun />
                ) : (
                  <FiMoon />
                )}
              </div>

              <div>
                <h2>Appearance</h2>
                <p>Choose your preferred dashboard theme.</p>
              </div>
            </div>

            <div className="theme-options">
              <button className={`theme-option ${theme === "light" ? "selected-theme": ""}`} onClick={() => setTheme("light")}>
                <FiSun />

                <div>
                  <strong>Light Mode</strong>
                  <span> Bright and clean appearance</span>
                </div>
              </button>
              <button className={`theme-option ${theme === "dark"? "selected-theme": "" }`} onClick={() => setTheme("dark")}>
                <FiMoon />

                <div>
                  <strong>Dark Mode</strong>
                  <span> Dark and comfortable appearance</span>
                </div>
              </button>

            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
export default Settings;