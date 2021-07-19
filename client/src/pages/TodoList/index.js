import Todo from "../../components/Todo";
import './style.scss';
import {memo, useEffect, useMemo} from "react";

import {FILTER_TYPE_TODO, FILTER_TYPE_COMPLETED} from "../../constants";
import {useDispatch, useSelector} from "react-redux";
import {addTask, changeFilter, checkAll, checkTask, deleteCompleted, deleteTask, fetchTasks} from "../../actions";
import InputPanel from "../../components/InputPanel";
import ButtonPanel from "../../components/ButtonPanel";

const TodoList = () => {
    const {tasks, filter} = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTasks())
    }, [])

    const addTodoHandler = (e) => {
        if (e.key === 'Enter' && e.target.value.trim()) {
            dispatch(addTask(e.target.value))
            e.target.value = "";
        }
    }

    const deleteTaskHandler = (id) => () => {
        dispatch(deleteTask(id))
    }

    const checkTaskHandler = (id, checked) => () => {
        dispatch(checkTask(id, checked))
    }

    const deleteCompletedHandler = () => {
        dispatch(deleteCompleted())
    }

    const uncheckedCounter = useMemo(() => {
        return tasks.reduce((acc, task) => {
            if (!task.checked) {
                return acc + 1;
            }
            return acc;
        }, 0)
    }, [tasks])

    const checkedTaskCounter = useMemo(() => tasks.length - uncheckedCounter, [tasks, uncheckedCounter]);

    const checkAllHandler = () => {
        dispatch(checkAll())
    }

    const filterTasks = useMemo(() => {
        switch (filter) {
            case FILTER_TYPE_TODO:
                return tasks.filter((task) => !task.checked);
            case FILTER_TYPE_COMPLETED:
                return tasks.filter((task) => task.checked);
            default:
                return tasks;
        }
    }, [tasks, filter]);

    const changeFilterHandler = (newFilter) => () => {
        dispatch(changeFilter(newFilter))
    }

    return (
        <>
            <h1 className={'todo_title'}>Your todo list</h1>
            <div className={'todo_block'}>
                <div>
                    <InputPanel onKeyDown={addTodoHandler} type='text' name='name'
                                placeholder='Enter your task name here'/>
                    <ul className={'todo_list'}>
                        {filterTasks.map((task) => {
                            return <Todo name={task.name} checkTask={checkTaskHandler(task.id, !task.checked)}
                                         key={task.id}
                                         checked={task.checked}
                                         deleteTask={deleteTaskHandler(task.id)}/>
                        })}
                    </ul>
                    {tasks.length ?
                        <ButtonPanel deleteCompleted={deleteCompletedHandler}
                                     checkAll={checkAllHandler}
                                     checkedTaskCounter={checkedTaskCounter}
                                     uncheckedCounter={uncheckedCounter}
                                     filter={filter}
                                     onChangeFilter={changeFilterHandler}/> : null}
                </div>
            </div>
        </>

    )
}

export default memo(TodoList)
