<<<<<<< HEAD
import React, { useState } from 'react';
import './style.css';
import { MultiSelect } from 'primereact/multiselect';

const DefaultMultiSelect = ({ width, valueState, setValueState, options, optionsLabel, optionValue, placeHolder, disabled, filter, maxSelectedLabels }) => {

    return (
        <MultiSelect style={{ width: width ?? "100%" }} value={valueState} onChange={setValueState} options={options}  optionLabel={optionsLabel} optionValue={optionValue} placeholder={placeHolder ?? "Selecione..."} disabled={disabled ?? false} filter={filter} maxSelectedLabels={maxSelectedLabels}/>
    )
}

=======
import React, { useState } from 'react';
import './style.css';
import { MultiSelect } from 'primereact/multiselect';

const DefaultMultiSelect = ({ width, valueState, setValueState, options, optionsLabel, optionValue, placeHolder, disabled, filter, maxSelectedLabels }) => {

    return (
        <MultiSelect style={{ width: width ?? "100%" }} value={valueState} onChange={setValueState} options={options}  optionLabel={optionsLabel} optionValue={optionValue} placeholder={placeHolder ?? "Selecione..."} disabled={disabled ?? false} filter={filter} maxSelectedLabels={maxSelectedLabels}/>
    )
}

>>>>>>> 875c5fc9aea45878e7ea32c9f1c2b5ffdcf2fe80
export default DefaultMultiSelect;