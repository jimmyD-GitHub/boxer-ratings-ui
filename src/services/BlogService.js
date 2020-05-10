import axios from 'axios';

class BlogService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_REST_API
    });
  }

  fetch(slug = null) {
    this.initRequest();
    let url = slug ? ('/blog/' + slug) : '/blog';
    return this.api.get(url, {
      cancelToken: this.request.token
    }).then(function (response) {
      return response.data.posts ? response.data.posts : response.data;
    }).catch(function (error) {
      let message = axios.isCancel(error) ? 'aborted' : 'failed';
      throw new Error(message);
    });
  }

  initRequest() {
    if (this.hasOwnProperty('request')) {
      this.request.cancel(); // cancel last request if it has not completed yet
    }
    let CancelToken = axios.CancelToken;
    this.request = CancelToken.source();
  }
}

export default BlogService;