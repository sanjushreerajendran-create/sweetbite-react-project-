import { FiBell } from "react-icons/fi";

function Header({ title, subtitle }) {
  const user = JSON.parse(
    localStorage.getItem("sweetbiteUser") || "{}"
  );

  return (
    <header className="header">
      <div className="header-title">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      <div className="header-right">
        <button className="notification-button">
          <FiBell />
          <span></span>
        </button>

        <div className="user-profile">
          <div className="user-avatar">
            {user.name
              ? user.name.charAt(0).toUpperCase()
              : "A"}
          </div>

          <div className="user-info">
            <strong>
              {user.name || "SweetBite Admin"}
            </strong>

            <span>Administrator</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;