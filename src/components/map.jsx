import React from "react";
import Node from "./others/node/node";
import { Dijkstra } from "../algorithm/dijkstra";
import { astarSearch } from "../algorithm/a*";
import "./map.css";
// import Car from "../car.png";

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      start: null,
      run: false,
      algorithm: null,
      destination: null,
      mousePressed: false,
    };
  }

  componentDidMount() {
    this.setState({ grid: initializeGrid() });
  }

  carDrapStart = (event) => {
    event.dataTransfer.setData("img_data", event.target.id);

    var img = new Image();
    img.src = "/car.png";
    img.style.height = "25px";
    event.dataTransfer.setDragImage(img, 50, 50);
  };

  homeDrapStart = (event) => {
    event.dataTransfer.setData("img_data", event.target.id);

    var img = new Image();
    img.src = "/home1.png";
    img.style.height = "25px";
    event.dataTransfer.setDragImage(img, 50, 50);
  };

  dragging = (event) => {
    event.preventDefault();
    // console.log(e);
  };

  setStart = (row, col) => {
    this.setState(
      {
        start: row * this.state.grid[0].length + col,
      },
      () => {
        if (this.state.start !== null && this.state.destination !== null) {
          this.setState({
            run: true,
          });
        }
      }
    );
  };

  setEnd = (row, col) => {
    this.setState(
      {
        destination: row * this.state.grid[0].length + col,
      },
      () => {
        if (this.state.start !== null && this.state.destination !== null) {
          this.setState({
            run: true,
          });
        }
      }
    );
  };

  setDestination = (start, destination) => {
    this.setState({
      start: start,
      destination: destination,
    });
    const tempGrid = this.state.grid.slice();
    const nodeStart = tempGrid[(start / 50) ^ 0][start % 50 ^ 0];
    let temp = {
      ...nodeStart,
      isStart: !nodeStart.isStart,
    };
    tempGrid[(start / 50) ^ 0][start % 50 ^ 0] = temp;
    const nodeDes = tempGrid[(destination / 50) ^ 0][destination % 50 ^ 0];
    temp = {
      ...nodeDes,
      isEnd: !nodeDes.isEnd,
    };
    tempGrid[(destination / 50) ^ 0][destination % 50 ^ 0] = temp;
    this.setState({ grid: tempGrid });
  };

  handleChange = (event) => {
    this.setState({ algorithm: event.target.value });
    // console.log(this.state.algorithm, event.target.value);
  };

  handleClickDown = (row, col) => {
    this.setState({ mousePressed: true });
    const nGrid = setWall(this.state.grid, row, col);
    this.setState({ grid: nGrid });
  };

  handleHover = (row, col) => {
    if (!this.state.mousePressed) return;
    console.log("Hovering");
    const nGrid = setWall(this.state.grid, row, col);
    this.setState({ grid: nGrid });
  };

  handleRelease = () => {
    // const nGrid = setWall(this.state.grid, row, col);
    this.setState({ mousePressed: false });
  };

  searchMap = () => {
    this.setDestination(this.state.start, this.state.destination);
    const inVisitedOrder =
      this.state.algorithm === "0"
        ? Dijkstra(this.state.grid, this.state.start, this.state.destination)
        : this.state.algorithm === "1"
        ? astarSearch(this.state.grid, this.state.start, this.state.destination)
        : null;
    if (inVisitedOrder != null) {
      this.animateMovement(inVisitedOrder[0]);
      this.showPath(inVisitedOrder[1]);
    }
  };

  animateMovement = (grid) => {
    for (let i = 0; i < grid.length; i++) {
      // setTimeout(() => {
      const node = grid[i];
      const tempGrid = this.state.grid;
      const temp = {
        ...node,
        isVisited: true,
      };
      tempGrid[node.row][node.col] = temp;
      this.setState({ grid: tempGrid });
      // }, 100 * i);
    }
  };

  showPath = (path) => {
    let count = -1;
    for (let i = path.length - 1; i >= 0; i--) {
      setTimeout(() => {
        const node = path[i];
        const tempGrid = this.state.grid;
        const temp = {
          ...node,
          isPath: true,
        };
        tempGrid[node.row][node.col] = temp;
        this.setState({ grid: tempGrid });
      }, 500 * count++);
    }
  };

  render() {
    const board = this.state.grid.map((items, i) => {
      return (
        <tr key={i}>
          {items.map((node, j) => {
            let { row, col, isStart, isEnd, isWall, isVisited, isPath } = node;
            row = i;
            col = j;
            return (
              <Node
                row={row}
                col={col}
                key={row * this.state.grid[0].length + col}
                isStart={isStart}
                isEnd={isEnd}
                isWall={isWall}
                isVisited={isVisited}
                onStartItemDrop={this.setStart}
                onStopItemDrop={this.setEnd}
                isPath={isPath}
                onClickDown={() => this.handleClickDown(row, col)}
                onRelease={() => this.handleRelease()}
                onMouseHover={() => this.handleHover(row, col)}
              />
            );
          })}
        </tr>
      );
    });
    return (
      <div className="Map">
        <div className="Nav">
          <div>
            <select onChange={this.handleChange} id="algorithm">
              <option value={null}>select an algorithm</option>
              <option value={0}>dijkstra</option>
              <option value={1}>a*</option>
              <option value={2}>concurrent-dijkstra</option>
            </select>
          </div>
          <div>
            <button
              style={{ marginRight: "10px" }}
              onClick={() => this.searchMap()}
              disabled={!this.state.run}
              className="run"
            >
              run
            </button>
            {/* <button
              onClick={() => this.setDestination(256, 548)}
              className="run"
            >
              start
            </button> */}
          </div>
        </div>

        <div className="road">
          <div>
            <div className="img-desc">
              <div className="desc-div">
                {/* <h3>Description</h3> */}
                <span>Drag the images below to the board</span>
                <span>{this.state.mousePressed.toString()}</span>
                <span>
                  The <strong>car</strong> is the starting point, while the{" "}
                  <strong>home img</strong> is the destination
                </span>
              </div>
              <div className="img">
                <img
                  onDragStart={(e) => this.carDrapStart(e)}
                  onDrag={(e) => this.dragging(e)}
                  id="car"
                  src="/car.png"
                  draggable="true"
                  className="car"
                  alt=""
                />
                <img
                  onDragStart={(e) => this.homeDrapStart(e)}
                  onDrag={(e) => this.dragging(e)}
                  id="home"
                  src="/home1.png"
                  draggable="true"
                  className="home"
                  alt=""
                />
              </div>
            </div>
            <table cellSpacing="0">
              <tbody className="Board">{board}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

const createNode = (row, col) => {
  return {
    key: row * 50 + col,
    row,
    col,
    heuristic: null,
    distance: Infinity,
    heuristicDistance: null,
    isStart: false,
    isEnd: false,
    isWall: false,
    isVisited: false,
    isPath: false,
    previousNode: null,
    neighbours: [],
  };
};

const initializeGrid = () => {
  const grid = [];
  for (let i = 0; i < 20; i++) {
    let col = [];
    for (let j = 0; j < 50; j++) {
      col.push(createNode(i, j));
    }
    grid.push(col);
  }
  return grid;
};

const setWall = (grid, row, col) => {
  const tempGrid = grid.slice();
  const node = tempGrid[row][col];
  if (!node.isStart && !node.isEnd) {
    let temp = {
      ...node,
      isWall: !node.isWall,
    };
    tempGrid[row][col] = temp;
  }
  return tempGrid;
};

export default Map;
