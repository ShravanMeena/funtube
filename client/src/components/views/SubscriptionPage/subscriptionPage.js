import React, { Component } from "react";
// import { FaCode } from "react-icons/fa";
import axios from "axios";
import moment from "moment";
import "../Section/_home.scss";
import { Card, Avatar, Row, Col, Empty, Spin } from "antd";
const { Meta } = Card;

export default class LandingPage extends Component {
  constructor() {
    super();
    this.state = {
      videos: [],
      loader: true,
    };
  }
  componentDidMount() {
    let variable = { userFrom: localStorage.getItem("userId") };

    axios
      .post("/api/video/getSubscriptionVideos", variable)
      .then((response) => {
        if (response.data.success) {
          this.setState({
            videos: response.data.videos,
          });
        } else {
          alert("Failed to get subscription videos");
        }
      });
  }

  render() {
    // if (!this.state.videos) {
    //   return (
    //     <div
    //       style={{
    //         display: "flex",
    //         alignItems: "center",
    //         justifyContent: "center",
    //         width: "100%",
    //         height: "90vh",
    //       }}>
    //       <Spin size='large' />
    //     </div>
    //   );
    // }
    const renderCards = this.state.videos.map((video, index) => {
      var minutes = Math.floor(video.duration / 60);
      var seconds = Math.floor(video.duration - minutes * 60);

      return (
        <Col className='cardContainer'>
          <div style={{ position: "relative" }}>
            <a href={`/video/${video._id}`}>
              <img
                className='imgFit'
                alt='thumbnail'
                src={`http://localhost:5000/${video.thumbnail}`}
              />
              <div
                className=' duration'
                style={{
                  bottom: 0,
                  right: 0,
                  position: "absolute",
                  margin: "4px",
                  color: "#fff",
                  backgroundColor: "rgba(17, 17, 17, 0.8)",
                  opacity: 0.8,
                  padding: "2px 4px",
                  borderRadius: "2px",
                  letterSpacing: "0.5px",
                  fontSize: "12px",
                  fontWeight: "500",
                  lineHeight: "12px",
                }}>
                <span>
                  {minutes} : {seconds}
                </span>
              </div>
            </a>
          </div>
          <div className='footer'>
            <Meta
              avatar={<Avatar src={video.writer.image} />}
              title={video.title}
            />
            <span>{video.writer.name} </span>
            <br />
            <span style={{ marginLeft: "3rem" }}> {video.views}</span>-{" "}
            <span> {moment(video.createdAt).format("MMM Do YY")} </span>
          </div>
        </Col>
      );
    });

    return (
      <>
        <div className='cardUpperMainContainer'>
          {this.state.videos.length === 0 ? (
            <Empty style={{ marginTop: 200 }} />
          ) : (
            <>
              <h4 className='title'>Subscribed channel videos</h4>
              <Row className='cardMainContainer'>{renderCards}</Row>
            </>
          )}
        </div>
      </>
    );
  }
}
