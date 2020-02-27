import React from "react";

class Intro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        date: new Date()
      });
    });
  }

  render() {
    return (
      <div>
        <h3>Geo-Map</h3>
        <h5>{this.state.date.toLocaleTimeString()}.</h5>
      </div>
    );
  }
}

export default Intro;
