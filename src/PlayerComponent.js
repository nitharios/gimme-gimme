import React, { Component } from 'react';
import './App.css';

class Player extends Component {
  render() {
    return (
      <div className="Player">
        <div>{this.props.player}</div>
      </div>
    );
  }
}

export default Player;
