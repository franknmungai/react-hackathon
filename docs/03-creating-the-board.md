---
id: lesson3
title: Creating the chess board
sidebar_label: Creating the chess board
slug: /02-get-started
---

## Working with data

Next we will be creating a chess board. It will look something like this

![img](../static/img/Screenshot3.png)

In order

To get started, let's install ![chess.js](https://github.com/jhlywa/chess.js)
In your project root directory, run

```java
npm install chess.js
```

Create a folder `pages`, our App will consist of several pages. Create a new folder `Game` and a new file with `Game`, name it `index.jsx`. This will be the entry point to the page

Folder structure
In `App.js` let's create a variable that holds our game's data.

```java
const FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

const App = () => {
}
```
