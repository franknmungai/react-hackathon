---
id: lesson13
title: Creating and joining a Game
sidebar_label: Creating and joining a Game
slug: /13-creating-and-joining-a-game
---

## Overview

When a player clicks on the _Create_ button on the `Home` page, we need to direct them to the `Game` component and forward the name and gameID required by the Game component to create a new Game.

Let's handle this in the `onSubmit` function in the `Form` component `src/pages/Home/index.jsx`.

```jsx title="/src/pages/Home/index.jsx" {1,6,13-19}
import { useHistory } from 'react-router-dom';

const Form = () => {
	const [name, setName] = useState('');
	const [gameID, setGameID] = useState('');
	const history = useHistory();

	useEffect(() => {
		const id = Math.random().toString().replace('0.', '');
		setGameID(id);
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();
		if (!(name && gameID)) {
			return;
		}
		history.push(`/game?name=${name}&id=${gameID}`);
	};

	return (
		<div>
			<h2>Play Chess with your friends online</h2>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					className="input"
					value={name}
					onChange={({ target }) => setName(target.value)}
					placeholder="Display Name"
				/>
				<div className="gameId">Game ID: {gameID}</div>
				<hr />
				<p className="invite">Invite your friend over</p>
				<ShareButtons
					shareText={`https://stack-chess.netlify.app?id=${gameID}`}
					subject="Join me for a game of Chess on Stack Chess"
				/>

				<Button onClick={handleSubmit}>Create</Button>
			</form>
		</div>
	);
};
```

At the top of the file we import the `useHistory` hook from `react-router-dom` and use it to create a `history` object `const history = useHistory()`. The `history` object can be used to navigate between pages.
In the `handleSubmit` function we call `history.push` which navigates to the page we provide as a parameter. `/game?name=${name}&id=${gameID}` we navigate to `/game` and provide 2 query string values `name` and `id` which will be accessed by the `Game` component to create the game.

## Invited Players

A player is invited to a game through an invite link like this one
`https://<our-app-url>?id=123456`.
This is our app url with a query string of the _id_ of the game they have been invited to join.

To handle the case when a player is invited, we need to check if the url already has an `id` query string, if true, we use that instead of generating a random one in the `useEffect` in the `Form` component.

To parse query strings and extract values from them, we'll make use of the [query string](https://www.npmjs.com/package/query-string) library

Install this library in the project root directory

```
npm i query-string
```

Let's make this changes in our `Form` component

```jsx title="/src/pages/Home.jsx"
const location = useLocation(); //import { useLocation } from 'react-router-dom';

const { id: inviteID } = qs.parse(location.search); //import qs from 'query-string';

useEffect(() => {
	if (inviteID) return setGameID(inviteID);
	const id = Math.random().toString().replace('0.', '');
	setGameID(id);
}, [inviteID]);
```

We import the `useLocation` hook from react-router-dom. It gives us an object that represents the current url.
`location.search` returns the query strings of the url and we parse that using `qs.parse` to get the id (renamed to `inviteID`).
In the `useEffect`, if an `inviteID` exists, we set it to our `gameID` state.
`if (inviteID) return setGameID(inviteID)`

Try entering an _id_ manually e.g `http://localhost:3000/?id=12345648`. This should be displayed in the form as the _id_.

Find the code snippet for the complete Home page in [this gist](https://gist.github.com/franknmungai/814e8cdd0018322698f55ff9cfcd73e3)

## Receiving data in our Game component

In the `Game` component, we also need to parse the query string to extract the player's `name` and `id` and use them to create a game.

Let's add the following to our Game component, the rest of the code remains unchanged.

```jsx {10-14,17-26,30,48} title="/src/pages/Game/index.jsx"
import { useLocation, useHistory } from 'react-router-dom';
import qs from 'query-string';

// This is within the Game component
const location = useLocation();
const history = useHistory();
const playerName = useRef();
const gameID = useRef();

useEffect(() => {
	const { id, name } = qs.parse(location.search);
	playerName.current = name;
	gameID.current = id;
}, [location.search]);

useEffect(() => {
	socket.emit(
		'join',
		{ name: playerName.current, gameID: gameID.current },
		({ error, color }) => {
			if (error) {
				history.push('/');
			}
			console.log({ color });
		}
	);
	socket.on('welcome', ({ message, opponent }) => {
		console.log({ message, opponent });
	});
	socket.on('opponentJoin', ({ message, opponent }) => {
		console.log({ message, opponent });
	});

	socket.on('opponentMove', ({ from, to }) => {
		chess.move({ from, to });
		setFen(chess.fen());
	});
	socket.on('message', ({ message }) => {
		console.log({ message });
	});
}, [chess, history]);

const makeMove = (pos) => {
	const from = fromPos.current;
	chess.move({ from, to: pos });
	dispatch({ type: types.CLEAR_POSSIBLE_MOVES });
	setFen(chess.fen());
	socket.emit('move', { gameID: gameID.current, from, to: pos });
};
```

We get the `name` and `id` from the query string and store them in our `playerName` and `gameID` _refs_.

We use the `name` and `id` stored in our _refs_ to join the game in `socket.emit('join')`. In case of an error, we redirect the user back to the Home page `/` with `history.push('/')`.

We also update the `makeMove` function to use the correct `gameID`

To test this out, ensure the web-server is running and create a new game with any player name. View your logs in the browser.

```
{color: 'b'}
{message: "Hello (your display name), Welcome to the game"}
```

Add multiple players by opening two tabs and using the same id to join the game.
`http://localhost:3000/?id=12345648`

Get the complete code for the Game component in this [gist](https://gist.github.com/franknmungai/cec7853f34aea2178cc1096fc61103b8)

The code for this section can be found in [this GitHub branch](https://github.com/franknmungai/live-chess/tree/12-creating-and-joining-a-game)
