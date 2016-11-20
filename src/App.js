import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
        <div className="row">
            <div className="col-md-8">
                <div className="list-group">
                    <a href="#" className="list-group-item">
                        <h4 className="list-group-item-heading">List group item heading</h4>
                        <p className="list-group-item-text">
                            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a
                            piece of classical Latin literature from 45 BC, making it over 2000 years old.
                        </p>
                    </a>
                    <a href="#" className="list-group-item">
                        <h4 className="list-group-item-heading">List group item heading</h4>
                        <p className="list-group-item-text">
                            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece
                            of classical Latin literature from 45 BC, making it over 2000 years old.
                        </p>
                    </a>
                </div>
            </div>
            <div className="col-md-4">
                <div className="list-group">
                    <a href="#" className="list-group-item active">
                        Cras justo odio
                    </a>
                    <a href="#" className="list-group-item">Dapibus ac facilisis in</a>
                    <a href="#" className="list-group-item">Morbi leo risus</a>
                    <a href="#" className="list-group-item">Porta ac consectetur ac</a>
                    <a href="#" className="list-group-item">Vestibulum at eros</a>
                </div>
            </div>
        </div>
    );
  }
}

export default App;
