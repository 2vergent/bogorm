import React from "react";
import { Layout, Image, Input, Avatar, Dropdown } from "antd";
import {
  SearchOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import BogormLogo from "../assets/icons/bogorm_logo_transparent.png";
import { useNavigate } from "react-router";

const { Header } = Layout;
const { Search } = Input;

const BogormHeader = ({ onSearch }) => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  const items = [
    {
      label: "Log Out",
      key: "1",
      icon: <LogoutOutlined />,
      onClick: handleLogOut,
    },
  ];

  return (
    <Header id="header">
      <div className="bogorm-logo" onClick={() => navigate("/home")}>
        <Image id="bogorm" src={BogormLogo} preview={false} width={125} />
      </div>
      <Search
        placeholder="Search Books"
        enterButton={<SearchOutlined />}
        size="large"
        allowClear
        onPressEnter={onSearch}
        onChange={onSearch}
      />
      <Dropdown menu={{ items }} trigger={["click"]}>
        <Avatar
          className="user-icon"
          icon={<UserOutlined />}
          style={{ cursor: "pointer" }}
        />
      </Dropdown>
    </Header>
  );
};

export default BogormHeader;
