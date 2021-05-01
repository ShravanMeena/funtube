import React, { Component } from "react";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Modal,
  Upload,
  message,
  Select,
  Icon,
} from "antd";
import Dropzone from "react-dropzone";
import axios from "axios";
// import { createNetworkAction } from "../../../redux/action/createNetworkAction";
import { connect } from "react-redux";

import { CloudDownloadOutlined } from "@ant-design/icons";
const { Dragger } = Upload;
const { Option } = Select;

const Private = [
  { value: 0, label: "Private" },
  { value: 1, label: "Public" },
];

const Category = [
  { value: 0, label: "Film & Animation" },
  { value: 1, label: "Autos & Vehicles" },
  { value: 2, label: "Music" },
  { value: 3, label: "Pets & Animals" },
  { value: 4, label: "Sports" },
];

class Create extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      modal2Visible: false,
      category: "",
      publish: "",
      filePath: "",
      thumbPath: "",
      duration: "",
    };
  }
  setModal2Visible(modal2Visible) {
    this.setState({ modal2Visible });
  }

  onFinish = (values) => {
    console.log(values);
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleCategory = (event) => {
    this.setState({
      category: event.target.value,
    });
  };
  handlePublication = (event) => {
    this.setState({
      publish: event.target.value,
    });
  };
  // _handleKeyDown = (e) => {
  //   if (e.key === "Enter") {
  //     this.loginValidation();
  //   }
  // };

  onDrop = (files) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    console.log(files);
    formData.append("file", files[0]);

    axios
      .post(`${process.env.REACT_APP_API}/video/uploadfiles`, formData, config)
      .then((response) => {
        if (response.data.success) {
          let variable = {
            filePath: response.data.filePath,
            fileName: response.data.fileName,
          };
          this.setState({
            filePath: response.data.filePath,
          });

          //gerenate thumbnail with this filepath !
          axios
            .post(`${process.env.REACT_APP_API}/video/thumbnail`, variable)
            .then((response) => {
              if (response.data.success) {
                this.setState({
                  thumbPath: response.data.thumbsFilePath,
                  duration: response.data.fileDuration,
                });
              } else {
                alert("Failed to make the thumbnails");
              }
            });
        } else {
          alert("failed to save the video in server");
        }
      });
  };

  onSubmit = (event) => {
    event.preventDefault();

    if (this.props.getUserData && !this.props.getUserData.isAuth) {
      return alert("Please Log in First");
    }

    const {
      title,
      description,
      category,
      thumbPath,
      filePath,
      duration,
    } = this.state;
    if (
      title === "" ||
      description === "" ||
      category === "" ||
      filePath === "" ||
      duration === "" ||
      thumbPath === ""
    ) {
      return alert("Please first fill all the fields");
    }

    const data = {
      writer: this.props.getUserData._id,
      title: this.state.title,
      description: this.state.description,
      privacy: this.state.publish,
      filePath: this.state.filePath,
      category: this.state.category,
      duration: this.state.duration,
      thumbnail: this.state.thumbPath,
    };

    axios
      .post(`${process.env.REACT_APP_API}/video/uploadVideo`, data)
      .then((response) => {
        if (response.data.success) {
          alert("video Uploaded Successfully");
          this.props.history.push("/my-videos");
        } else {
          alert("Failed to upload video");
        }
      });
  };

  render() {
    return (
      <div
        style={{
          width: "100%",
          flexDirection: "column",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "90vh",
        }}>
        <h4 className='title' style={{ marginBottom: 30 }}>
          Upload your video
        </h4>
        <div style={{ width: "40%", height: "100%" }}>
          <div
            style={{
              width: "100%",
              flexDirection: "column",
              display: "flex",
              alignItems: "center",
            }}>
            <Button
              type='danger'
              // shape='round'
              onClick={() => this.setModal2Visible(true)}
              size={"large"}>
              <CloudDownloadOutlined /> Select your video
            </Button>
          </div>

          <Modal
            title='Upload your video here'
            centered
            visible={this.state.modal2Visible}
            onOk={() => this.setModal2Visible(false)}
            onCancel={() => this.setModal2Visible(false)}>
            {this.state.thumbPath !== "" && (
              <div style={{ marginTop: 20, marginBottom: 20 }}>
                <img
                  src={`http://localhost:5000/${this.state.thumbPath}`}
                  alt='haha'
                />
              </div>
            )}

            <Dropzone onDrop={this.onDrop} multiple={false} maxSize={800000000}>
              {({ getRootProps, getInputProps }) => (
                <div
                  style={{
                    height: "240px",
                    border: "1px solid lightgray",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                  {...getRootProps()}>
                  <input {...getInputProps()} />
                  <Icon type='plus' style={{ fontSize: "3rem" }} />
                </div>
              )}
            </Dropzone>
          </Modal>

          <Form>
            <div
              style={{
                width: "100%",
                flexDirection: "column",
                display: "flex",
                alignItems: "center",
              }}>
              <div style={{ marginTop: 20, marginBottom: 20 }}>
                {this.state.thumbPath !== "" && (
                  <div>
                    <img
                      style={{ borderRadius: 5 }}
                      src={`http://localhost:5000/${this.state.thumbPath}`}
                      alt='haha'
                    />
                  </div>
                )}
              </div>
            </div>

            <br></br>
            <label>Title</label>
            <Input
              // onKeyDown={this._handleKeyDown}
              style={{ marginBottom: 20 }}
              value={this.state.title}
              name='title'
              onChange={(event) => this.handleChange(event)}
              placeholder='Enter your video title'
            />
            <label>Description</label>
            <Input.TextArea
              style={{ marginBottom: 20 }}
              value={this.state.description}
              name='description'
              onChange={(event) => this.handleChange(event)}
              placeholder='Enter your video description'
            />

            <select
              style={{
                width: "100%",
                border: `1px solid lightgray`,
                height: "35px",
                borderRadius: 5,
                paddingLeft: 5,
                marginBottom: 20,
              }}
              value={this.state.publish}
              onChange={(event) => this.handlePublication(event)}>
              <option value='Select'>Select privacy</option>
              {Private.map((item) => {
                return (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                );
              })}
            </select>
            <br />
            <br />
            <select
              style={{
                width: "100%",
                border: `1px solid lightgray`,
                height: "35px",
                borderRadius: 5,
                marginBottom: 20,
                paddingLeft: 5,
              }}
              value={this.state.category}
              onChange={(event) => this.handleCategory(event)}>
              <option value='Select'>Select category</option>
              {Category.map((category) => {
                return (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                );
              })}
            </select>
            <Form.Item>
              <Button onClick={this.onSubmit} type='primary' htmlType='submit'>
                Upload video
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getUserData: state.user.userData,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     // sendCreateNetworkData: (data) => dispatch(createNetworkAction(data)),
//   };
// };

export default connect(mapStateToProps, null)(Create);
