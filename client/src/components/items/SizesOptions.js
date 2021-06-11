import React from 'react';

const SizesOptions = ({sizes}) => {

    const options = Object.keys(sizes).map((fieldName, i) => {
            const id = 'size'+i;
            return (
                <>
               <input 
                    type="radio" 
                    className="btn-check" 
                    name="size" 
                    id={id} 
                    autoComplete="off" 
                    value={sizes[i].size}
                />
                <label 
                    className="btn btn-outline-primary" 
                    htmlFor={id}
                >
                    {sizes[i].size}
                </label>
                </>
                )  
    });
    
    return (
        <div className="btn-group" role="group" aria-label="Size select">
            {options}
        </div>
    );
};

export default SizesOptions;