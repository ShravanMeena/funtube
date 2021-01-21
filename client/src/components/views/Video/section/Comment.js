import React, { Component } from "react";
import { Comment, Avatar } from "antd";

const ExampleComment = ({ children }) => (
  <Comment
    actions={[<span key='comment-nested-reply-to'>Reply to</span>]}
    author={<a>Han Solo</a>}
    avatar={
      <Avatar
        src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
        alt='Han Solo'
      />
    }
    content={
      <p>
        We supply a series of design principles, practical patterns and high
        quality design resources (Sketch and Axure).
      </p>
    }>
    {children}
  </Comment>
);

export default class CommentComponent extends Component {
  render() {
    return (
      <div>
        <h4>Comments</h4>
        <ExampleComment>
          <ExampleComment>
            <ExampleComment />
            <ExampleComment />
          </ExampleComment>
        </ExampleComment>
      </div>
    );
  }
}
