import React from "react";
import ContentMain from "../GlobalSetting/DashboardComponent/MainBoardComponent/ContentMain";
import HeaderMain from "../GlobalSetting/DashboardComponent/MainBoardComponent/HeaderMain";
import InfoMain from "../GlobalSetting/DashboardComponent/MainBoardComponent/InfoMain";

export default function JiraDashboard() {
  return (
    <div className="main">
      {/* HEADER MAIN */}
      <HeaderMain />
      <h3>Cyber Board</h3>
      {/* INFO MAIN */}
      <InfoMain />
      {/* CONTENT MAIN */}
      <ContentMain />
    </div>
  );
}
