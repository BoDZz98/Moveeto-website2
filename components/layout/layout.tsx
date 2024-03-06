import React from "react";
import Header from "./Header";
import SideBar from "./SideBar";

type LayoutProps = {
  children: React.ReactNode;
};
const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col px-16 py-10 bg-gray-900 ">
      <Header />
      <div className="flex w-full">
        <SideBar />
        <div className="w-full h-fit ">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
