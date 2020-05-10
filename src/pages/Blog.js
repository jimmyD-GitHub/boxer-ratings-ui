import React, {Component} from "react";
import {Helmet} from "react-helmet";
import PostList from "../components/Blog/PostList";
import BlogPost from "../components/Blog/BlogPost";
import BlogService from "../services/BlogService";
import Loadable from 'react-loading-overlay';
import ReactGA from 'react-ga';

class Blog extends Component {

  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {data: [], loading: true};
    this.blogService = props.blogService ? props.blogService : new BlogService();
  }

  getPosts(slug = null) {
    this.setState({loading: true});
    let component = this;
    this.blogService.fetch(slug).then(data => {
      this._isMounted && this.setState({data: data, loading: false});
    }).catch(error => {
      console.log(error);
      this.setState({data: []});
    }).then(function () {
      component._isMounted && component.setState({loading: false});
    });
  }

  componentWillReceiveProps(nextProps, nextContext) {
    let slug = typeof nextProps.match.params.slug === 'string' ? nextProps.match.params.slug : null;
    this.getPosts(slug);
  }

  componentDidMount() {
    this._isMounted = true;
    let slug = typeof this.props.match.params.slug === 'string' ? this.props.match.params.slug : null;
    this._isMounted && this.getPosts(slug);

    // Google Analytics page view.
    if (process.env.NODE_ENV === 'production' && this._isMounted) {
      ReactGA.initialize('UA-163417331-1');
      ReactGA.pageview(window.location.pathname + window.location.search);
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div id="blog">
        <Helmet>
          <title>BoxerRatings: Blog</title>
        </Helmet>
        <div className="col-md-11 col-sm-8">
          <Loadable active={this.state.loading} spinner color="#ffd941" fadeSpeed="50">
            {Array.isArray(this.state.data) ?
              <PostList path="/blog/" posts={this.state.data}/> : <BlogPost post={this.state.data}/>}
          </Loadable>
        </div>
      </div>
    );
  }

}

export default Blog;