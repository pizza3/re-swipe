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
            damping:0.8,
            arr:[]
        }
        this.handleDown = this.handleDown.bind(this);
        this.handleUp = this.handleUp.bind(this);
        this.handleMove = this.handleMove.bind(this);
        this.animate = this.animate.bind(this);
        this.updateCard = this.updateCard.bind(this);
        this.renderChildren = this.renderChildren.bind(this);
    }

    componentDidMount(){
        console.log('mounted');
        this.force={x:0,y:0};
        this.acc={x:0,y:0};
        this.vel={x:0,y:0};
        this.elemenTrack=[];
        this.renderChildren();
        // window.addEventListener('mousemove',(e)=>{this.handleMove(e)})
        // this.animate();
    }

    handleDown(e,val){
        e.preventDefault();
        console.log(val+'card')
        this.setState({
            move:true,
            current:val,
            clickPos:{x:e.clientX,y:e.clientY}
        })
    }

    handleUp(e){
        e.preventDefault();
        this.setState({
            move:false
        })
    }

    handleMove(e){
        e.preventDefault();
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
        let arr = [];
        React.Children.toArray(children).map((child, i) => {
            arr.push(React.cloneElement(child, {
                key: i,
                num: i,
                handleDown:this.handleDown,
                handleUp:this.handleUp
            }))
        });
        // console.log(arr);
        this.setState({
            arr:arr
        })
    }

    render(){
        let style = {
            position:'relative',
            width:'100%',
            height:'100%',
            overflow:'hidden'
        }
        return(
            <div style={style}>
                {/* {this.renderChildren()} */}
                {this.state.arr}
            </div>
        )
    }
}

export default Container;