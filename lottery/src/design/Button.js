import React from "react";
import './Button.css'

class Button extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <button className="Button" onClick={this.props.onClick}  disabled={!this.props.enabled}>{this.props.text}</button>
    }
}

Button.defaultProps = {
    enabled: true,
}

export default Button;