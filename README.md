# re-swipe

## Introduction

re-swipe is a card swipe concept as seen on applications such as tinder, which provides the card like component
and the track of accept and reject state of each and every card.

## Usage

```js
import React, { Component } from "react";
import ReContainer, { ReCard } from "re-swipe";

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

`ReContainer`

| Prop          | Description   | Type  | Default Value |
| ------------- |:-------------|:-----:|:-----|
| mass          | Provide the mass for animation.        | Float | 0.7 |
| damping       | Provide the damping for animation.     | Float | 0.8 |
| width         | Proved the width for parent container  | Int   | 300 |
| height        | Proved the height for parent container | Int   | 500 |
