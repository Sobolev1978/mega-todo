import './style.scss';
import clsx from "clsx";
import {memo} from "react";

const TextButton = ({hidden, ...props}) => {
    const buttonStyle = clsx('text_button', {'hidden': hidden});
    return (
        <button {...props} className={buttonStyle}/>
    );
};

export default memo(TextButton);
