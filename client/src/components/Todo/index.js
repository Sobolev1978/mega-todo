import {FaTrashAlt, GoCheck} from "react-icons/all";
import clsx from "clsx";
import {memo} from "react";

const Todo = ({name, checked, checkTask, deleteTask}) => {
    const itemStyle = clsx('todo_info', {'active': checked});
    return (<li className={'todo_item'}>
            <div onClick={checkTask} className={'todo_circle'}>
                {checked ? <GoCheck className={'go_check'}/> : null}
            </div>
            <span className={itemStyle}>{name}</span>
            <FaTrashAlt onClick={deleteTask} className={'trash_button'}/>
        </li>
    )
}

export default memo(Todo)
