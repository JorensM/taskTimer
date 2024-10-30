import { ChangeEvent, PropsWithChildren, useState, KeyboardEvent } from 'react'
import { Group } from './TaskItem'
import useTimeRemaining from './useTimeRemaining';

type GroupItemProps = {
    group: Group,
    onChange: (group: Group) => void,
    onDelete: (id: number) => void
}

export default function GroupItem( { group, onChange, onDelete, children }: PropsWithChildren<GroupItemProps> ) {

    const [groupName, setGroupName] = useState<string>(group.name);
    const [dueDate, setDueDate] = useState<string>(group.dueDate);

    const onGroupNameChange = (e: ChangeEvent<HTMLInputElement>) => setGroupName(e.target.value);
    const onDateChange = (e: ChangeEvent<HTMLInputElement>) => setDueDate(e.target.value);

    const [isEditing, setIsEditing] = useState<boolean>(false);

    const timeRemaining = useTimeRemaining(dueDate);

    const onSave = () => {
        setIsEditing(false);
        
        onChange({
            ...group,
            name: groupName,
            dueDate
        })
    }

    const onDeleteButtonClick = () => {
        if(onDelete) {
            onDelete(group.id);
        }
    }

    const onKeyPressed = (key: string, callback: () => void) => {
        return (e: KeyboardEvent<HTMLInputElement>) => {
            if(e.key === key) {
                callback();
            }
        }
    }

    // const onNameInputKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    //     if(e.key === 'Enter') {
    //         onSave();
    //     }
    // }

    return (
        <li className='flex flex-col gap-2'>
              {isEditing ? 
                <div className='flex flex-col gap-1' onKeyPress={onKeyPressed('Enter', onSave)}>
                    <div className='flex'>
                        <input value={groupName} onChange={onGroupNameChange} />
                        <button className='text-red-400' onClick={onDeleteButtonClick}>Delete</button>
                    </div>
                        
                    <input type='datetime-local' value={dueDate} onChange={onDateChange} />
                </div>
                :
                <div>
                    <h3 
                        tabIndex={0}
                        onClick={() => setIsEditing(true)}
                        onKeyPress={onKeyPressed('Enter', () => setIsEditing(true))}
                        className='mb-0'

                    >{group.name}</h3>
                    <span className='text-neutral-400'>{timeRemaining}</span>
                </div>
                }
              <ul className='pl-2'>
                {children}
              </ul>
        </li>
    )
}