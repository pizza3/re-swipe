import React from 'react';


const Card =(props)=>{
    let {num} = props;
    let style = {
        position:'absolute',
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
        <div id={'re-card'+num} style={style} onMouseDown={(e)=>{props.handleDown(e,num)}} onMouseUp={()=>{props.handleUp(num)}}>
            Hello🎉
        </div>
    )
}

export default Card;