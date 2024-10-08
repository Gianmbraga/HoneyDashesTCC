import React from 'react';
import './style.css';
import { Button } from 'primereact/button';

//type: primary, success, danger, warning
const DefaultButton = ({ title, icon, type, onClick, height, color, disabled}) => {
    return (
        <Button className={type == "success" ? "p-button-success" : type == "secondary" ? "p-button-secondary" : type == "danger" ? "p-button-danger" : type == "warning" ? "p-button-warning" : type == "default" ? "p-button-default" : ""}
            style={{ width: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center', height: height, color: color }}
            label={title}
            icon={icon}
            onClick={onClick} 
            disabled={disabled}/>
    )
}

export default DefaultButton;