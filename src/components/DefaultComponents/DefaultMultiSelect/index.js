import React, { useState } from 'react';
import './style.css';
import { MultiSelect } from 'primereact/multiselect';

const DefaultMultiSelect = ({ width, valueState, setValueState, options, optionsLabel, optionValue, placeHolder, disabled, filter, maxSelectedLabels }) => {

    return (
        <MultiSelect style={{ width: width ?? "100%" }} value={valueState} onChange={setValueState} options={options}  optionLabel={optionsLabel} optionValue={optionValue} placeholder={placeHolder ?? "Selecione..."} disabled={disabled ?? false} filter={filter} maxSelectedLabels={maxSelectedLabels}/>
    )
}

export default DefaultMultiSelect;