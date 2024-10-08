import React from 'react';
import './style.css';
import { Divider } from 'primereact/divider';

const DefaultDivider = ({ title, hasIcon, icon, color, align, orientation, lineStyle, isFullLine, backgroundColor }) => {
    return (
        isFullLine ?
            <div className='divider-full-line'></div> :
            <Divider align={align ?? "left"} style={{ color: color ?? "gray" }} layout={orientation ?? "horizontal"} type={lineStyle ?? "solid"}>
                <div className="p-d-inline-flex p-ai-center" style={{backgroundColor: backgroundColor ?? 'white'}}>
                    {hasIcon && <i className={`${icon ?? "pi pi-bookmark"}`}></i>}
                    <b>{title ?? "-"}</b>
                </div>
            </Divider>
    )
}

export default DefaultDivider;