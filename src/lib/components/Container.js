import React, {Component} from 'react';

class Container extends Component{
    constructor(props){
        super(props);
        this.state={
            move:false,
            current:0,
            clickPos:{x:0,y:0},
            pos:{x:0,y:0},
            k:0.2,
            mass:0.7,
            damping:0.8
        }
        this.handleDown = this.handleDown.bind(this);
        this.handleUp = this.handleUp.bind(this);
        this.handleMove = this.handleMove.bind(this);
        this.animate = this.animate.bind(this);
        this.updateCard = this.updateCard.bind(this);
    }

    componentDidMount(){
        console.log('mounted');
        this.force={x:0,y:0};
        this.acc={x:0,y:0};
        this.vel={x:0,y:0};
        window.addEventListener('mousemove',(e)=>{this.handleMove(e)})
        this.animate();
    }

    handleDown(e,val){
        console.log(val+'card')
        this.setState({
            move:true,
            current:val,
            clickPos:{x:e.clientX,y:e.clientY}
        })
    }

    handleUp(){
        this.setState({
            move:false
        })
    }

    handleMove(e){
        let {clickPos} = this.state;
        if(this.state.move){
            this.setState({
                pos:{
                    x:e.clientX - clickPos.x,
                    y:e.clientY - clickPos.y
                }
            })
        }
    }

    updateCard(){
        const {pos,current,mass,k,damping} = this.state;
        this.force={
            x:-k * (pos.x - 0.5),
            y:-k * (pos.y - 0.5)
        };
        this.acc={
            x:this.force.x/mass,
            y:this.force.y/mass
        };
        this.vel={
            x:damping*(this.vel.x+this.acc.x),
            y:damping*(this.vel.y+this.acc.y)
        };
        this.setState({
            pos:{
                x:this.vel.x + this.state.pos.x,
                y:this.vel.y + this.state.pos.y
            }
        },()=>{
            document.getElementById(`re-card${current}`).style.transform = `translate(${pos.x}px ,${pos.y}px )`;
        });
    }

    animate(){
        const {pos,current} = this.state;
        requestAnimationFrame(this.animate);
        if(!this.state.move){
            this.updateCard();
        }
        else{
            document.getElementById(`re-card${current}`).style.transform = `translate(${pos.x}px ,${pos.y}px )`;
        }
    }

    renderChildren(){
        const {children} = this.props;
        return React.Children.toArray(children).map((child, i) => {
            return React.cloneElement(child, {
                key: i,
                num: i,
                handleDown:this.handleDown,
                handleUp:this.handleUp
            });
        });
    }

    render(){
        return(
            <div>
                {this.renderChildren()}
            </div>
        )
    }
}

export default Container;