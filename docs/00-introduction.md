---
id: intro
title: Introduction
sidebar_label: Introduction
slug: /introduction
---

In this tutorial, we will be creating a chess game that allows players to create and share games and play online.

This tutorial is perfect for beginner learners with a good understanding of fundamental concepts in JavaScript such as _variables_, _functions_, _conditionals_, _objects_, _arrays_, _arrays helper methods_, and ES6+ features.
Basic HTML and CSS knowledge is also needed to follow along.

No knowledge on React and Node.js will be required. These will be explained along the way.

## Techonologies

React, Node.js, socket.io

## What you will learn:

1. The basics of React, _components_, _props_ and _state_.

2. React hooks. `useState`, `useEffect`, `useRef`, `useContext` and more

3. CSS grid layouts

4. Using Drag and Drop events

5. Web sockets for real-time client-server communication using `socket.io`

## Project overview.

The features in our app will include

- A form to create a new game
- Inviting a friend to a game via a sharable URL
- A chess board with black and white chess pieces
- A player will be able to drag and drop a piece in order to play.
- We need to provide some player feedback such as highlighting a player's possible moves, alerting a player when they are in check, validating moves and showing a list of captured pieces.

This is just an overview of most of the features we will be implementing in our application. We recommend you check out the finished app [here](https://stack-chess.netlify.app/) to have a better understanding of how it works

For creating the game's interface, we will be using [React](https://reactjs.org). It's a JavaScript library used for creating user interfaces. When using React, our output(view or user-interface) is a function of our data. The data could be a string, object, array or any data type. By changing this data in certain ways, React automatically re-renders the parts of our application affected by the change in data. This makes it declarative. This is a fundamental concept that will become more clear as we go on with our project.

To handle chess logic, generating and validating moves for pieces in our game, checkmate and draw detection and more, we will be using the library [chess.js](https://github.com/jhlywa/chess.js). It does all the heavy lifting so that we don't need to handle chess related logic directly, letting us focus on our app and user experience.

## Setup

We need to install Node.js to download some of the packages used in this project. We will also require Node to create our app's server. You can download and install Node.js from [here](https://nodejs.org)
