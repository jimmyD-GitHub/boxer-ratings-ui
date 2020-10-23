import React, {Component} from "react";
import ReactGA from 'react-ga';
import {Helmet} from "react-helmet";
import PostList from "../components/Blog/PostList";
import BlogPost from "../components/Blog/BlogPost";
import TypeMenu from "../components/Blog/TypeMenu";
import TYPES from "../components/Blog/TypeData";
import BlogService from "../services/BlogService";
import Loadable from 'react-loading-overlay';
import Pagination from "react-js-pagination";

class Blog extends Component {

  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {data: [], loading: true, page: 1, perPage: 10, total: 0};
    this.blogService = props.blogService ? props.blogService : new BlogService();
  }

  getPosts(slug = null, page = 1, type = null) {

    this.setState({loading: true});
    let component = this;

    this.blogService.fetch(slug, page, type).then(data => {

      this._isMounted && this.setState({
        data: data.posts ? data.posts : data,
        perPage: data.perPage ? data.perPage : 10,
        total: data.total ? data.total : 0,
        loading: false
      });

    }).catch(error => {
      console.log(error);
      this.setState({data: []});
    }).then(function () {
      component._isMounted && component.setState({loading: false});
    });
  }

  componentWillReceiveProps(nextProps, nextContext) {

    let page = this.state.page;
    let slug = typeof nextProps.match.params.slug === 'string' ? nextProps.match.params.slug : null;
    let type = typeof nextProps.match.params.type === 'string' ? nextProps.match.params.type : null;

    if (type !== this.props.match.params.type && type !== null) {
      page = 1;
    }

    this.setState({page: page});
    this.getPosts(slug, page, type);
  }

  componentDidMount() {
    this._isMounted = true;
    let slug = typeof this.props.match.params.slug === 'string' ? this.props.match.params.slug : null;
    let type = typeof this.props.match.params.type === 'string' ? this.props.match.params.type : null;
    this._isMounted && this.getPosts(slug, this.state.page, type);

    // Google Analytics page view.
    if (process.env.NODE_ENV === 'production' && this._isMounted) {
      ReactGA.initialize('UA-163417331-1');
      ReactGA.pageview(window.location.pathname + window.location.search);
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handlePageChange(pageNumber) {
    this.setState({page: pageNumber});
    let type = typeof this.props.match.params.type === 'string' ? this.props.match.params.type : null;
    this.getPosts(null, pageNumber, type);
  }

  render() {

    const showList = Array.isArray(this.state.data);

    return (
      <div id="blog">
        <Helmet>
          <title>BoxerRatings: Blog</title>
        </Helmet>
        <div className={showList ? 'col-md-8 col-sm-7' : 'col-md-11 col-sm-8'}>

          {(showList && this.state.total > this.state.perPage) && <Pagination
            prevPageText="Prev"
            nextPageText="Next"
            pageRangeDisplayed={5}
            innerClass="br-pagination"
            activePage={this.state.page}
            totalItemsCount={this.state.total}
            itemsCountPerPage={this.state.perPage}
            onChange={this.handlePageChange.bind(this)} />}

          <Loadable active={this.state.loading} spinner color="#ffd941" fadeSpeed="50">
            {showList ?
              <PostList path="/blog/" showMessage={this.state.loading === false} posts={this.state.data}/> :
              <BlogPost post={this.state.data}/>}
          </Loadable>

        </div>

        {showList &&
        <div className="col-md-3 col-sm-4 col-md-offset-1 col-sm-offset-0">
          <TypeMenu types={TYPES}/>
        </div>}
      </div>
    );
  }

}

export default Blog;