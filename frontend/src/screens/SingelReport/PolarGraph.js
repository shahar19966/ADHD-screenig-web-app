import React, { Component } from "react";
import { VictoryChart, VictoryPolarAxis, VictoryBar } from "victory";

class PolarGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data
    };
  }

  render() {
    return (
      <VictoryChart polar>
        <VictoryPolarAxis
          dependentAxis
          tickValues={[0, 1, 2, 3, 4, 5]}
          labelPlacement="perpendicular"
        />
        <VictoryPolarAxis />
        <VictoryBar
          data={this.state.data.map(d => ({ x: d.x, y: d.y }))}
        />
      </VictoryChart>
    );
  }
}
export default PolarGraph;