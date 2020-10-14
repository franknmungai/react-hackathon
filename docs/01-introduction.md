---
id: intro
title: Introduction
sidebar_label: Introduction
slug: /introduction
---

In this tutorial, we will be creating a chess game that allows players to play online, and even communicate with each other through video chat. This will make it a truly live game experience.

This tutorial is perfect for beginner learners with a good understanding of fundamental concepts in JavaScript such as variables, functions, conditionals, objects, arrays and arrays methods, and ES6+ features.
Basic HTML and CSS knowledge is also needed to follow along
No knowledge on React and Node.js will be required. Theses will be explained along the way.

## Techonologies

React, Node.js, socket.io, WebRTC

## What you will learn:

1. The basics of React, components, props and state.

2. React hooks. <code>useState</code>, <code>useEffect</code>, <code>useRef</code> and more

3. CSS grid layouts

4. Working with Material-ui components

5. Using Drag and Drop events

6. Web sockets for real-time client-server communication using <code>socket.io</code>

7. Adding Video streaming using <code>WebRTC</code> and <code>peer.js</code>

## Project overview.

The features in our app will include

- Creating a new game,
- Inviting a friend to a game via a sharable URL
- A chess board with black and white chess pieces
- A player will be able to drag and drop a piece in order to play
- We need to provide some player feedback such as highlighting a player's possible moves, showing a player when they are in check, showing a list of captured pieces and validating moves.
- Allowing players to start a video call, and play "live"

This is just an overview of most of the features we will be implementing in our application. We recommend you check out the finished app [here](https://friendlychat-a2335.firebaseapp.com/) to have a better understanding of how it works

For creating the game's interface, we will be using [React](https://reactjs.org). It's a JavaScript library used for creating User interfaces. When using React, our output(view or user-interface) is a function of our data. The data could be a string, object, array or any data type. By changing this data in certain ways, React automatically re-renders the parts of our application affected by the change in data. This makes it declarative. This is a fundamental concept that will become more clear as we go on with our project.

To handle chess logic, generating, and validating moves for pieces in our game, checkmate and draw detection, we will be using the library [chess.js](https://github.com/jhlywa/chess.js). It does all the heavy lifting so that we don't need to handle chess related logic directly, letting us focus on our app and user experience.

## Setup

We need to install Node.js to download some of the packages used in this project. We will also require Node to create our app's server. You can download and install Node.js [here](https://nodejs.org)
