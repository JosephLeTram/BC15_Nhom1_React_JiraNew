import React, { useState } from "react";
import {
  Table,
  Button,
  Space,
  Input,
  Tag,
  AutoComplete,
  Popconfirm,
  Modal,
  Avatar,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DELETE_USER_SAGA,
  EDIT_USER_SAGA,
  GET_LIST_USER_SAGA,
  OPEN_FORM_EDIT_USER,
  SEARCH_USER_SAGA,
} from "../../redux/constants/JiraNewConstants";
import { NavLink } from "react-router-dom";
import FormEditUser from "./FormEditUser";

export default function UserManagement(props) {
  //retrieve Project List data from Reducer to Component
  const { userList } = useSelector((state) => state.UserListReducer);
  const { userLogin } = useSelector((state) => state.UserReducer);
  console.log("userLogin", userLogin);
  console.log("userLogin.password", userLogin.password);
  // retrieve User Login Data from Reducer to Component
  const { userSearch } = useSelector((state) => state.SearchUserReducer);

  const [value, setValue] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [id, setId] = useState("");
  const [name, setName] = useState("");

  // useDispatch call API
  const dispatch = useDispatch();

  // useRef

  const searchRef = useRef(null);

  // useEffect to retrieve data upon opening up a page
  useEffect(() => {
    // Get list of users from API
    dispatch({
      type: GET_LIST_USER_SAGA,
    });
  }, []);

  // Define Functions
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  // For User Filters
  const [state, setState] = useState({
    filteredInfo: null,
    sortedInfo: null,
  });

  const handleChangeFilter = (pagination, filters, sorter) => {
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
        columnKey: "userId",
      },
    });
  };

  let { sortedInfo, filteredInfo } = state;
  sortedInfo = sortedInfo || {};
  filteredInfo = filteredInfo || {};
  // Table
  const columns = [
    {
      title: "User ID",
      render: (text, record, index) => {
        return (
          <Tag
            // color="#geekblue"
            className=" font-weight-bold"
            style={{ fontSize: 12 }}
          >
            {record?.userId}
          </Tag>
        );
      },
      key: "userId",

      sorter: (a, b) => a.userId - b.userId,
      sortOrder: sortedInfo.columnKey === "userId" && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: "Name",
      render: (text, record, index) => {
        return (
          <Tag
            color="#108ee9"
            className=" font-weight-bold"
            style={{ fontSize: 12 }}
          >
            {record?.name}
          </Tag>
        );
      },

      key: "name",
      sorter: (item2, item1) => {
        let name1 = item1?.name.trim().toLowerCase();
        let name2 = item2?.name.trim().toLowerCase();
        if (name2 < name1) {
          return -1;
        }
        return 1;
      },
      sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: "Email",
      render: (text, record, index) => {
        return (
          <Tag className=" font-weight-bold" style={{ fontSize: 12 }}>
            {record?.email}
          </Tag>
        );
      },

      key: "email",
      sorter: (item2, item1) => {
        let email1 = item1?.name.trim().toLowerCase();
        let email2 = item2?.name.trim().toLowerCase();
        if (email2 < email1) {
          return -1;
        }
        return 1;
      },
      sortOrder: sortedInfo.columnKey === "email" && sortedInfo.order,
      ellipsis: true,
    },

    {
      title: "Phone",
      render: (text, record, index) => {
        return (
          <Tag className=" font-weight-bold" style={{ fontSize: 12 }}>
            {record?.phoneNumber}
          </Tag>
        );
      },

      key: "phone",
      sorter: (item2, item1) => {
        let phone1 = item1?.name.trim().toLowerCase();
        let phone2 = item2?.name.trim().toLowerCase();
        if (phone2 < phone1) {
          return -1;
        }
        return 1;
      },
      sortOrder: sortedInfo.columnKey === "phone" && sortedInfo.order,
      ellipsis: true,
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
                type: OPEN_FORM_EDIT_USER,
                title: "Edit User Info",
                Component: <FormEditUser />,
              };

              // dispatch to drawer reducer
              dispatch(action);

              // dispatch current data to Reducer
              const editUserAction = {
                type: EDIT_USER_SAGA,
                userEditModel: record,
              };

              dispatch(editUserAction);
            }}
          >
            <EditOutlined style={{ fontSize: 16 }} />
          </button>
          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() => {
              dispatch({ type: DELETE_USER_SAGA, userId: record.userId });
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
      <div className="header d-flex justify-content-between">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb" style={{ backgroundColor: "white" }}>
            <li className="breadcrumb-item">Project</li>
            <li className="breadcrumb-item">CyberLearn</li>
            <li
              className="breadcrumb-item active font-weight-bold"
              aria-current="page"
            >
              User Management
            </li>
          </ol>
        </nav>
        <h3>
          Hi, <span> {userList[190]?.name} </span>
          <Avatar src={userList[190]?.avatar} />
        </h3>
      </div>
      <h3>User Management</h3>
      {/* Search User */}
      <div>
        <NavLink to="/register">
          <Button className="my-3" type="primary">
            Create A New User
          </Button>
        </NavLink>
        <Modal
          title="User Information"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div className="form-group">
            <span className="font-weight-bold">User ID: </span>
            <input className="form-control" disabled value={id} />

            <span className="font-weight-bold">User Name: </span>
            <input className="form-control" disabled value={name} />

            <span className="font-weight-bold">User Email: </span>
            <input className="form-control" disabled value={email} />

            <span className="font-weight-bold">User Phone No.: </span>
            <input className="form-control" disabled value={phoneNumber} />
          </div>
        </Modal>
      </div>
      <div className="my-2">
        <AutoComplete
          dropdownClassName="certain-category-search-dropdown"
          dropdownMatchSelectWidth={500}
          style={{ width: 500 }}
          value={value}
          options={userSearch?.map((user, index) => {
            return {
              label: user.name,
              value: user.userId.toString(),
              email: user.email,
              phoneNumber: user.phoneNumber,
            };
          })}
          onSearch={(value) => {
            if (searchRef.current) {
              clearTimeout(searchRef.current);
            }
            searchRef.current = setTimeout(() => {
              dispatch({
                type: SEARCH_USER_SAGA,
                keyWord: value,
              });
            }, 300);
          }}
          // gán onSelect User will have same effect open EditUserForm like Edit User
          onSelect={(valueSelect, option) => {
            //Set value in the box = option.label
            setValue(option.label);
            // To show on Modal
            setName(option.label);
            setEmail(option.email);
            setPhoneNumber(option.phoneNumber);
            setId(option.value);
            setIsModalVisible(true);
          }}
          onChange={(text) => {
            setValue(text);
          }}
        >
          <Input.Search size="large" placeholder="Search User" />
        </AutoComplete>
      </div>

      <Space style={{ marginBottom: 16 }}>
        {/* Sort User */}
        <Button onClick={setIdSort}>Sort ID</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table
        columns={columns}
        dataSource={userList}
        rowKey={"id"}
        onChange={handleChangeFilter}
      />
    </div>
  );
}
