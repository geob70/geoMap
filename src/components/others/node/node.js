import React from "react";
import "./node.css";

export class Node extends React.Component {
  render() {
    const {
      row,
      col,
      isStart,
      isEnd,
      isWall,
      isVisited,
      isPath,
      onRelease,
      onClickDown
    } = this.props;

    const _color = isStart
      ? "node-start"
      : isWall
      ? "node-wall"
      : isEnd
      ? "node-end"
      : isVisited
      ? "node-visited"
      : isPath
      ? "node-path"
      : "";
    return (
      <td
        className="node"
        onMouseOut={() => onRelease(row, col)}
        onMouseDown={() => onClickDown(row, col)}
      >
        <div className="city">
          <div key={row * 50 + col} className={_color}></div>
        </div>
      </td>
    );
  }
}

export default Node;
