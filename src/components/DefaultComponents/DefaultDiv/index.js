import React from 'react';
import { useState, useEffect } from 'react';

const DefaultDiv = ({maxWidth, children, width, height, margin, className, id, display, border, borderRadius, borderColor, textAlign, padding, overflowY, minHeight, justifyContent, alignItems, backgroundColor, lineHeight, overflowX, onClick}) => {
    
    return (
        
        <div id={id} style={{maxWidth: maxWidth ?? '100%', width: width ?? '100%', margin: margin ?? 0, height: height, display: display, border: border, borderRadius: borderRadius, borderColor: borderColor, textAlign: textAlign, padding: padding, overflowY: overflowY, minHeight: minHeight, justifyContent: justifyContent, alignItems: alignItems, backgroundColor: backgroundColor, lineHeight: lineHeight, overFlowX: overflowX }} className={className} onClick={onClick ?? onClick}>
            {children}
        </div>
    )
}
export default DefaultDiv;
