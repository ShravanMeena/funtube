import React, { Component } from "react";
// import { FaCode } from "react-icons/fa";
import axios from "axios";
import moment from "moment";
import "../Section/_home.scss";
import { Card, Avatar, Row, Col, Spin } from "antd";

const { Meta } = Card;

export default class LandingPage extends Component {
  constructor() {
    super();
    this.state = {
      videos: [],
    };
  }
  componentDidMount() {
    axios.get("/api/video/getVideos").then((response) => {
      if (response.data.success) {
        const withoutMyVideo = response.data.videos.filter(
          (user) => user.writer._id != localStorage.getItem("userId")
        );

        this.setState({
          videos: withoutMyVideo,
        });
      } else {
        alert("Failed to get Videos");
      }
    });
  }
  render() {
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
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "90vh",
              }}>
              <Spin size='large' />
            </div>
          ) : (
            <>
              <h4 className='title'>Recommended videos</h4>
              <Row className='cardMainContainer'>{renderCards}</Row>
            </>
          )}
        </div>
      </>
    );
  }
}
