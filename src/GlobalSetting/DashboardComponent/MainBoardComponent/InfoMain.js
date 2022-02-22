import React from "react";
import ReactHtmlParser from "react-html-parser";

export default function InfoMain(props) {
  const renderUser = () => {
    return props.projectDetail.members?.map((member, index) => {
      return (
        <div className="avatar" key={index}>
          <img src={member.avatar} alt={member.avatar} />
        </div>
      );
    });
  };

  return (
    <>
      <section>{ReactHtmlParser(props.projectDetail.description)}</section>
      <div className="info" style={{ display: "flex" }}>
        <div className="search-block">
          <input className="search" />
          <i className="fa fa-search" />
        </div>
        <div className="avatar-group" style={{ display: "flex" }}>
          {renderUser()}
        </div>
        <div style={{ marginLeft: 20 }} className="text">
          Only My Issues
        </div>
        <div style={{ marginLeft: 20 }} className="text">
          Recently Updated
        </div>
      </div>
    </>
  );
}
