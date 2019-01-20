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
            arr:[],
            displayChildren:[],
            maxElement:4
        }
        this.renderChildren = this.renderChildren.bind(this);
        this.updateChildren = this.updateChildren.bind(this);
    }

    componentDidMount(){
        this.renderChildren();
    }

    renderChildren(){
        if(React.Children.toArray(this.props.children).length<4){
            const children = this.props.children;
            let arr = [];
            let displayChildren = []
            React.Children.toArray(children).map((child, i) => {
                arr.push(React.cloneElement(child, {
                    key: i,
                    num: i,
                    handleDown:this.handleDown,
                    handleUp:this.handleUp,
                    updateChildren:this.updateChildren
                }))
            });
            displayChildren=arr;
            this.setState({
                arr:arr,
                children:this.props.children,
                displayChildren
            })
        }
        else{
            const children = this.props.children.slice(0,this.props.children.length);
            let arr = [];
            let displayChildren = []
            React.Children.toArray(children).map((child, i) => {
                arr.push(React.cloneElement(child, {
                    key: i,
                    num: i,
                    handleDown:this.handleDown,
                    handleUp:this.handleUp,
                    updateChildren:this.updateChildren
                }))
            });
            displayChildren=arr.slice(this.props.children.length-this.state.maxElement,this.props.children.length)
            this.setState({
                arr:arr,
                children:this.props.children,
                displayChildren
            })
        }
    }

    updateChildren(){
        let {arr,maxElement,displayChildren} = this.state;
        maxElement+=1;
        displayChildren.pop();
        if(this.props.children.length>=maxElement){
            displayChildren.unshift(arr[this.props.children.length-maxElement])
            this.setState({
                displayChildren,
                maxElement
            })
        }
        else{
            this.setState({
                displayChildren,
                maxElement
            })
        }
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
                {this.state.displayChildren}
            </div>
        )
    }
}

export default Container;