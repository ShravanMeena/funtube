import React, { Component } from "react";
import "./style/_videoDetails.scss";
import { Card, Avatar, Row, Spin, Button } from "antd";
import Comment from "./section/Comment";
import axios from "axios";
import { shuffle } from "lodash";

const { Meta } = Card;

class Subcriber extends Component {
  constructor() {
    super();
    this.state = {
      subscriberNumber: "",
      subscribed: "",
    };
  }

  componentDidMount() {
    // subcriber
    const subscribeNumberVariables = {
      userTo: this.props.id,
      userFrom: localStorage.getItem("userId"),
    };
    axios
      .post("/api/subscribe/subscribeNumber", subscribeNumberVariables)
      .then((response) => {
        if (response.data.success) {
          this.setState({
            subscriberNumber: response.data.subscribeNumber,
          });
        } else {
          alert("Failed to get subscriber Number");
        }
      });

    this.checkSubscribe();
  }
  checkSubscribe = () => {
    const subscribeNumberVariables = {
      userTo: this.props.id,
      userFrom: localStorage.getItem("userId"),
    };
    axios
      .post("/api/subscribe/subscribed", subscribeNumberVariables)
      .then((response) => {
        if (response.data.success) {
          this.setState({
            subscribed: response.data.subcribed,
          });
        } else {
          alert("Failed to get Subscribed Information");
        }
      });
  };
  onSubscribe = () => {
    let subscribeVariables = {
      userTo: this.props.id,
      userFrom: localStorage.getItem("userId"),
    };

    if (this.state.subscribed) {
      //when we are already subscribed
      axios
        .post("/api/subscribe/unSubscribe", subscribeVariables)
        .then((response) => {
          if (response.data.success) {
            this.checkSubscribe();
            this.setState({
              subscriberNumber: this.state.subscriberNumber - 1,
              subcribed: !this.state.subscribed,
            });
          } else {
            alert("Failed to unsubscribe");
          }
        });
    } else {
      // when we are not subscribed yet

      axios
        .post("/api/subscribe/subscribe", subscribeVariables)
        .then((response) => {
          if (response.data.success) {
            this.checkSubscribe();
            this.setState({
              subscriberNumber: this.state.subscriberNumber + 1,
              subcribed: !this.state.subscribed,
            });
          } else {
            alert("Failed to subscribe");
          }
        });
    }
  };

  render() {
    return (
      <div>
        {this.state.subscribed ? (
          <Button onClick={this.onSubscribe} type='disabled'>
            {this.state.subscriberNumber} SUBSCRIBED
          </Button>
        ) : (
          <Button onClick={this.onSubscribe} type='danger'>
            {this.state.subscriberNumber} SUBSCRIBE
          </Button>
        )}
      </div>
    );
  }
}

export default class VideoDetails extends Component {
  constructor() {
    super();
    this.state = {
      video: [],
      id: "",
      videos: [],
    };
  }
  componentDidMount() {
    const videoVariable = {
      videoId: this.props.match.params.videoId,
    };
    axios.post("/api/video/getVideo", videoVariable).then((response) => {
      if (response.data.success) {
        this.setState({
          video: response.data.video,
        });
      } else {
        alert("Failed to get video Info");
      }
    });

    // getallvideos
    axios.get("/api/video/getVideos").then((response) => {
      if (response.data.success) {
        console.log(response.data.videos);
        this.setState({
          videos: shuffle(response.data.videos),
        });
      } else {
        alert("Failed to get Videos");
      }
    });
  }

  render() {
    if (this.state.video.writer) {
      return (
        <div className='mainVideoDeatilsContainer'>
          <div className='videoDetailsContainer'>
            <div className='left'>
              <Card className='videoContainer'>
                <div className='videoCardContainer'>
                  <video
                    autoPlay
                    style={{
                      width: "100%",
                      height: "100%",
                      background: "#000",
                    }}
                    src={`http://localhost:5000/${this.state.video.filePath}`}
                    controls></video>
                </div>
                <div className='videoConatienrFooter'>
                  <Meta
                    avatar={
                      <Avatar
                        src={`http://localhost:5000/${this.state.video.writer.image}`}
                      />
                    }
                    title={this.state.video.title}
                    description={this.state.video.writer.name}
                  />
                  <Subcriber id={this.state.video.writer._id} />
                </div>
              </Card>
            </div>
            <div className='right'>
              {this.state.videos.map((video, index) => {
                return (
                  <a href={`/video/${video._id}`}>
                    <Card
                      className='videoContainer'
                      style={{ cursor: "pointer" }}
                      cover={
                        <img
                          alt={video.title}
                          src={`http://localhost:5000/${video.thumbnail}`}
                        />
                      }>
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
                          {Math.floor(video.duration / 60)} :{" "}
                          {Math.floor(
                            video.duration -
                              Math.floor(video.duration / 60) * 60
                          )}
                        </span>
                      </div>
                      <Meta
                        avatar={
                          <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
                        }
                        title={video.title}
                        description={video.writer.name}
                      />
                    </Card>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className='spin'>
          <Spin />
        </div>
      );
    }
  }
}
