import ArchitectureIcon from "@mui/icons-material/Architecture";
import BookIcon from "@mui/icons-material/Book";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { Typography } from "@mui/material";
import { memo } from "react";
import {
  AppBar,
  InspectorButton,
  Layout,
  LayoutProps,
  Menu,
} from "react-admin";
import { ReactQueryDevtools } from "react-query/devtools";
import React  from 'react'

const MyAppBar = memo(function MyAppBar(props) {
  return (
    <AppBar id="app-bar" {...props}>
      <Typography flex="1" variant="h6" id="react-admin-title" />
      <InspectorButton />
    </AppBar>
  );
});

const MyMenu = memo(function MyMenu(props) {
  return (
    <Menu {...props}>
      <Menu.DashboardItem />
      <Menu.Item
        to="/generate-blockchain-design"
        primaryText="Blockchain Design"
        leftIcon={<ArchitectureIcon />}
      />
        <Menu.Item
            to="/add-infrastructure"
            primaryText="Infrastructure"
            leftIcon={<ArchitectureIcon />}
        />
        <Menu.Item
            to="/infrastructures"
            primaryText="infrastructures"
            leftIcon={<ArchitectureIcon />}
        />
        <Menu.Item
            to="/experiments"
            primaryText="experiments"
            leftIcon={<ArchitectureIcon />}
        />
      {/* <Menu.Item to="/posts" primaryText="Posts" leftIcon={<BookIcon />} />
    <Menu.Item
      to="/comments"
      primaryText="Comments"
      leftIcon={<ChatBubbleIcon />}
    /> */}
    </Menu>
  );
});

const MyLayout = (props: JSX.IntrinsicAttributes & LayoutProps) => (
  <>
    <Layout {...props} appBar={MyAppBar} menu={MyMenu} />
    <ReactQueryDevtools
      initialIsOpen={false}
      toggleButtonProps={{ style: { width: 20, height: 30 } }}
    />
  </>
);

export default MyLayout;
