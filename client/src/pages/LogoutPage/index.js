import React from 'react';


const LogoutPage = () => {    
    const yes = () => {
        localStorage.removeItem('token');
        document.location.href = '/';
    }
    
    const no = () => {
        document.location.href = '/';
    }

    return (
        <div className="container">
            <div className="row">
                Are you shure?
                <div className="btn-group" role="group">
                    <button className="btn btn-success" onClick={()=>yes()}>Yes</button>
                    <button className="btn btn-danger" onClick={()=>no()}>No</button>
                </div>
            </div>
        </div>
    )
}

export default LogoutPage;