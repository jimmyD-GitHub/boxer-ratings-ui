import React from "react";
import {Route, Link} from 'react-router-dom';

const PostLink = ({title, to, id, description, createdAt}) => (
  <Route path={to} children={() => (
    <Link to={to} id={id}>
      <h3>{title} <br/><small>Published: {createdAt}</small></h3>
      <p>{description}</p>
    </Link>
  )}/>
);

const PostList = ({posts, path, showMessage = true}) => (
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

    {(showMessage && posts.length === 0) && <p className="alert alert-info" role="alert">
      <strong>I've not written any of these yet.
        <span aria-label="Grimace" role="img">&#128533;</span></strong>
    </p>}

  </div>
);

export default PostList;