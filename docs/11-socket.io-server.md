---
id: lesson10
title: Socket.io Server
sidebar_label: Socket.io Server
slug: /11-socket.io-server
---

## Overview

In this section we will work on making the game online and realtime. Player's will be able to connect and play together remotely over the internet.

For this, we will create a server that is going to connect the players and share events such as player moves between them. Our server will be making real-time communication with the connected players' browsers through the [Websockets](https://flaviocopes.com/websockets/) protocol

To get started, let's create a new folder outside of our current `chess-client` directory (or whatever your name for this project is), save that folder as `chess-server`.

```
├───chess-client
└───chess-server
```

Open your terminal, navigate to the `chess-server` folder and run

```js
npm init -y
```

This initialized a new _npm_ project and created a `package.json` file to manage our dependencies. Let's install the packages we need. We need [express.js](https://expressjs.com/) for creating a web server and [socket.io](https://socket.io/) to easily make use of Websockets for instant messaging.

## Server scaffold

In `chess-server`, create a new folder `src`. In `/chess-server/src` create two files, `index.js`
and `game.js`

```
chess-server
├───src
└───package.json
```

```
src
├───index.js
└───game.js
```

Let's create our server in `index.js` by adding this code.

```js title="chess-server/src/index.js"
const http = require('http');
const socketio = require('socket.io');
const express = require('express');

const app = express();
const server = http.createServer(app);
const PORT = 5000;
const io = socketio(server);

server.listen(PORT, () => console.log('Server running on port ' + PORT));
```

To import packages in _node_, we use the `require` function. First, we _require_ `http`, `socketio` and `express`. `http` is a builtin _node_ package that we can use alongside _express_ to create a web server.

We create a new `app` by calling `express` then we create our webserver, `server` by calling `http.createServer` and passing in our express `app`. We define a `PORT` from where the server will be running . Next we create an `io` object by calling `socketio` and providing our server object. `io` is used to listen for connections and to emit events to connected users.

Finally we set up the `server` to listen on `PORT`. Through that port, we can listen for incoming events.

To run the server, open the `package.json` and add the following in the `scripts: {}` section

```json
"scripts": {
	"start": "node src/index.js",
},
```

This creates a command we can us to start our server. In your terminal, navigate to the folder for this project and run `npm start`. This starts our server on `localhost:5000`. You should see this message printed in your terminal once the server starts

```
Server running on port 5000
```

## Managing our games

Before we start working on real-time messaging, let's first create some functions to manage our players and games in `src/game.js`.
All of our games will be stored in an object where the key is the id of the game `gameID` and the value is an array of the two players in that game. Each game(key) will have only two players connected. We can also have multiple games happening concurrently.

Example

```js
const games = {
	5133274: [player1, player2],
	4781580: [player1, player2],
};
```

In `src/game.js` let's create this `games` object to hold our games and a _class_ to represent a Player.

```java title="/chess-server/src/game.js"
const games = {};

class Player {
	constructor(name, color, playerID, gameID) {
		this.name = name;
		this.color = color;
		this.playerID = playerID;
		this.gameID = gameID;
	}
}
```

To create a player, we will need the player's `name`, `color` w or b, the `playerID` for this player and `gameID` for the game they are playing.

Next, let's define the `addPlayer` function we will use to add a player

```js title="/chess-server/src/game.js"
const addPlayer = ({ gameID, name, playerID }) => {
	if (!games[gameID]) {
		const color = Math.random() <= 0.5 ? 'w' : 'b';
		const player = new Player(name, color, playerID, gameID);
		games[gameID] = [player];
		return {
			message: 'Joined successfully',
			opponent: null,
			player,
		};
	}

	if (games[gameID].length >= 2) {
		return { error: 'This game is full' };
	}

	const opponent = games[gameID][0];
	const color = opponent.color === 'w' ? 'b' : 'w';
	const player = new Player(name, color, playerID, gameID);
	games[gameID].push(player);

	return {
		message: 'Added successfully',
		opponent,
		player,
	};
};
```

The `addPlayer` function receives an object with the `name`, `playerID` and `gameID`. To add a player, we first check to see if the game they are trying to join exists or has been created
`games[gameID]`, if not we create this new player providing the required parameters and a randomly assigned color.
`new Player(name, color, playerID, gameID)`
We then create this game and add the player in our array of players. `games[gameID] = [player]`.
We _return_ an object with a `message`, an `opponent` of _null_, since they are the first to join and we don't have any opponent yet and the `player` we just created.

