import React, { Component } from 'react';
import './Ratings.css';

class Ratings extends Component {
  render() {
    return (
        <div className="row">
            <div className="col-md-8">
                <BoxerList />
            </div>
            <div className="col-md-4">
                <DivisionMenu divisions={this.props.divisions} />
            </div>
        </div>
    );
  }
}

class DivisionMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: 'heavyweight'
        };
    }

    render() {
        var options = [];
        this.props.divisions.forEach((division) => {
            var listItem = division.id === this.state.selected ? 'list-group-item active' : 'list-group-item';
            options.push(<a href="#" className={listItem}>{division.name}</a>);
        });
        return (
            <div className="list-group">{options}</div>
        );
    }

}

class BoxerList extends Component {
    render() {
        return (
            <div className="list-group">
                <a href="#" className="list-group-item">
                    <h4 className="list-group-item-heading">1. Boxer Name</h4>
                    <p className="list-group-item-text">
                        Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a
                        piece of classical Latin literature from 45 BC, making it over 2000 years old.
                    </p>
                </a>
                <a href="#" className="list-group-item">
                    <h4 className="list-group-item-heading">2. Boxer Name</h4>
                    <p className="list-group-item-text">
                        Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece
                        of classical Latin literature from 45 BC, making it over 2000 years old.
                    </p>
                </a>
                <a href="#" className="list-group-item">
                    <h4 className="list-group-item-heading">3. Boxer Name</h4>
                    <p className="list-group-item-text">
                        Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece
                        of classical Latin literature from 45 BC, making it over 2000 years old.
                    </p>
                </a>
            </div>
        );
    }
}

export default Ratings;
