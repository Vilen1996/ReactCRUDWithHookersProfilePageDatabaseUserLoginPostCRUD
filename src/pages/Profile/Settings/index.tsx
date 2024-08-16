import { useState, useEffect } from "react";
import {
  updateAccountPrivacy,
  updateLogin,
  updatePassword,
} from "../../../helpers/api";
import "./index.css";
import { useOutletContext } from "react-router-dom";
import { IContext } from "../../../helpers/types";
import { useNavigate } from "react-router-dom";

export const Settings = () => {
  const { account, setAccount } = useOutletContext<IContext>();
  const [isPrivate, setIsPrivate] = useState(account.isPrivate === 1);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newLogin, setNewLogin] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPasswordUpdate, setShowPasswordUpdate] = useState(false);
  const [showLoginUpdate, setShowLoginUpdate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (account.isPrivate !== undefined) {
      setIsPrivate(account.isPrivate === 1);
    } else {
      updateAccountPrivacy(0).then((response) => {
        setIsPrivate(response.payload === "1");
      });
    }
  }, [account.isPrivate]);

  const handleToggle = async () => {
    const newPrivacyStatus = !isPrivate;
    const response = await updateAccountPrivacy(newPrivacyStatus ? 1 : 0);

    setIsPrivate(newPrivacyStatus);
    setAccount({
      ...account,
      isPrivate: response.payload as unknown as number,
    });
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    updatePassword(currentPassword, newPassword).then((response) => {
      if (response.status === "error" && response.message) {
        setErrorMessage(response.message);
      } else {
        setCurrentPassword("");
        setNewPassword("");
        navigate("/login");
      }
    });
  };

  const handleLoginUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    updateLogin(currentPassword, newLogin).then((response) => {
      if (response.status === "error" && response.message) {
        setErrorMessage(response.message);
      } else {
        setNewLogin("");
        navigate("/login");
      }
    });
  };

  return (
    <>
      <h2>Settings</h2>

      <div className="toggle-container">
        <label className="toggle-switch">
          <input type="checkbox" checked={isPrivate} onChange={handleToggle} />
          <span className="slider"></span>
        </label>
        <p>{isPrivate ? "Private Account" : "Public Account"}</p>
      </div>

      <div className="password-update">
        {!showPasswordUpdate ? (
          <button onClick={() => setShowPasswordUpdate(true)}>
            Change Password
          </button>
        ) : (
          <>
            <h3>Update Password</h3>
            <form onSubmit={handlePasswordUpdate}>
              <div className="form-group">
                <label htmlFor="currentPassword">Current Password:</label>
                <input
                  type="password"
                  id="currentPassword"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="newPassword">New Password:</label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <button type="submit">Update Password</button>
              <button
                type="button"
                onClick={() => setShowPasswordUpdate(false)}
              >
                Cancel
              </button>
            </form>
          </>
        )}
      </div>

      <div className="login-update">
        {!showLoginUpdate ? (
          <button onClick={() => setShowLoginUpdate(true)}>Change Login</button>
        ) : (
          <>
            <h3>Update Login</h3>
            <form onSubmit={handleLoginUpdate}>
              <div className="form-group">
                <label htmlFor="currentPassword">Current Password:</label>
                <input
                  type="password"
                  id="currentPassword"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="newLogin">New Login:</label>
                <input
                  type="text"
                  id="newLogin"
                  value={newLogin}
                  onChange={(e) => setNewLogin(e.target.value)}
                  required
                />
              </div>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <button type="submit">Update Login</button>
              <button type="button" onClick={() => setShowLoginUpdate(false)}>
                Cancel
              </button>
            </form>
          </>
        )}
      </div>
    </>
  );
};
