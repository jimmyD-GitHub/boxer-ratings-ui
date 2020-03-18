import React, {Component} from 'react';
import SortableBoxerListItem from './SortableBoxerListItem';
import ErrorMessage from '../Message/ErrorMessage';
import {animateScroll as scroll} from 'react-scroll';
import Loadable from 'react-loading-overlay';
import '../../assets/css/sortableBoxerList.css';
import $ from 'jquery';
import UserActions from "../../store/Actions/UserActions";

window.jQuery = $;
require('jquery-ui/ui/widget');
require('jquery-ui/ui/widgets/mouse');
require('jquery-ui/ui/widgets/sortable');
require('jquery-ui/ui/disable-selection');
require('jquery-ui-touch-punch/jquery.ui.touch-punch.min');

class SortableBoxerList extends Component {

  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.state = {loading: true};
  }

  handleSave(event) {
    let ratings = [];
    event.preventDefault();
    this.props.showMessage(false);

    this.$list.find('li').each(function () {
      ratings.push($(this).attr('id'));
    });

    this.setState({loading: true});
    this.$save.attr('disabled', 'disabled');
    scroll.scrollToTop({duration: 400});

    this.props.handleSave(ratings).then(response => {
      this.props.showMessage();
      this.$save.attr('disabled', false);
      this.setState({loading: false})
    }).catch(error => {
      if (error.message === 'auth') {
        const {dispatch} = this.props;
        dispatch(UserActions.logout());
      } else {
        this.props.showMessage(false, true);
      }
    });
  }

  componentDidMount() {
    this.$list = $(this.list);
    this.$save = $(this.save);
    this.$list.sortable();
    this.$list.disableSelection();
  }

  componentWillReceiveProps() {
    this.$save.attr('disabled', false);
    this.setState({loading: false});
  }

  render() {
    if (this.props.boxers == null && this.props.showError) {
      return (
        <ErrorMessage message="No boxer ratings could be found for this division."/>
      );
    }

    return (
      <div id="boxers">
        <Loadable active={this.state.loading} spinner color="#ffd941">
          <ul id="sortable" className="media-list" ref={list => this.list = list}>
            {this.props.boxers.map(boxer => <SortableBoxerListItem boxer={boxer} key={boxer.id}/>)}
          </ul>
        </Loadable>
        <div className="form-group text-right">
          {this.state.loading === false &&
          <button id="save-button" ref={save => this.save = save} type="submit" className="btn btn-primary"
                  onClick={this.handleSave}>SAVE
          </button>
          }
        </div>
      </div>
    );
  }
}

export default SortableBoxerList;