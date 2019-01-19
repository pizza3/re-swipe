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
			fx: 0,
			fy: 0,
			ax: 0,
			ay: 0,
			vx: 0.0,
			vy: 0.0,
			mass: 0.7,
			damping: 0.8
		};
		this.handleDown = this.handleDown.bind(this);
		this.handleUp = this.handleUp.bind(this);
        this.handleMove = this.handleMove.bind(this);
        this.handleTouchStart = this.handleTouchStart.bind(this);
		this.handleTouchEnd = this.handleTouchEnd.bind(this);
		this.handleTouchMove = this.handleTouchMove.bind(this);
		this.animate = this.animate.bind(this);
		this.updateCard = this.updateCard.bind(this);
	}

	componentDidMount() {
		this.animate();
	}

	handleDown(e) {
		this.setState({
			move: true,
			active: true,
			mouseStartPosX: e.clientX,
			mouseStartPosY: e.clientY
		});
    }
    
    handleTouchStart(e) {
		e.persist();
		this.setState({
			move: true,
			active: true,
			mouseStartPosX: e.touches[0].screenX,
			mouseStartPosY: e.touches[0].screenY
		});
	}

    handleMove(e) {
		if (!this.state.limit) {
			if (this.state.move) {
				let mouseCurrPosX = e.clientX;
				let mouseCurrPosY = e.clientY;
				let Posx = mouseCurrPosX - this.state.mouseStartPosX;
				let Posy = mouseCurrPosY - this.state.mouseStartPosY;
				let el = document.getElementById("card" + this.props.no);
				let height = window.innerHeight;
				let width = window.innerWidth;
				let maxX = width - width * 20 / 100;

				function map_range(value, low1, high1, low2, high2) {
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
					let damping = 0.06;
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
				function map_range(value, low1, high1, low2, high2) {
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
    
    handleTouchEnd() {
		this.setState({
			move: false
		});
	}

    updateCard() {
		if (!this.state.move) {
			this.setState(
				{
					fx: -this.state.k * (this.state.Posx - this.state.restX),
					fy: -this.state.k * (this.state.Posy - this.state.restY)
				},
				() => {
					this.setState(
						{
							ax: this.state.fx / this.state.mass,
							ay: this.state.fy / this.state.mass
						},
						() => {
							this.setState(
								{
									vx: this.state.damping * (this.state.vx + this.state.ax),
									vy: this.state.damping * (this.state.vy + this.state.ay)
								},
								() => {
									// console.log(this.state.vx)
									if(this.state.limit){
										if(Math.floor(this.state.vx)===0){
											this.setState({
												out:true
											})
										}
									}
									this.setState({
										Posx: this.state.Posx + this.state.vx,
										Posy: this.state.Posy + this.state.vy
									})
								}
							);
						}
					);
				}
			);
		}
	}

	animate() {
		let el = document.getElementById("re-card" + this.props.num);
		if (
			this.state.Posx > window.innerWidth + 400 ||
			this.state.Posx < -window.innerWidth - 400
		) {
			cancelAnimationFrame(this.animate);
		} else {
			requestAnimationFrame(this.animate);
		}
		if (this.state.active) {
			el.style.transform =
				"translate(" +
				this.state.Posx +
				"px" +
				"," +
				this.state.Posy +
				"px) rotate(" +
				this.state.Posx / 9 +
				"deg) perspective(800px)";
			this.updateCard();
        }
	}
	
    render(){
        let {num} = this.props;
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
            width:'250px',
            height:'350px',
            backgroundImage: 'linear-gradient(to top, #00c6fb 0%, #005bea 100%)',
            color:'#fff',
            fontFamily: 'sans-serif',
            borderRadius: '18px',
            textAlign:'center',
            fontWeight: 'bolder',
            fontSize: '48px',
            paddingTop: '17%',
		}
		
        return(
			!this.state.out?
				<div id={'re-card'+num} style={style} onMouseDown={this.handleDown}
					onMouseMove={this.handleMove}
					onMouseUp={this.handleUp}
					onMouseLeave={this.handleUp}
					onTouchStart={this.handleTouchStart}
					onTouchMove={this.handleTouchMove}
					onTouchEnd={this.handleTouchEnd}
				>
					Hello🎉
				</div>
			:
			null
        )
    }
}

export default Card;