Next, we check to see if the game already has 2 players. If that is true, we return an object with an error `property`.

The last part of this function executes when this game has already been created but the game is not full, i.e when we are adding a second player. For this, we get first player `games[gameID][0]` who is the _opponent_. Then we create a new player and add that to the array of players. `games[gameID].push(player)` we _return_ an object with the _message_, `opponent` and `player` created.

Next we create a function to access a game by it's `id` from our games.

```java title="/chess-server/src/game.js"
const game = (id) => games[id];
```

Let's create a another function to remove a player in case a player leaves the game. This function also returns the player who left the game

```js title="/chess-server/src/game.js"
const removePlayer = (playerID) => {
	for (const game in games) {
		let players = games[game];
		const index = players.findIndex((pl) => pl.playerID === playerID);

		if (index !== -1) {
			return players.splice(index, 1)[0];
		}
	}
};
```

Finally, we export this functions from our module

```js title="/chess-server/src/game.js"
module.exports = {
	addPlayer,
	game,
	removePlayer,
};
```

Find the complete code snippet for `src/game.js` in [this](https://gist.github.com/franknmungai/f830e4fa946178f0e447bcde1c8c279c) Gist.

## Socket events

In our `index.js` file, let's set up our Websockets connection

```js title="src/index.js"
io.on('connection', (socket) => {
	socket.on('join', ({ name, gameID }, callback) => {
		const { error, player, opponent } = addPlayer({
			name,
			playerID: socket.id,
			gameID,
		});
		if (error) {
			return callback({ error });
		}
		socket.join(gameID);
		callback({ color: player.color });

		//send welcome message to player1, and also send the opponent player's data
		socket.emit('welcome', {
			message: `Hello ${player.name}, Welcome to the game`,
			opponent,
		});

		// Tell player2 that player1 has joined the game.
		socket.broadcast.to(player.gameID).emit('opponentJoin', {
			message: `${player.name} has joined the game. `,
			opponent: player,
		});

		if (game(gameID).length >= 2) {
			const white = game(gameID).find((player) => player.color === 'w');
			io.to(gameID).emit('message', {
				message: `Let's start the game. White (${white.name}) goes first`,
			});
		}
	});

	socket.on('move', ({ from, to, gameID }) => {
		socket.broadcast.to(gameID).emit('opponentMove', { from, to });
	});

	socket.on('disconnect', () => {
		const player = removePlayer(socket.id);

		if (player) {
			io.to(player.game).emit('message', {
				message: `${player.name} has left the game.`,
			});
			socket.broadcast.to(player.game).emit('opponentLeft');
		}
	});
});
```

We first listen for new connections `io.on('connection')`. For every connection to our web server, we get a `socket` object which represents that particular connection. We register a listener for the `join` event. This will be emitted from our client in order to join a game, and it receives an object with the `name` and `gameID` and a callback function from the client. We use the `addPlayer` function to join this game. If we get an error, we pass this to the callback function to be received by the client, if it was successful, we return the color assigned to the player via the callback.

We also add this player to the game `socket.join(gameID)`. (In _socket.io_ terms, it's called a _room_)

We emit a `welcome` event to this socket/connection through `socket.emit()` and provide a `message` and the `opponent` for this player. The opponent might be _null_ of this socket is the first player.

Next, we emit the `opponentJoin` event to the other player in the game, `socket.broadcast.to(player.gameID)` (in case one had joined before), and send them their opponent data.
`socket.broadcast` sends an event to the other connected sockets/clients in the same game/room.

Next, we check if game is full `game(gameID).length >= 2`, if _true_, we emit a _message_ event to all players using `io.to(gameID).emit` to inform them to start the game.

When a client makes a move, they will emit a _move_ event. We listen for this event in
`socket.on('move')` and inform the other client of their opponents move by emiting the _opponentMove_ event and passing some data about the move `socket.broadcast.to(gameID).emit('opponentMove', { from, to })`

Finally, we set up a listener for _disconnect_ `socket.on('disconnect')` which is emitted when a socket is disconnected e.g by closing the app on their browser.
We use the `removePlayer` function to remove this player from our games object, and then emit a _message_ event to the other player to inform them. We also emit an additional _opponentLeft_ event using `socket.broadcast.to(player.game).emit('opponentLeft')`.

That's all we need to setup our server. Find the complete code snippet for the server, `src/index.js` [here](https://gist.github.com/franknmungai/7d83a7259f48aff7937fe2da6a72bf2a)

Get the complete server-side code on [GitHub](https://github.com/franknmungai/live-chess-server)
