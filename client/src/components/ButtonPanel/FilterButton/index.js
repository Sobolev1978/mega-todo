import './style.scss';
import clsx from "clsx";
import {memo} from "react";

const FilterButton = ({active, ...props}) => {
    const buttonStyle = clsx('filter_btn', {'active': active});
    return (
        <button {...props} className={buttonStyle}/>
    );
}

export default memo(FilterButton);
