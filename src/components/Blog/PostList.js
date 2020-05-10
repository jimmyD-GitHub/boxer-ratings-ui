import React from "react";
import {Route, Link} from 'react-router-dom';

const PostLink = ({title, to, id, description, createdAt}) => (
  <Route path={to} children={() => (
    <Link to={to} id={id}>
      <h3>{title} <small>{createdAt}</small></h3>
      <p>{description}</p>
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
      />
    ))}
  </div>
);

export default PostList;