import React, { Component } from "react";
import { Card, Modal, Empty } from "antd";
import axios from "axios";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";

// import { update_videos_action } from "../../../_actions/update_videos_action";
const { Meta } = Card;

class MyVideos extends Component {
  constructor() {
    super();
    this.state = {
      videos: [],
      modal2Visible: false,
      filePath: "",
      title: "",
    };
  }

  setModal2Visible(modal2Visible) {
    this.setState({ modal2Visible });
  }

  componentDidMount() {
    this.getVideos();
  }

  getVideos = () => {
    axios
      .get(`${process.env.REACT_APP_API}/video/getVideos`)
      .then((response) => {
        if (response.data.success) {
          const myVideo = response.data.videos.filter(
            (user) => user.writer._id === localStorage.getItem("userId")
          );
          this.setState({
            videos: myVideo,
          });
        } else {
          alert("Failed to get Videos");
        }
      });
  };

  deleteVideo = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API}/video/delete/${id}`)
      .then((res) => {
        if (res.data) {
          alert("Deleted successfully!!!");
          this.getVideos();
        }
      })
      .catch((err) => console.log(err));
  };

  update = (id) => {
    this.props.history.push(`/update/${id}`);
  };
  playVideo = (video, title) => {
    this.setState({
      filePath: video,
      modal2Visible: true,
      title,
    });
  };
  render() {
    return (
      <div
        style={{
          width: "100%",
          padding: 20,
        }}>
        <Helmet>
          <meta charSet='utf-8' />
          <title>My all uploaded videos</title>
        </Helmet>

        <Modal
          title={this.state.title}
          centered
          visible={this.state.modal2Visible}
          onOk={() => this.setModal2Visible(false)}
          onCancel={() => this.setModal2Visible(false)}>
          <video
            style={{
              width: "100%",
              height: "75vh",
              background: "#000",
            }}
            autoPlay
            src={`${process.env.REACT_APP_FOR_IMAGE}/${this.state.filePath}`}
            controls></video>
        </Modal>
        <h4 className='title'>Your videos</h4>
        {this.state.videos.length === 0 ? (
          <Empty style={{ marginTop: 200 }} />
        ) : (
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              //   alignItems: "center",
              paddingLeft: "100px",
              paddingRight: "100px",
              flexWrap: "wrap",
            }}>
            {this.state.videos.map((video, index) => {
              return (
                <Card
                  hoverable
                  size='small'
                  style={{ width: "22%", marginRight: "3%", marginTop: 20 }}
                  cover={
                    <img
                      onClick={() =>
                        this.playVideo(video.filePath, video.title)
                      }
                      alt={video.title}
                      src={`${process.env.REACT_APP_FOR_IMAGE}/${video.thumbnail}`}
                    />
                  }>
                  <Meta
                    onClick={() => this.playVideo(video.filePath, video.title)}
                    title={video.title}
                    description={
                      video.description.length > 100
                        ? video.description.slice(0, 100)
                        : video.description
                    }
                  />
                  <div
                    style={{
                      marginTop: 20,
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}>
                    <EditOutlined
                      onClick={() => this.update(video._id)}
                      style={{ fontSize: 20, color: "green", marginRight: 20 }}
                    />
                    <DeleteOutlined
                      onClick={() => this.deleteVideo(video._id)}
                      style={{ fontSize: 20, color: "red" }}
                    />
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {
//     getUserData: state.user.userData,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     sendUpdateData: (data) => dispatch(update_videos_action(data)),
//   };
// };

export default connect(null, null)(MyVideos);
