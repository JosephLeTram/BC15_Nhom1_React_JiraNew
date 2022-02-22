import React from "react";

export default function ContentMain(props) {
  console.log(props);

  const renderCardTaskList = () => {
    return props.projectDetail.lstTask?.map((taskListDetail, index) => {
      return (
        <div
          key={index}
          className="card"
          style={{ width: "17rem", height: "25rem" }}
        >
          <div className="card-header">{taskListDetail.statusName}</div>
          <ul className="list-group list-group-flush">
            <li
              className="list-group-item"
              data-toggle="modal"
              data-target="#infoModal"
              style={{ cursor: "pointer" }}
            >
              <p>
                Each issue has a single reporter but can have multiple assignees
              </p>
              <div className="block" style={{ display: "flex" }}>
                <div className="block-left">
                  <i className="fa fa-bookmark" />
                  <i className="fa fa-arrow-up" />
                </div>
                <div className="block-right">
                  <div className="avatar-group" style={{ display: "flex" }}>
                    <div className="avatar">
                      <img
                        src={require("../../../assets/img/download (1).jfif")}
                        alt="content main img1"
                      />
                    </div>
                    <div className="avatar">
                      <img
                        src={require("../../../assets/img/download (2).jfif")}
                        alt="content main img2"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      );
    });
  };

  return (
    <div className="content" style={{ display: "flex" }}>
      {renderCardTaskList()}
    </div>
  );
}

/* <div className="card" style={{ width: "17rem", height: "25rem" }}>
        <div className="card-header">BACKLOG 3</div>
        <ul className="list-group list-group-flush">
          <li
            className="list-group-item"
            data-toggle="modal"
            data-target="#infoModal"
            style={{ cursor: "pointer" }}
          >
            <p>
              Each issue has a single reporter but can have multiple assignees
            </p>
            <div className="block" style={{ display: "flex" }}>
              <div className="block-left">
                <i className="fa fa-bookmark" />
                <i className="fa fa-arrow-up" />
              </div>
              <div className="block-right">
                <div className="avatar-group" style={{ display: "flex" }}>
                  <div className="avatar">
                    <img
                      src={require("../../../assets/img/download (1).jfif")}
                      alt="content main img1"
                    />
                  </div>
                  <div className="avatar">
                    <img
                      src={require("../../../assets/img/download (2).jfif")}
                      alt="content main img2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li className="list-group-item">
            <p>
              Each issue has a single reporter but can have multiple assignees
            </p>
            <div className="block" style={{ display: "flex" }}>
              <div className="block-left">
                <i className="fa fa-check-square" />
                <i className="fa fa-arrow-up" />
              </div>
              <div className="block-right">
                <div className="avatar-group" style={{ display: "flex" }}>
                  <div className="avatar">
                    <img
                      src={require("../../../assets/img/download (1).jfif")}
                      alt="content main img1"
                    />
                  </div>
                  <div className="avatar">
                    <img
                      src={require("../../../assets/img/download (2).jfif")}
                      alt="content main img2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li className="list-group-item">Vestibulum at eros</li>
        </ul>
      </div>
      <div className="card" style={{ width: "17rem", height: "25rem" }}>
        <div className="card-header">SELECTED FOR DEVELOPMENT 2</div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Cras justo odio</li>
          <li className="list-group-item">Dapibus ac facilisis in</li>
        </ul>
      </div>
      <div className="card" style={{ width: "17rem", height: "25rem" }}>
        <div className="card-header">IN PROGRESS 2</div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Cras justo odio</li>
          <li className="list-group-item">Dapibus ac facilisis in</li>
        </ul>
      </div>
      <div className="card" style={{ width: "17rem", height: "25rem" }}>
        <div className="card-header">DONE 3</div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Cras justo odio</li>
          <li className="list-group-item">Dapibus ac facilisis in</li>
          <li className="list-group-item">Vestibulum at eros</li>
        </ul>
      </div> */
