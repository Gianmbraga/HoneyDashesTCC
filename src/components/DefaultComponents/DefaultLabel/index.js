<<<<<<< HEAD
import React from 'react';

const DefaultLabel = ({ fontWeight, title, fontSize, color, margin, width, border, borderRadius }) => {
    return (
        <span style={{ margin: margin, fontWeight: fontWeight ?? 300, fontSize: fontSize, color: color, width: width, border: border, borderRadius: borderRadius}}>{title ?? "Label"}</span>
    )
}

=======
import React from 'react';

const DefaultLabel = ({ fontWeight, title, fontSize, color, margin, width, border, borderRadius }) => {
    return (
        <span style={{ margin: margin, fontWeight: fontWeight ?? 300, fontSize: fontSize, color: color, width: width, border: border, borderRadius: borderRadius}}>{title ?? "Label"}</span>
    )
}

>>>>>>> 875c5fc9aea45878e7ea32c9f1c2b5ffdcf2fe80
export default DefaultLabel;