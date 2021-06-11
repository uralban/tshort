import React from 'react';
import TopbarAuth from "./TopbarAuth";
import TopbarNoAuth from "./TopbarNoAuth";

const useTopbar = isAutentificated => {
    
    if (isAutentificated) {

        return (
            <TopbarAuth />
        );
    }
    return (
        <TopbarNoAuth />
    );
}

export default useTopbar;