// heuristic function => addition of absolute of rows and column from destination.
export function astarSearch(grid, start, destination) {
  createMap(grid, start, destination);
  const aStar = runAlgo(grid, start, destination);
  return aStar;
}

function runAlgo(grid, start, destination) {
  // distance travelled plus heuristic number
  // add neighbours and mark parent as visited
  // select lowest neighbour .......

  const startNode = grid[(start / 50) ^ 0][start % 50];
  const endNode = grid[(destination / 50) ^ 0][destination % 50];

  const unvisited = [];
  const visited = [];
  const mapDistance = {};

  startNode.distance = 0;
  mapDistance[startNode.key] = 0 + startNode.heuristic;
  unvisited.push(startNode);

  while (unvisited.length > 0) {
    const node = returnLowestCost(unvisited);
    const neighbours = node.neighbours;

    for (let i in neighbours) {
      let neighbour = neighbours[i];
      if (neighbour.key in mapDistance) {
        if (node.distance + neighbour.heuristic < mapDistance[neighbour.key]) {
          neighbour.previousNode = node;
          neighbour.distance = node.distance + neighbour.distance;
          neighbour.heuristicDistance = node.distance + neighbour.heuristic;
          mapDistance[neighbour.key] = node.distance + neighbour.heuristic;
        }
      } else {
        neighbour.distance = node.distance + 1;
        neighbour.previousNode = node;
        neighbour.heuristicDistance = neighbour.distance + neighbour.heuristic;
        mapDistance[neighbour.key] = neighbour.heuristic + neighbour.distance;
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

function returnLowestCost(array) {
  array.sort(function(a, b) {
    return a.heuristicDistance - b.heuristicDistance;
  });
  return array.shift();
}

function generatePath(destination) {
  const queue = [];
  while (destination.previousNode !== null) {
    queue.push(destination);
    destination = destination.previousNode;
  }
  return queue;
}

function generateHeuristic(location, start, endNode) {
  if (location.col >= start % 50) {
    const heuristic =
      Math.abs(location.row - ((endNode / 50) ^ 0)) +
      Math.abs(location.col - (endNode % 50));
    location.heuristic = heuristic;
  } else {
    const distanceFromEnd =
      Math.abs(location.row - ((endNode / 50) ^ 0)) +
      Math.abs(location.col - (endNode % 50));
    const cost = 678;
    location.heuristic = distanceFromEnd + cost;
  }
}

function createMap(grid, start, endNode) {
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 50; j++) {
      generateHeuristic(grid[i][j], start, endNode);
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
    if (j + 1 <= 49 && !grid[i][j + 1].isWall) {
      grid[i][j].neighbours.push(grid[i][j + 1]);
    }
    if (j - 1 >= 0 && !grid[i][j - 1].isWall) {
      grid[i][j].neighbours.push(grid[i][j - 1]);
    }
  }
}
