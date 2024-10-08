import React from 'react';
import { Row } from './style';

const DefaultRow = ({ children, margin, justifyContent, alignItems, gap, style, className }) => {
    return (
        <Row margin={margin ?? 0} gap={gap ?? 0} justifyContent={justifyContent} alignItems={alignItems} style={style} className={className}>
            {children}
        </Row>
    )
}

export default DefaultRow;