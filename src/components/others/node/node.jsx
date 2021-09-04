import React from "react";
import "./node.css";

export class Node extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     onStartItemDrop: null,
  //     onStopItemDrop: null
  //   };
  // }

  dropItem = (event, row, col) => {
    event.preventDefault();
    var data = event.dataTransfer.getData("img_data");
    console.log(data, row, col);
    event.target.appendChild(document.getElementById(data));

    switch (data) {
      case "car":
        this.props.onStartItemDrop(row, col);
        break;
      case "home":
        this.props.onStopItemDrop(row, col);
        break;
      default:
        break;
    }
  };

  allowDDrop = (event) => {
    event.preventDefault();
  };

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
      onClickDown,
      onMouseHover
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
        onMouseUp={() => onRelease(row, col)}
        onMouseDown={() => onClickDown(row, col)}
        onMouseOver={() => onMouseHover(row, col)}
      >
        <div
          className="city"
          onDrop={(event) => this.dropItem(event, row, col)}
          onDragOver={this.allowDDrop}
        >
          <div key={row * 50 + col} className={_color}></div>
        </div>
      </td>
    );
  }
}

export default Node;
