import * as React from "react";
import useStore from "./store/zustand.js";
import { Button, Center, Text, Container } from "@chakra-ui/react";

function Board() {
  const squares = useStore((state) => state.squares);
  const setSquares = useStore((state) => state.setSquares);
  const xIsNext = useStore((state) => state.xIsNext);
  const setXIsNext = useStore((state) => state.setXIsNext);
  //dipanggil ketika salah satu papan kotak diklik
  function selectSquare(square) {
    if (squares[square] || calculateWinner(squares)) return;

    const nextValue = squares.slice();
    nextValue[square] = xIsNext ? "X" : "O";

    setSquares(nextValue);
    setXIsNext(!xIsNext);
  }

  function restart() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }
  //mewakili slah satu kotak, menerima indeks i dalam array
  function renderSquare(i) {
    return (
      <Button
        variant="outline"
        rounded="none"
        size="lg"
        style={{
          minWidth: "90px",
          minHeight: "90px",
          color: "black",
          fontSize: "24px",
          fontWeight: "bold",
        }}
        className="square"
        backgroundColor="blackAlpha.400"
        onClick={() => selectSquare(i)}
      >
        {squares[i]}
      </Button>
    );
  }
  const winner = calculateWinner(squares);
  const nextValue = calculateNextValue(squares);
  let status = calculateStatus(winner, squares, nextValue);
  return (
    <>
      <div>
        <div style={{ marginBottom: "10px", fontSize: "20px", fontWeight: "bold" }}>{status}</div>
        <div>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
        <Button colorScheme="yellow" mt='5' onClick={restart}>
          Restart
        </Button>
      </div>
    </>
  );
}

function Game() {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Container
          boxShadow="dark-lg"
          p="10"
          rounded="md"
          textAlign="center"
          backgroundColor="blackAlpha.400"
          bgGradient="linear(red.100 0%, orange.100 25%, yellow.100 50%)"
        >
          <Text fontSize="4xl" fontWeight="bold" mb="5">
            Tic-Tac-Toe
          </Text>
          <div>
            <div>
              <Board />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`;
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? "X" : "O";
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return false;
}

function App() {
  return <Game />;
}

export default App;
