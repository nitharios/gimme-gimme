import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';
import './styles.css';

class GameWinner extends Component {
  constructor(props) {
    super(props)
    this.state = {
      roomID: null,
      winner: null,
      winningPhoto: null,
      redirect: false,
      players: null,
    }

    this.socket = null;
  }

  componentDidMount() {
    this.socket = io();
    const roomID = this.props.match.params.id;
    this.setState({ roomID: roomID })
    axios.get(`/api/rooms/${roomID}/results`)
      .then(response => {
        this.setState({
          winner: response.data.winner.name,
          winningPhoto: response.data.winningPhoto
        })
        if (response.data.players) {
          this.setState({ players: response.data.players })
        }

        return true;
      })
    this.socket.emit('END_ROUND', {
      roomID: roomID
    })
  }

  replay = e => {
    e.preventDefault();
    this.setState({ redirect: true })
  }

  render() {
    if (this.state.redirect) {
      return (
        <Redirect to="/" />
      )
    }
    return (
      <div className="GameWinner">
        <div className="game-winner">Winner: {this.state.winner}!</div>
        <div className="winning-photo">
          <img src={this.state.winningPhoto} alt="" />
        </div>
        <button onClick={this.replay}>Replay</button>
      </div>
    );
  }
}

export default GameWinner;
