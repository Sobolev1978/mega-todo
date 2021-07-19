import './style.scss';
import {memo} from "react";

const InputPanel = (props) => {
    return (
        <div className={'input_panel'}>
            <input {...props} className={'todo_input'}/>
        </div>
    );
};

export default memo(InputPanel);
