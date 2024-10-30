import { ChangeEvent, useEffect, useState } from 'react'
import { getTimeRemaining } from './util'
import useTimeRemaining from './useTimeRemaining'

export type Task = {
    id: number,
    groupId: number,
    name: string,
    dueDate: string,
    completed: boolean,
    description: string
}

export type Group = {
    name: string,
    id: number,
    dueDate: string
}

type TaskItemProps = {
    task: Task,
    groups: Group[],
    onChange?: (newTask: Task) => void
    onDelete?: (taskID: number) => void
}

export default function TaskItem({ task, onChange, onDelete, groups }: TaskItemProps) {

    const [name, setName] = useState<string>(task.name);
    const [dueDate, setDueDate] = useState<string>(task.dueDate);
    const [description, setDescription] = useState<string>(task.description);
    const [completed, setCompleted] = useState<boolean>(task.completed);
    const [groupId, setGropId] = useState<number>(task.groupId);

    const timeRemaining = useTimeRemaining(dueDate);

    const [isEditing, setIsEditing] = useState<boolean>(false);

    const getLocalTask = () => {
        return {
            ...task,
            name,
            description,
            dueDate,
            completed,
            groupId
        }
    }

    const onNameChange = (e: ChangeEvent<HTMLInputElement>) => setName(e.currentTarget.value);
    const onDateChange = (e: ChangeEvent<HTMLInputElement>) => setDueDate(e.currentTarget.value);
    const onDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.currentTarget.value);
    const onGroupChange = (e: ChangeEvent<HTMLSelectElement>) => setGropId(parseInt(e.currentTarget.value));
    const onCompletedChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(onChange) {
            onChange({
                ...getLocalTask(),
                completed: e.currentTarget.checked
            })
        }
        setCompleted(e.currentTarget.checked)
    };


    const onEditButtonClick = () => {
        if(isEditing && onChange) {
            onChange(getLocalTask())
        }
        setIsEditing(!isEditing);
    }

    const onCancelButtonClick = () => {
        setIsEditing(!isEditing);
        setName(task.name);
        setDescription(task.description);
        setDueDate(task.dueDate);
    }

    const onDeleteButtonClick = () => {
        if(onDelete) {
            onDelete(task.id);
        }
    }

    return (
        <li className='flex gap-2 w-full' key={task.id}>
            <div className='flex items-start'>
                <input type='checkbox' className='mt-2' checked={completed} onChange={onCompletedChange}></input>
            </div>
            <div className='flex flex-col items-start w-full gap-1'>
                <span className='flex justify-between w-full gap-4'>
                    {isEditing ? <input className='mr-1' value={name} onChange={onNameChange}/> : <h4>{name}</h4>}
                    {isEditing ? 
                        <button className='text-red-500' onClick={onCancelButtonClick}>
                            Cancel
                        </button>
                    : null}
                    <button 
                        className='text-blue-800'
                        onClick={onEditButtonClick}
                    >
                        {isEditing ? 'Save' : 'Edit'}
                    </button>
                </span>
                {completed ? null : (isEditing ? <input type='datetime-local' onChange={onDateChange} value={dueDate}/> : <span className='text-neutral-400'>{timeRemaining}</span>)}
                {isEditing ? <textarea onChange={onDescriptionChange} value={description}/> : <p className='mt-2'>{description}</p>}
                {isEditing ? 
                    <div className='flex justify-between w-full'>
                        <select value={groupId} onChange={onGroupChange}>
                            {groups.map(group => <option value={group.id}>{group.name}</option>)}
                            <option value="-1">Ungrouped</option>
                        </select>
                        <button className='text-red-500' onClick={onDeleteButtonClick}>
                            Delete
                        </button>
                    </div>
                : null}
            </div>
        </li>
    )
}