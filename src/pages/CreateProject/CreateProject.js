import React from "react";

export default function CreateProject() {
  return (
    <div className="container m-5">
      {/* relative Link  */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb" style={{ backgroundColor: "white" }}>
          <li className="breadcrumb-item">Project</li>
          <li className="breadcrumb-item">CyberLearn</li>
          <li className="breadcrumb-item active" aria-current="page">
            Cyber Board
          </li>
        </ol>
      </nav>
      {/* Create New Project Form */}
      <h3 className="container">Create Project</h3>
      <form className="container">
        <div className="form-group">
          <p>Name</p>
          <input className="form-control" name="projectName" />
        </div>
        <div className="form-group">
          <p>Description</p>
          <input className="form-control" name="description" />
        </div>
        <div className="form-group">
          <select name="categoryId" className="form-control">
            <option>Software</option>
            <option>Web</option>
            <option>App</option>
          </select>
        </div>
        <button type="submit" className="btn btn-outline-primary">
          Create Project
        </button>
      </form>
    </div>
  );
}
