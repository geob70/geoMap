export function Dijkstra(grid, start, destination) {
  createMap(grid);
  const dijkstra = runAlgo(grid, start, destination);
  return dijkstra;
}

function runAlgo(grid, start, destination) {
  const startNode = grid[(start / 50) ^ 0][start % 50];
  const endNode = grid[(destination / 50) ^ 0][destination % 50];

  // create javascript queue
  // add start-node
  // find all the neighbour and update their path
  // remove top of queue (start-node)
  // pick next node
  // repeat from step one
  // handle walls

  const unvisited = [];
  const visited = [];
  const mapDistance = {};

  startNode.distance = 0;
  mapDistance[startNode.key] = 0;
  unvisited.push(startNode);

  while (unvisited.length > 0) {
    const node = unvisited.shift();
    const neighbours = node.neighbours;

    for (let i in neighbours) {
      let neighbour = neighbours[i];
      if (neighbour.key in mapDistance) {
        if (node.distance + neighbour.distance < mapDistance[neighbour.key]) {
          neighbour.previousNode = node;
          neighbours.distance = node.distance + neighbour.distance;
          mapDistance[neighbour.key] = node.distance + neighbour.distance;
        }
      } else {
        neighbour.distance = node.distance + 1;
        neighbour.previousNode = node;
        mapDistance[neighbour.key] = node.distance + neighbour.distance;
        unvisited.push(neighbour);
      }
    }
    if (node.key !== start && node.key !== destination) {
      visited.push(node);
    }
    if (node.key === endNode.key) {
      break;
    }
  }
  const path = generatePath(grid[(destination / 50) ^ 0][destination % 50]);
  const response = [];
  response.push(visited);
  response.push(path);
  return response;
}

function generatePath(destination) {
  const queue = [];
  while (destination.previousNode !== null) {
    queue.push(destination);
    destination = destination.previousNode;
  }
  return queue;
}

function createMap(grid) {
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 50; j++) {
      setNeighbour(grid, i, j);
    }
  }
}

function setNeighbour(grid, i, j) {
  if (!grid[i][j].isWall) {
    if (i - 1 >= 0 && !grid[i - 1][j].isWall) {
      grid[i][j].neighbours.push(grid[i - 1][j]);
    }
    if (i + 1 < 20 && !grid[i + 1][j].isWall) {
      grid[i][j].neighbours.push(grid[i + 1][j]);
    }
    if (j + 1 < 49 && !grid[i][j + 1].isWall) {
      grid[i][j].neighbours.push(grid[i][j + 1]);
    }
    if (j - 1 >= 0 && !grid[i][j - 1].isWall) {
      grid[i][j].neighbours.push(grid[i][j - 1]);
    }
  }
}
