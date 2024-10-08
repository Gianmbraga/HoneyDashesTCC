<<<<<<< HEAD
import React from 'react';
import { Row } from './style';

const DefaultRow = ({ children, margin, justifyContent, alignItems, gap, style, className }) => {
    return (
        <Row margin={margin ?? 0} gap={gap ?? 0} justifyContent={justifyContent} alignItems={alignItems} style={style} className={className}>
            {children}
        </Row>
    )
}

=======
import React from 'react';
import { Row } from './style';

const DefaultRow = ({ children, margin, justifyContent, alignItems, gap, style, className }) => {
    return (
        <Row margin={margin ?? 0} gap={gap ?? 0} justifyContent={justifyContent} alignItems={alignItems} style={style} className={className}>
            {children}
        </Row>
    )
}

>>>>>>> 875c5fc9aea45878e7ea32c9f1c2b5ffdcf2fe80
export default DefaultRow;