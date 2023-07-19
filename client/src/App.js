import React, { useState } from "react";
// import { NotificationContainer } from "react-notifications";
import Routes from "./components/Routes";
import AuthContext from "./context/AuthContext";
import UserStore from "./context/store/UserStore";
import TeamStore from "./context/store/TeamStore";
import TaskStore from "./context/store/TaskStore";
import ProjectStore from "./context/store/ProjectStore";
import TasklistStore from "./context/store/TasklistStore";
import "./css/Home.css";

const App = () => {
  const [auth, setAuth] = useState(localStorage.getItem("token") || "");
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);
  const [email, setEmail] = useState(localStorage.getItem("email") || null);
  const [user, setUser] = useState(localStorage.getItem("user") || null);

  const [sidebar, setSidebar] = useState(true);
  const showSidebar = () => setSidebar(!sidebar);
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("userId");
    setAuth(null);
    setEmail(null);
    setUserId(null);
  };

  // const triggerNotification = (text, title, type) => {
  //   const { actions } = useContext(AlertContext);
  //   actions.addAlert({
  //     text: text,
  //     title: title,
  //     type: type,
  //     id: Date.now(), // lazy way of adding unique id per alert
  //   });
  // };

  const context = {
    auth,
    setAuth,
    userId,
    setUserId,
    email,
    setEmail,
    user,
    setUser,
    sidebar,
    setSidebar,
    showSidebar,
    logout,
  };

  return (
    <AuthContext.Provider value={context}>
      <UserStore>
        <ProjectStore>
          <TeamStore>
            <TasklistStore>
              <TaskStore>
                <Routes />
              </TaskStore>
            </TasklistStore>
          </TeamStore>
        </ProjectStore>
      </UserStore>
    </AuthContext.Provider>
  );
};

export default App;
