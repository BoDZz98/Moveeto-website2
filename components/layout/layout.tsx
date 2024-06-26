import React from "react";
import Header from "./Header";
import SideBar from "./SideBar";

type LayoutProps = {
  sideBarNotVisible?: boolean;
  children: React.ReactNode;
};
const Layout = ({ children, sideBarNotVisible }: LayoutProps) => {
  return (
    <div className="flex flex-col px-16 py-10 bg-gray-900 min-h-screen overflow-x-hidden ">
      <Header />
      <div className="flex w-full">
        {!sideBarNotVisible && <SideBar />}
        <div className="w-full h-fit mb-52 ">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
