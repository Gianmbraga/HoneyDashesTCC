import React from 'react';
import { InputSwitch } from 'primereact/inputswitch';

const DefaultToggle = ({ width, valueState, setValueState, item, height }) => {
    return (
        <InputSwitch style={{ width: width, height: height }} checked={valueState} onChange={(e) => setValueState(e, item)} />
    )
}

export default DefaultToggle;