import React, {memo} from 'react';
import {Spin} from "antd";
import clsx from "clsx";

const Loader = ({loading = false}) => {
    const backDropStyle = clsx('back_drop', {'back_drop__active': loading});
    return (
        <div className={backDropStyle}>
            <div className={'back_drop_loader'}>
                <Spin/>
            </div>
        </div>
    );
};

export default memo(Loader);
