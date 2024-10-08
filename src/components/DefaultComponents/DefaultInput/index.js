<<<<<<< HEAD
import React, { useState } from 'react';
import './style.css';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { InputNumber } from 'primereact/inputnumber';

const DefaultInput = ({ width, valueState, setValueState, isEnabled, isPassword, placeholder, fontWeight, color, isUseValidation, onValidationEvent, validationErrorText, isNumber, height, textAlign, keyfilter }) => {

    const [isPassValidation, setIsPassValidation] = useState(true);

    const onLoseFocus = () => {

        if (isUseValidation && typeof (onValidationEvent) == 'function') {
            var result = onValidationEvent(valueState);

            setIsPassValidation(result);
        }
    }

    return (

        <div style={{ width: width ?? "100%" }}>
            {isPassword ?
                <Password inputClassName={isPassValidation ? '' : 'theme-input-error-validation'} feedback={false} disabled={isEnabled == undefined ? false : !isEnabled} inputStyle={{ width: "100%" }} style={{ width: "100%", fontWeight: fontWeight, color: color }} value={valueState} onChange={setValueState} placeholder={placeholder} onBlur={() => onLoseFocus()} /> :
                <InputText className={isPassValidation ? '' : 'theme-input-error-validation'} disabled={isEnabled == undefined ? false : !isEnabled} style={{ width: "100%", fontWeight: fontWeight, color: color, height: height, textAlign: textAlign }} keyfilter={keyfilter} value={valueState} onChange={setValueState} placeholder={placeholder} onBlur={() => onLoseFocus()} />
            }
            {!isPassValidation && validationErrorText && <span style={{ color: 'red', fontWeight: '300', fontSize: '0.775rem' }}>{validationErrorText}</span>}

        </div>
    )
}

=======
import React, { useState } from 'react';
import './style.css';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { InputNumber } from 'primereact/inputnumber';

const DefaultInput = ({ width, valueState, setValueState, isEnabled, isPassword, placeholder, fontWeight, color, isUseValidation, onValidationEvent, validationErrorText, isNumber, height, textAlign, keyfilter }) => {

    const [isPassValidation, setIsPassValidation] = useState(true);

    const onLoseFocus = () => {

        if (isUseValidation && typeof (onValidationEvent) == 'function') {
            var result = onValidationEvent(valueState);

            setIsPassValidation(result);
        }
    }

    return (

        <div style={{ width: width ?? "100%" }}>
            {isPassword ?
                <Password inputClassName={isPassValidation ? '' : 'theme-input-error-validation'} feedback={false} disabled={isEnabled == undefined ? false : !isEnabled} inputStyle={{ width: "100%" }} style={{ width: "100%", fontWeight: fontWeight, color: color }} value={valueState} onChange={setValueState} placeholder={placeholder} onBlur={() => onLoseFocus()} /> :
                <InputText className={isPassValidation ? '' : 'theme-input-error-validation'} disabled={isEnabled == undefined ? false : !isEnabled} style={{ width: "100%", fontWeight: fontWeight, color: color, height: height, textAlign: textAlign }} keyfilter={keyfilter} value={valueState} onChange={setValueState} placeholder={placeholder} onBlur={() => onLoseFocus()} />
            }
            {!isPassValidation && validationErrorText && <span style={{ color: 'red', fontWeight: '300', fontSize: '0.775rem' }}>{validationErrorText}</span>}

        </div>
    )
}

>>>>>>> 875c5fc9aea45878e7ea32c9f1c2b5ffdcf2fe80
export default DefaultInput;