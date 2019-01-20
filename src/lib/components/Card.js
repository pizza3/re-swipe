import React,{Component} from 'react';

class Card extends Component{
    constructor(props) {
		super(props);
		this.state = {
			active: false,
			move: false,
			limit: false,
			out:false,
			mouseStartPosX: null,
			mouseStartPosY: null,
			mouseCurrPosX: null,
			mouseCurrPosY: null,
			Posx: null,
			Posy: null,
			k: 0.2,
			restX: 0,
			restY: 0,
			mass: 0.7,
			damping: 0.8
		};
		this.handleDown = this.handleDown.bind(this);
		this.handleUp = this.handleUp.bind(this);
        this.handleMove = this.handleMove.bind(this);
        this.handleTouchStart = this.handleTouchStart.bind(this);
		this.handleTouchMove = this.handleTouchMove.bind(this);
		this.animate = this.animate.bind(this);
		this.updateCard = this.updateCard.bind(this);
		this.f={x:0,y:0};
		this.a={x:0,y:0};
		this.v={x:0,y:0};
	}

	handleDown(e) {
		if(!this.state.active){ 
			this.animate();
		}
		e.stopPropagation();
		e.preventDefault();
		this.setState({
			move: true,
			active: true,
			mouseStartPosX: e.clientX,
			mouseStartPosY: e.clientY
		});
    }
    
    handleTouchStart(e) {
		if(!this.state.active){ 
			this.animate();
		}
		e.stopPropagation();
		e.preventDefault();
		e.persist();
		this.setState({
			move: true,
			active: true,
			mouseStartPosX: e.touches[0].screenX,
			mouseStartPosY: e.touches[0].screenY
		});
	}

    handleMove(e) {
		e.preventDefault();
		if (!this.state.limit) {
			if (this.state.move) {
				let mouseCurrPosX = e.clientX;
				let mouseCurrPosY = e.clientY;
				let Posx = mouseCurrPosX - this.state.mouseStartPosX;
				let Posy = mouseCurrPosY - this.state.mouseStartPosY;
				let height = window.innerHeight;
				let width = window.innerWidth;

				const map_range = (value, low1, high1, low2, high2) => {
					return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
				}
				
				let mouseRange = mouseCurrPosX;
				if (mouseRange < width / 2) {
					mouseRange = width - mouseRange;
				}
				let damping = map_range(
					mouseRange,
					width / 2,
					width - width * 10 / 100,
					0.6,
					0.8
				);

				this.setState({
					Posx,
					Posy,
					damping,
					mouseCurrPosX,
					mouseCurrPosY
				});

				if (mouseCurrPosX > width - width * 20 / 100) {
					let restX, restY;
					if (mouseCurrPosX > width / 2) {
						restX = this.state.Posx * 5;
					} else {
						restX = -this.state.Posx * 5;
					}
					if (mouseCurrPosY > height / 2) {
						restY = this.state.Posy * 5;
					} else {
						restY = this.state.Posy * 5;
					}
					let limit = true;
					let move = false;
					let damping = 0.06;
					this.setState(
						{
							restX,
							restY,
							limit,
							move,
							damping
						},
						() => {
							setTimeout(() => {
								window.cancelAnimationFrame(this.animate);
							}, 10);
						}
					);
				} else if (mouseCurrPosX < width * 20 / 100) {
					let restX, restY;
					if (mouseCurrPosX > width / 2) {
						restX = -this.state.Posx * 5;
					} else {
						restX = this.state.Posx * 5;
					}
					if (mouseCurrPosY > height / 2) {
						restY = this.state.Posy * 5;
					} else {
						restY = this.state.Posy * 5;
					}
					let limit = true;
					let move = false;
					let damping = 0.08;
					this.setState({
						restX,
						restY,
						limit,
						move,
						damping
					});
				}
			}
		}
    }
    
