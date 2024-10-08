import React, { useState } from 'react';
import './style.css';
import { Dropdown } from 'primereact/dropdown';

const DefaultDropdown = ({ width, valueState, setValueState, options, optionsLabel, optionValue, placeHolder, disabled, height, showClear, showFilter }) => {

    return (
        
        <Dropdown
            showClear={showClear}
            style={{ width: width ?? "100%", height: height ?? "100%" }}
            value={valueState}
            onChange={setValueState}
            options={options}
            optionLabel={optionsLabel}
            optionValue={optionValue}
            placeholder={placeHolder ?? "Selecione..."}
            filter={showFilter}
            disabled={disabled ?? false}
        />  

    )
}

export default DefaultDropdown;