# re-cardswipe

## Introduction

re-cardswipe is a react component library emulating the UI card swipe as seen on applications such as tinder, this library provides the state track for each card, controls for physics of animation, dynamic trigger, and other feature's.

<p align="left" >
  <img src="https://github.com/pizza3/asset/blob/master/Jan-22-2019%2000-54-20.gif?raw=true" height="auto" width="33.3%">
    <img src="https://github.com/pizza3/asset/blob/master/Jan-22-2019%2009-48-47.gif?raw=true" height="auto" width="33.3%">
</p>

## Installation

```zsh
npm install re-cardswipe --save
```

## Basic Usage

```js
import React, { Component } from "react";
import ReContainer, { ReCard } from "re-cardswipe";

class App extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

    render(){
        return(
            <ReContainer>
                <ReCard></ReCard>
            </ReContainer>
        )
    }
}

```

## API

`<ReContainer>`

| Prop          | Description   | Type  | Default Value | Expected Values |
| ------------- |:-------------|:-----:|:-----|:-----|
| mass          | Provide the mass for animation.            | float | 0.7 | 0.1 - 1 |
| damping       | Provide the damping for animation.         | float | 0.8 | 0.1 - 2 |
| width         | The width for parent container  | int      | 300 | -  | 
| height        | The height for parent container | int      | 500 | -  |
| onSwipe       | Callback function, executed when the card has been swiped.  | func() | - | - |
| trigger       | shows Accept and Reject button when true | boolean | false | - |


`<ReCard>`

| Prop          | Description   | Type  | Default Value |
| ------------- |:-------------|:-----:|:-----|
| width         | Provide the width of the child component  | int | 300 |
| height        | Provide the height of the child component | int | 400 |
| metaData      | object recieved in `onSwipe()` the callback function, store any form of data related  to the specific card | object | {} |

## How does it work

It consist of two components `<ReContainer/>` and the `<ReCard/>`, the `<ReContainer/>` component is used to keep track of each card component 
being swipped left and right. By default the `<ReContainer/>` component only 
render's 4 cards component only for better animation and performace. Each 
`<Card/>` component has to be provided width a callback function which is
used to return o the state of the card when swiped to the left or swiped
to the right.

The `<ReContainer>` take's the `offset` prop which is by default set to 10,
the `offset` will be used to check if the point of contact with a `<Card/>`
component is under the offset area which will trigger the swipe mechanism.

<p align="center" >
  <img src="https://raw.githubusercontent.com/pizza3/asset/master/img1.png" height="auto" width="60%">
</p>

## Demo

## License

MIT

