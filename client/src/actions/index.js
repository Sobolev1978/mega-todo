import {
    ADD_TASK_SUCCESS,
    CHANGE_FILTER,
    CHECK_ALL_SUCCESS,
    CHECK_TASK_SUCCESS,
    DELETE_COMPLETED_SUCCESS,
    DELETE_TASK_SUCCESS,
    GET_TASKS_SUCCESS,
    LOG_OUT,
    LOGIN_SUCCESS,
    REGISTRATION_SUCCESS,
    SET_ERROR,
    SET_LOADING
} from "./actionTypes";
import api from "../api";
import tokenStorage from "../tokenStorage";

export const getTasksSuccess = (tasks) => {
    return {
        type: GET_TASKS_SUCCESS,
        tasks,
    }
}

export const addTaskSuccess = (task) => {
    return {
        type: ADD_TASK_SUCCESS,
        task,
    }
}

export const deleteTaskSuccess = (id) => {
    return {
        type: DELETE_TASK_SUCCESS,
        id,
    }
}

export const checkTaskSuccess = (id) => {
    return {
        type: CHECK_TASK_SUCCESS,
        id,
    }
}

export const deleteCompletedSuccess = () => {
    return {
        type: DELETE_COMPLETED_SUCCESS,
    }
}

export const checkAllSuccess = () => {
    return {
        type: CHECK_ALL_SUCCESS,
    }
}

export const changeFilter = (newFilter) => {
    return {
        type: CHANGE_FILTER,
        newFilter,
    }
}

export const setError = (error) => {
    return {
        type: SET_ERROR,
        error,
    }
}

export const setLoading = (loading) => {
    return {
        type: SET_LOADING,
        loading,
    }
}

export const loginSuccess = () => {
    return {
        type: LOGIN_SUCCESS,
    }
}

export const registrationSuccess = () => {
    return {
        type: REGISTRATION_SUCCESS,
    }
}

export const logout = () => {
    return {
        type: LOG_OUT,
    }
}

//THUNK
export const fetchTasks = () => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const tasksResponse = await api.get('/tasks', {'Auth': tokenStorage.getToken()});
        dispatch(getTasksSuccess(tasksResponse.tasks));
    } catch (error) {
        dispatch(setError(error))
    }
}

export const addTask = (name) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const taskResponse = await api.post('/tasks', {
            name,
        }, {'Auth': tokenStorage.getToken()});
        dispatch(addTaskSuccess(taskResponse.task))
    } catch (error) {
        dispatch(setError(error))
    }
}

export const deleteTask = (id) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        await api.delete('/tasks', {
            id,
        }, {'Auth': tokenStorage.getToken()});
        dispatch(deleteTaskSuccess(id))
    } catch (error) {
        dispatch(setError(error))
    }
}

export const checkTask = (id, checked) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        console.log(checked)
        await api.patch('/tasks', {
            id,
            checked,
        }, {'Auth': tokenStorage.getToken()});
        dispatch(checkTaskSuccess(id))
    } catch (error) {
        dispatch(setError(error))
    }
}

export const deleteCompleted = () => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        await api.delete('/tasks/completed', {}, {'Auth': tokenStorage.getToken()});
        dispatch(deleteCompletedSuccess())
    } catch (error) {
        dispatch(setError(error))
    }
}

export const checkAll = () => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        await api.patch('/tasks/completed', {}, {'Auth': tokenStorage.getToken()});
        dispatch(checkAllSuccess())
    } catch (error) {
        dispatch(setError(error))
    }
}

export const login = (login, password, remember) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const loginResponse = await api.post('/auth/login', {
            login,
            password,
        });
        tokenStorage.setTokenStorage(remember)
        tokenStorage.setToken(loginResponse.jwt)
        dispatch(loginSuccess())
    } catch (error) {
        dispatch(setError(error))
    }
}

export const registration = (login, password, successCallback) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        await api.post('/auth/registration', {
            login,
            password,
        },);
        successCallback && successCallback();
        dispatch(registrationSuccess());
    } catch (error) {
        dispatch(setError(error))
    }
}
