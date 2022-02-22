import React from "react";

export default function HeaderMain(props) {
  return (
    <div className="header">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb" style={{ backgroundColor: "white" }}>
          <li className="breadcrumb-item">Project</li>
          <li className="breadcrumb-item">JiraNew</li>
          <li className="breadcrumb-item">Project Management</li>
          <li
            className="breadcrumb-item active font-weight-bold"
            aria-current="page"
          >
            Project {props.projectDetail.projectName}
          </li>
        </ol>
      </nav>
    </div>
  );
}
