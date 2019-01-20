# re-swipe

## Introduction

re-swipe is a card swipe concept as seen on applications such as tinder, which provides the card like component
and the track of accept and reject state of each and every card.

## Basic Usage

```js
import React, { Component } from "react";
import Container, { Card } from "re-swipe";

class App extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

    render(){
        return(
            <Container>
                <Card></Card>
            </Container>
        )
    }
}

```

## API

`<Container>`

| Prop          | Description   | Type  | Default Value | Expected Values |
| ------------- |:-------------|:-----:|:-----|:-----|
| mass          | Provide the mass for animation.            | Float | 0.7 | 0.1 - 1 |
| damping       | Provide the damping for animation.         | Float | 0.8 | 0.1 - 2|
| width         | The width for parent container  | Int      | 300 | -  | 
| height        | The height for parent container | Int      | 500 | -  |
| offset        | The offset trigger areas on left and right | Int | 10 | 5 - 40 |

`<Card>`

| Prop          | Description   | Type  | Default Value |
| ------------- |:-------------|:-----:|:-----|
| width         | Provide the width of the child component  | Int | 300 |
| height        | Provide the height of the child component | Int | 400 |

## How does it work

## Demo

## License
