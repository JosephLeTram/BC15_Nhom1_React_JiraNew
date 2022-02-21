import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Table,
  Button,
  Space,
  Tag,
  Avatar,
  Popover,
  AutoComplete,
  Input,
} from "antd";
import ReactHtmlParser from "react-html-parser";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Popconfirm, message } from "antd";
import {
  ASSIGN_USER_TO_PROJECT_SAGA,
  DELETE_PROJECT_SAGA,
  EDIT_PROJECT_SAGA,
  GET_PROJECT_LIST_SAGA,
  OPEN_FORM_EDIT_PROJECT,
  SEARCH_USER_SAGA,
} from "../../redux/constants/JiraNewConstants";
import FormEditProject from "./FormEditProject";

export default function ProjectManagement(props) {
  //retrieve Project List data from Reducer to Component
  const projectList = useSelector(
    (state) => state.ProjectListReducer.projectList
  );

  // retrieve User Login Data from Reducer to Component
  const userSearch = useSelector((state) => state.SearchUserReducer.userSearch);

  const [value, setValue] = useState("");

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
      title: "Members",
      key: "members",
      render: (text, record, index) => {
        return (
          <div>
            {record.members?.slice(0, 3).map((member, index) => {
              return <Avatar key={index} src={member.avatar} />;
            })}
            {record.members?.length > 3 ? <Avatar>...</Avatar> : ""}
            <Popover
              placement="right"
              title={"Add User"}
              content={() => {
                return (
                  <AutoComplete
                    dropdownClassName="certain-category-search-dropdown"
                    dropdownMatchSelectWidth={500}
                    style={{ width: 250 }}
                    value={value}
                    options={userSearch?.map((user, index) => {
                      return {
                        label: user.name,
                        value: user.userId.toString(),
                      };
                    })}
                    onSearch={(value) => {
                      dispatch({
                        type: SEARCH_USER_SAGA,
                        keyWord: value,
                      });
                    }}
                    onSelect={(valueSelect, option) => {
                      //Set value in the box = option.label
                      setValue(option.label);
                      // Call API and send data to backend
                      dispatch({
                        type: ASSIGN_USER_TO_PROJECT_SAGA,
                        userProject: {
                          projectId: record.id,
                          userId: valueSelect,
                        },
                      });
                    }}
                    onChange={(text) => {
                      setValue(text);
                    }}
                  >
                    <Input.Search size="large" placeholder="Member's name" />
                  </AutoComplete>
                );
              }}
              trigger="click"
            >
              <Button style={{ borderRadius: "50%" }}>+</Button>
            </Popover>
          </div>
        );
      },
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
        <Space size="large">
          <button
            className="btn btn-primary  mr-1 text-white"
            onClick={() => {
              const action = {
                type: OPEN_FORM_EDIT_PROJECT,
                Component: <FormEditProject />,
              };

              // dispatch to drawer reducer
              dispatch(action);

              // dispatch current data to Reducer
              const editProjectAction = {
                type: EDIT_PROJECT_SAGA,
                projectEditModel: record,
              };

              dispatch(editProjectAction);
            }}
          >
            <EditOutlined style={{ fontSize: 16 }} />
          </button>
          <Popconfirm
            title="Are you sure to delete this project?"
            onConfirm={() => {
              dispatch({ type: DELETE_PROJECT_SAGA, idProject: record });
            }}
            okText="Yes"
            cancelText="No"
          >
            <button className="btn btn-danger text-white">
              <DeleteOutlined style={{ fontSize: 16 }} />
            </button>
          </Popconfirm>
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
