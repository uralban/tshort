import React from 'react';

const ColorsOptions = ({colors}) => {

    const options = Object.keys(colors).map((fieldName, i) => {
        const id = 'color'+i;
        return (
            <>
            <input 
                type="radio" 
                className={"btn-check "+colors[i].color} 
                name="color" 
                id={id} 
                autoComplete="off" 
                value={colors[i].color}
            />
            <label 
                className={"btn btn-outline-primary "+colors[i].color} 
                htmlFor={id}
            >
                {colors[i].color}
            </label>
            </>
            )  
    });
    
    return (
        <div className="btn-group" role="group" aria-label="Basic radio toggle button group">                        
            {options}
        </div>
    );
};

export default ColorsOptions;