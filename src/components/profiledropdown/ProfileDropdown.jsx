import React from "react";
import './ProfileDropdown.css'

const ProfileDropdown = ({ isLoggedIn }) => {
  return (
    <div>
      {isLoggedIn ? (
        <ul className="profile-dd-list">
          <li className="profile-dd-item">Profile</li>
          <li className="profile-dd-item">Stories</li>
          <li className="profile-dd-item">Library</li>
          <li className="profile-dd-item">Settings</li>
          <li className="profile-dd-item">Logout</li>
        </ul>
      ) : null}
    </div>
  );
};

export default ProfileDropdown;
