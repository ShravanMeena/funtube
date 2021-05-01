/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import axios from "axios";
import { USER_SERVER } from "../../../Config";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { VideoCameraAddOutlined, UserOutlined } from "@ant-design/icons";

import { Menu } from "antd";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
function RightMenu(props) {
  const user = useSelector((state) => state.user);

  const logoutHandler = () => {
    localStorage.removeItem("userId");
    setTimeout(() => {
      window.location.reload();
    }, 200);
    axios.get(`${USER_SERVER}/logout`).then((response) => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert("Log Out Failed");
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key='mail'>
          <a href='/login'>Login</a>
        </Menu.Item>
        <Menu.Item key='app'>
          <a href='/register'>Register</a>
        </Menu.Item>
      </Menu>
    );
  } else {
    return (
      <Menu mode={props.mode}>
        <SubMenu
          key='setting:0'
          title={
            <VideoCameraAddOutlined
              style={{ fontSize: "25px", color: "#08c" }}
            />
            // <span>Upload</span>
          }>
          <Menu.Item
            onClick={() => props.history.push("/video/upload")}
            key='setting:1'>
            Upload video
          </Menu.Item>
          <Menu.Item key='setting:2'>Go live</Menu.Item>
        </SubMenu>

        <SubMenu
          key='setting:10'
          title={<UserOutlined style={{ fontSize: "25px", color: "#08c" }} />}>
          <Menu.Item
            onClick={() =>
              props.history.push(`/user/${localStorage.getItem("userId")}`)
            }
            key='setting:5'>
            My Profile
          </Menu.Item>
          <Menu.Item
            onClick={() => props.history.push("/my-videos")}
            key='setting:3'>
            My videos
          </Menu.Item>
          <Menu.Item key='setting:2'>
            <a onClick={logoutHandler}>Logout</a>
          </Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}

export default withRouter(RightMenu);
