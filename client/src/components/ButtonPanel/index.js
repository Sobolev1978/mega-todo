import TextButton from "./TextButton";
import FilterButton from "./FilterButton";
import './style.scss';
import {FILTER_TYPE_ALL, FILTER_TYPE_TODO, FILTER_TYPE_COMPLETED} from "../../constants";
import {memo} from "react";

const ButtonPanel = ({filter, onChangeFilter, uncheckedCounter, checkedTaskCounter, checkAll, deleteCompleted}) => {
    return (
        <div className={'footer_button'}>
            <TextButton onClick={checkAll}>{uncheckedCounter} tasks left</TextButton>
            <div className={'regulate_btn'}>
                <FilterButton onClick={onChangeFilter(FILTER_TYPE_ALL)} active={filter === FILTER_TYPE_ALL}>All</FilterButton>
                <FilterButton onClick={onChangeFilter(FILTER_TYPE_TODO)} active={filter === FILTER_TYPE_TODO}>ToDo</FilterButton>
                <FilterButton onClick={onChangeFilter(FILTER_TYPE_COMPLETED)} active={filter === FILTER_TYPE_COMPLETED}>Completed</FilterButton>
            </div>
            <TextButton hidden={!checkedTaskCounter} onClick={deleteCompleted}>Clear completed</TextButton>
        </div>
    );
};

export default memo(ButtonPanel);
