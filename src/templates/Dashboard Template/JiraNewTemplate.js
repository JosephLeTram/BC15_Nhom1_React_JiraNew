import "../../index.css";
import { Route } from "react-router-dom";
import SideBar from "../../GlobalSetting/DashboardComponent/SideBarComponent/SideBar";
import Menu from "../../GlobalSetting/DashboardComponent/SideBarComponent/Menu";

import InfoModal from "../../GlobalSetting/DashboardComponent/ModalComponent/InfoModal";
import SearchModal from "../../GlobalSetting/DashboardComponent/ModalComponent/SearchModal";

export const JiraNewTemplate = (props) => {
  const { Component, ...restParam } = props;
  return (
    <Route
      {...restParam}
      render={(propsRoute) => {
        return (
          <>
            <div className="jira">
              {/* SIDE BAR */}
              <SideBar />
              {/* MENU */}
              <Menu />
              {/* MAIN BOARD */}
              <Component {...propsRoute} />
              {/* INFO MODAL */}
              <InfoModal />
              {/* SEARCH MODAL */}
              <SearchModal />
            </div>
          </>
        );
      }}
    />
  );
};
