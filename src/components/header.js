import React from "react";
import { Layout, Image, Input, Avatar } from "antd";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import BogormLogo from "../assets/icons/bogorm_logo_transparent.png";
import { useNavigate } from "react-router";

const { Header } = Layout;
const { Search } = Input;

const BogormHeader = ({ onSearch, onAvatarClick }) => {
  const navigate = useNavigate();

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
      />
      <Avatar
        className="user-icon"
        icon={<UserOutlined />}
        onClick={onAvatarClick}
      />
    </Header>
  );
};

export default BogormHeader;
