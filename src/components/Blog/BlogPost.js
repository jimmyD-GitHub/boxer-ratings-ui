import React from "react";
import {Link} from 'react-router-dom';

const BlogPost = ({post}) => (
  <div id="post">
    <p><Link to="/blog">Blog</Link> <span className="glyphicon glyphicon-chevron-right"/> {post.type}</p>
    <h3>{post.title}</h3>
    <h5>Published {post.createdAt} &nbsp;
      <a href="https://twitter.com/jamesalandixon" target="_blank" rel="noopener noreferrer">@jamesalandixon</a>&nbsp;
      <a href="https://twitter.com/boxerRatings" target="_blank" rel="noopener noreferrer">@boxerRatings</a>
    </h5>
    <hr/>
    <div className="body" dangerouslySetInnerHTML={{__html: post.body}}/>
  </div>
);

export default BlogPost;