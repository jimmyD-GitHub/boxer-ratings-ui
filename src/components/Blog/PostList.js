import React from "react";
import {Route, Link} from 'react-router-dom';

const PostLink = ({title, to, id, description, createdAt, type}) => (
  <Route path={to} children={() => (
    <Link to={to} id={id}>
      <h3>{title} <small>Published: {createdAt}</small></h3>
      <p>{type.toUpperCase()} | {description}</p>
    </Link>
  )}/>
);

const PostList = ({posts, path}) => (
  <div className="media">
    {posts.map(post => (
      <PostLink to={path + post.slug}
                id={post.id}
                key={post.id}
                title={post.title}
                description={post.description}
                createdAt={post.createdAt}
                type={post.type}
      />
    ))}
  </div>
);

export default PostList;