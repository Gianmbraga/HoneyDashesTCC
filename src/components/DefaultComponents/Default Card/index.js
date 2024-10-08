import React from 'react';
import './style.css';
import { DefaultCardStyle } from './style';

const DefaultCard = ({ children, size, margin, style, placeholder, backGroundColor, className }) => {
    return (
        <DefaultCardStyle 
            size={size} 
            margin={margin ?? "0 0 1rem 0"} 
            placeholder={placeholder} 
            style={style} 
            backGroundColor={backGroundColor} 
            className={className}
        >
            {children}
        </DefaultCardStyle>
    )
}

export default DefaultCard;
