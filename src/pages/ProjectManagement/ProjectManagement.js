import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button, Space, Tag } from "antd";
import ReactHtmlParser from "react-html-parser";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { GET_PROJECT_LIST_SAGA } from "../../redux/constants/JiraNewConstants";

export default function ProjectManagement(props) {
  //retrieve Project List data from Reducer to Component
  const projectList = useSelector(
    (state) => state.ProjectListReducer.projectList
  );

  // useDispatch call API
  const dispatch = useDispatch();

  // useEffect
  useEffect(() => {
    dispatch({
      type: GET_PROJECT_LIST_SAGA,
    });
  }, []);

  const [state, setState] = useState({
    filteredInfo: null,
    sortedInfo: null,
  });

  const handleChange = (pagination, filters, sorter) => {
    setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  const clearFilters = () => {
    setState({ filteredInfo: null });
  };

  const clearAll = () => {
    setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };

  const setIdSort = () => {
    setState({
      sortedInfo: {
        order: "descend",
        columnKey: "id",
      },
    });
  };

  let { sortedInfo, filteredInfo } = state;
  sortedInfo = sortedInfo || {};
  filteredInfo = filteredInfo || {};
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",

      sorter: (a, b) => a.id - b.id,
      sortOrder: sortedInfo.columnKey === "id" && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: "Creator",
      render: (text, record, index) => {
        return (
          <Tag
            color="#108ee9"
            className=" font-weight-bold"
            style={{ fontSize: 12 }}
          >
            {record.creator?.name}
          </Tag>
        );
      },

      key: "creator",
      sorter: (item2, item1) => {
        let creator1 = item1.creator?.name.trim().toLowerCase();
        let creator2 = item2.creator?.name.trim().toLowerCase();
        if (creator2 < creator1) {
          return -1;
        }
        return 1;
      },
      sortOrder: sortedInfo.columnKey === "creator" && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: "Project Name",
      dataIndex: "projectName",
      key: "projectName",
      sorter: (a, b) => a.projectName.length - b.projectName.length,
      sortOrder: sortedInfo.columnKey === "projectName" && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: "Category",
      dataIndex: "categoryName",
      key: "categoryName",
      filters: [
        { text: "Dự án web", value: "Dự án web" },
        { text: "Dự án phần mềm", value: "Dự án phần mềm" },
        { text: "Dự án di động", value: "Dự án di động" },
      ],
      filteredValue: filteredInfo.categoryName || null,
      onFilter: (value, record) => record.categoryName.includes(value),
      sorter: (a, b) => a.categoryName.length - b.categoryName.length,
      sortOrder: sortedInfo.columnKey === "categoryName" && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text, record, index) => {
        let jsxContent = ReactHtmlParser(text);

        return <div key={index}>{jsxContent}</div>;
      },
    },

    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a href="#">
            <EditOutlined className="bg-primary text-white" />
          </a>
          <a href="#">
            <DeleteOutlined className="bg-danger text-white" />
          </a>
        </Space>
      ),
    },
  ];

  return (
    <div className="container mt-5">
      <div className="header">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb" style={{ backgroundColor: "white" }}>
            <li className="breadcrumb-item">Project</li>
            <li className="breadcrumb-item">CyberLearn</li>
            <li
              className="breadcrumb-item active font-weight-bold"
              aria-current="page"
            >
              Project Management
            </li>
          </ol>
        </nav>
      </div>
      <h3>Project Management</h3>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={setIdSort}>Sort ID</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table
        columns={columns}
        dataSource={projectList}
        rowKey={"id"}
        onChange={handleChange}
      />
    </div>
  );
}
