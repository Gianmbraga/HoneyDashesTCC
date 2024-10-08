import React from 'react';
import { Column } from './style';

const DefaultColumn = ({ id, children, margin, gap, justifyContent, alignItems, style, textAlign, className }) => {
    return (
        <Column id={id} className={className} margin={margin ?? 0} gap={gap ?? 0} justifyContent={justifyContent} alignItems={alignItems} style={style} textAlign={textAlign}  >
            {children}
        </Column>
    )
}

export default DefaultColumn;