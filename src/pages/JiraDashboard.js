import React, { useEffect } from "react";
import ContentMain from "../GlobalSetting/DashboardComponent/MainBoardComponent/ContentMain";
import HeaderMain from "../GlobalSetting/DashboardComponent/MainBoardComponent/HeaderMain";
import InfoMain from "../GlobalSetting/DashboardComponent/MainBoardComponent/InfoMain";
import { useSelector, useDispatch } from "react-redux";
import { GET_PROJECT_DETAIL_SAGA } from "../redux/constants/JiraNewConstants";

export default function JiraDashboard(props) {
  // Retrieve data from API

  const { projectDetail } = useSelector((state) => state.ProjectEditReducer);
  // dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    // retrieve data from url variables => call Saga
    const { projectId } = props.match.params;
    dispatch({
      type: GET_PROJECT_DETAIL_SAGA,
      projectId: projectId,
    });
  }, []);

  return (
    <div className="main">
      {/* HEADER MAIN */}
      <HeaderMain projectDetail={projectDetail} />
      <h3>Project {projectDetail.projectName}</h3>
      {/* INFO MAIN */}
      <InfoMain projectDetail={projectDetail} />

      {/* CONTENT MAIN */}
      <ContentMain projectDetail={projectDetail} />
    </div>
  );
}
