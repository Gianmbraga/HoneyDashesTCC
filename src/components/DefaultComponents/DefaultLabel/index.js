import React from 'react';

const DefaultLabel = ({ fontWeight, title, fontSize, color, margin, width, border, borderRadius }) => {
    return (
        <span style={{ margin: margin, fontWeight: fontWeight ?? 300, fontSize: fontSize, color: color, width: width, border: border, borderRadius: borderRadius}}>{title ?? "Label"}</span>
    )
}

export default DefaultLabel;