<<<<<<< HEAD
import React from 'react';
import { Column } from './style';

const DefaultColumn = ({ id, children, margin, gap, justifyContent, alignItems, style, textAlign, className }) => {
    return (
        <Column id={id} className={className} margin={margin ?? 0} gap={gap ?? 0} justifyContent={justifyContent} alignItems={alignItems} style={style} textAlign={textAlign}  >
            {children}
        </Column>
    )
}

=======
import React from 'react';
import { Column } from './style';

const DefaultColumn = ({ id, children, margin, gap, justifyContent, alignItems, style, textAlign, className }) => {
    return (
        <Column id={id} className={className} margin={margin ?? 0} gap={gap ?? 0} justifyContent={justifyContent} alignItems={alignItems} style={style} textAlign={textAlign}  >
            {children}
        </Column>
    )
}

>>>>>>> 875c5fc9aea45878e7ea32c9f1c2b5ffdcf2fe80
export default DefaultColumn;