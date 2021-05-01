import React, { Component } from "react";
import { Descriptions } from "antd";
import axios from "axios";
import { Helmet } from "react-helmet";
export default class MyInfo extends Component {
  constructor() {
    super();
    this.state = {
      user_info: [],
    };
  }
  componentDidMount() {
    const videoVariable = {
      userId: this.props.match.params.userId,
    };
    axios
      .get(`${process.env.REACT_APP_API}/users/userInfo`, videoVariable)
      .then((response) => {
        if (response.data.success) {
          this.setState({
            user_info: response.data.userData,
          });
        } else {
          alert("Failed to get video Info");
        }
      });
  }

  render() {
    const user = this.state.user_info;

    return (
      <div style={{ padding: 50 }}>
        <Descriptions title='User Info'>
          {user.length == 0 ? (
            <h4>Loading...</h4>
          ) : (
            <>
              <Descriptions.Item label='UserName'>
                {user.name}

                <Helmet>
                  <meta charSet='utf-8' />
                  <title>{user.name}</title>
                </Helmet>
              </Descriptions.Item>
              <Descriptions.Item label='Email'>{user.email}</Descriptions.Item>
              <Descriptions.Item label='Role'>Admin</Descriptions.Item>
              <Descriptions.Item label='Address'>
                No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
              </Descriptions.Item>
            </>
          )}
        </Descriptions>
      </div>
    );
  }
}
