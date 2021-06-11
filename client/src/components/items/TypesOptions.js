import React from 'react';

const TypesOptions = ({types}) => {

    const options = Object.keys(types).map((fieldName, i) => {
            const key = 'type'+ i;
            return (
                <option key={key} value={types[i].type}>{types[i].type}</option>
                )  
    });
    
    return (
        <select className="form-select" aria-label="Type select" name="type">
            <option>Select type</option>
            {options}
        </select>
    );
};

export default TypesOptions;