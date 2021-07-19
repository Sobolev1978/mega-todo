import {FILTER_TYPE_ALL} from "../constants";
import {
    ADD_TASK_SUCCESS,
    CHANGE_FILTER,
    CHECK_ALL_SUCCESS,
    CHECK_TASK_SUCCESS,
    DELETE_COMPLETED_SUCCESS,
    DELETE_TASK_SUCCESS,
    GET_TASKS_SUCCESS, LOG_OUT,
    LOGIN_SUCCESS,
    REGISTRATION_SUCCESS,
    SET_ERROR,
    SET_LOADING,
} from "../actions/actionTypes";

export const initialState = {
    tasks: [],
    filter: FILTER_TYPE_ALL,
    error: null,
    loading: true,
    isAuth: true,
}

const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TASKS_SUCCESS:
            return {...state, error: null, loading: false, tasks: action.tasks};
        case ADD_TASK_SUCCESS:
            return {...state, error: null, loading: false, tasks: [...state.tasks, action.task]};
        case DELETE_TASK_SUCCESS:
            return {...state, error: null, loading: false, tasks: state.tasks.filter(task => task.id !== action.id)}
        case CHECK_TASK_SUCCESS:
            return {
                ...state, error: null, loading: false, tasks:
                    state.tasks.map((task) => {
                        if (action.id === task.id) {
                            return {...task, checked: !task.checked}
                        }
                        return task
                    })
            }
        case DELETE_COMPLETED_SUCCESS:
            return {...state, error: null, loading: false, tasks: state.tasks.filter((task) => !task.checked)}
        case CHECK_ALL_SUCCESS:
            return {
                ...state, error: null, loading: false, tasks:
                    state.tasks.map((task) => {
                        if (!task.checked) {
                            return {...task, checked: true};
                        }
                        return task;
                    })
            }
        case CHANGE_FILTER:
            return {...state, filter: action.newFilter}
        case SET_ERROR:
            return {...state, loading: false, error: action.error?.response || action.error || null}
        case SET_LOADING:
            return {...state, loading: action.loading}
        case LOGIN_SUCCESS:
            return {...state, loading: false, isAuth: true}
        case REGISTRATION_SUCCESS:
            return {...state, loading: false}
        case LOG_OUT:
            return {...state, tasks: [], isAuth: false, filter: FILTER_TYPE_ALL}
        default:
            return state
    }
}
export default todoReducer
