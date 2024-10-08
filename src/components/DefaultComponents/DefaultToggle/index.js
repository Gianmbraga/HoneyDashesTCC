<<<<<<< HEAD
import React from 'react';
import { InputSwitch } from 'primereact/inputswitch';

const DefaultToggle = ({ width, valueState, setValueState, item, height }) => {
    return (
        <InputSwitch style={{ width: width, height: height }} checked={valueState} onChange={(e) => setValueState(e, item)} />
    )
}

=======
import React from 'react';
import { InputSwitch } from 'primereact/inputswitch';

const DefaultToggle = ({ width, valueState, setValueState, item, height }) => {
    return (
        <InputSwitch style={{ width: width, height: height }} checked={valueState} onChange={(e) => setValueState(e, item)} />
    )
}

>>>>>>> 875c5fc9aea45878e7ea32c9f1c2b5ffdcf2fe80
export default DefaultToggle;