    handleTouchMove(e) {
		e.persist();
		if (!this.state.limit) {
			if (this.state.move) {
				let mouseCurrPosX = e.touches[0].screenX;
				let mouseCurrPosY = e.touches[0].screenY;
				let Posx = mouseCurrPosX - this.state.mouseStartPosX;
				let Posy = mouseCurrPosY - this.state.mouseStartPosY;
				let el = document.getElementById("card" + this.props.no);
				let height = window.innerHeight;
				let width = window.innerWidth;
				let maxX = width - width * 20 / 100;
				
				const map_range = (value, low1, high1, low2, high2) => {
					return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
				}

				let mouseRange = mouseCurrPosX;
				if (mouseRange < width / 2) {
					mouseRange = width - mouseRange;
				}
				let damping = map_range(
					mouseRange,
					width / 2,
					width - width * 10 / 100,
					0.6,
					0.8
				);

				this.setState({
					Posx,
					Posy,
					damping,
					mouseCurrPosX,
					mouseCurrPosY
				});

				if (mouseCurrPosX > width - width * 10 / 100) {
					let restX, restY;
					if (mouseCurrPosX > width / 2) {
						restX = this.state.Posx * 5;
					} else {
						restX = -this.state.Posx * 5;
					}
					if (mouseCurrPosY > height / 2) {
						restY = this.state.Posy * 5;
					} else {
						restY = this.state.Posy * 5;
					}
					let limit = true;
					let move = false;
					let damping = 0.08;
					this.setState(
						{
							restX,
							restY,
							limit,
							move,
							damping
						},
						() => {
							setTimeout(() => {
								window.cancelAnimationFrame(this.animate);
							}, 10);
						}
					);
				} else if (mouseCurrPosX < width * 10 / 100) {
					let restX, restY;
					if (mouseCurrPosX > width / 2) {
						restX = -this.state.Posx * 5;
					} else {
						restX = this.state.Posx * 5;
					}
					if (mouseCurrPosY > height / 2) {
						restY = this.state.Posy * 5;
					} else {
						restY = this.state.Posy * 5;
					}
					let limit = true;
					let move = false;
					let damping = 0.08;
					this.setState({
						restX,
						restY,
						limit,
						move,
						damping
					});
				}
			}
		}
	}

    handleUp() {
		this.setState({
			move: false
		});
    }

    updateCard() {
		if (!this.state.move) {
			this.f.x= -this.state.k * (this.state.Posx - this.state.restX);
			this.f.y= -this.state.k * (this.state.Posy - this.state.restY);
			this.a.x= this.f.x/this.state.mass;
			this.a.y= this.f.y/this.state.mass;
			this.v.x= this.state.damping * (this.v.x + this.a.x);
			this.v.y= this.state.damping * (this.v.y + this.a.y);
			this.setState({
				Posx: this.state.Posx + this.v.x,
				Posy: this.state.Posy + this.v.y
			})
		}
	}

	animate() {
		let el = document.getElementById("re-card" + this.props.num);
		if (
			this.state.Posx > window.innerWidth + 400 ||
			this.state.Posx < -window.innerWidth - 400
		) {
			cancelAnimationFrame(this.animate);
			this.props.updateChildren();
		} else {
			requestAnimationFrame(this.animate);
		}
		if (this.state.active) {
			this.updateCard();
        }
	}
	
    render(){
        let {num,children,width,height} = this.props;
        let style = {
            position:'absolute',
            left: '0px',
            right: '0', 
            top: '0px',
            bottom:'0',
            marginLeft: 'auto', 
            marginRight: 'auto',
            marginTop: 'auto',
            marginBottom:'auto',
			boxSizing:'border-box',
			width:width,
			height:height,
			transform :
				"translate(" +
				this.state.Posx +
				"px" +
				"," +
				this.state.Posy +
				"px) rotate(" +
				this.state.Posx / 9 +
				"deg) perspective(800px)"
		}
		
        return(
				<div id={'re-card'+num} style={style} onMouseDown={this.handleDown}
					onMouseMove={this.handleMove}
					onMouseUp={this.handleUp}
					onMouseLeave={this.handleUp}
					onTouchStart={this.handleTouchStart}
					onTouchMove={this.handleTouchMove}
					onTouchEnd={this.handleUp}
				>
					{children}
				</div>
        )
    }
}

export default Card;