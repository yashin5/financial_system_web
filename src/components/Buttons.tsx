import React from 'react'
import { Button } from 'reactstrap'

interface Props{
    buttonLoad: boolean,
    value: string,
    type: string,
    color: string,
    size?: string,
    onClick?: Function,
    style?: Object,

};

const Buttons = (props: Props) => {
    const buttonType = props.type === "submit" ? "submit" : "button";
    const doFunction = () => props.onClick? props.onClick() : null

    return(
        !props.buttonLoad?
            <Button style={props.style} type={buttonType} onClick={doFunction} 
                color={props.color} size={props.size}>{props.value}
            </Button>
            :
            <Button style={props.style} type={buttonType} color={props.color} 
                size={props.size} disabled>
                    {props.value}
            </Button>
    );
};

export default Buttons