import React, { Component } from "react";

class CompletePage extends Component {

    constructor (props){
        super(props);
        this.state = {
            timeToRedirect: 8,
        };
    }

    componentDidMount() {
        setInterval(() => {
            let currentTime = this.state.timeToRedirect;
            this.setState({timeToRedirect: --currentTime});
        }, 1000);

        setTimeout(() => {
            document.location.href = '/';
        }, this.state.timeToRedirect*1000);
    }

    render () {        
        return (
            <p>
                Thank you for order. You will be redirect to home page in <strong>{this.state.timeToRedirect}</strong> s.
            </p> 
        );
    }
}

export default CompletePage;