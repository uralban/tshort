import React from 'react';

const FormErrors = ({formErrors}) => {

    const errors = Object.keys(formErrors).map((fieldName, i) => {
        if(formErrors[fieldName].length > 0){
            return (
                <div className="alert alert-danger" key={i}>{fieldName} {formErrors[fieldName]}</div>
                )        
            } else {
                return '';
            }
    });
    
    return (
        <div className='formErrors'>
            {errors}
        </div>
    );
};

export default FormErrors;