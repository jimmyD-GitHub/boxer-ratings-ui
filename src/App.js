import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
        <div className="row">
            <div className="col-md-8">
                <BoxerList />
            </div>
            <div className="col-md-4">
                <DivisionMenu />
            </div>
        </div>
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

class DivisionMenu extends Component {
    render() {
        return (
            <div className="list-group">
                <a href="#" className="list-group-item active">
                    Heavyweight
                </a>
                <a href="#" className="list-group-item">Cruiserweight</a>
                <a href="#" className="list-group-item">Light Heavyweight</a>
                <a href="#" className="list-group-item">Super Middleweight</a>
                <a href="#" className="list-group-item">Middleweight</a>
                <a href="#" className="list-group-item">Light Middleweight</a>
                <a href="#" className="list-group-item">Welterweight</a>
                <a href="#" className="list-group-item">Light Welterweight</a>
                <a href="#" className="list-group-item">Lightweight</a>
                <a href="#" className="list-group-item">Super Featherweight</a>
                <a href="#" className="list-group-item">Featherweight</a>
                <a href="#" className="list-group-item">Super Bantamweight</a>
                <a href="#" className="list-group-item">Bantamweight</a>
                <a href="#" className="list-group-item">Super Flyweight</a>
                <a href="#" className="list-group-item">Flyweight</a>
                <a href="#" className="list-group-item">Light Flyweight</a>
                <a href="#" className="list-group-item">Minimumweight</a>
                <a href="#" className="list-group-item">Light Minimumweight</a>
            </div>
        );
    }
}

export default App;
