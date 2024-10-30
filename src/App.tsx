import { useState } from 'react'
import TaskItem, { Group, Task } from './TaskItem'
import GroupItem from './GroupItem'
import { formatDate } from './util'

const nextWeek = new Date()
nextWeek.setDate(new Date().getDate() + 7);

function App() {

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 0,
      groupId: 0,
      name: 'Task Name',
      completed: false,
      dueDate: formatDate(nextWeek),
      description: 'Description'
    }
  ])

  const [groups, setGroups] = useState<Group[]>([
    {
      id: 0,
      name: 'My Group',
      dueDate: formatDate(nextWeek)
    }
  ])

  const getMaxID = (items: { id: number }[]) => {
    return items.length ? items.map(item => item.id).reduce((prev, current) => prev > current ? prev : current) + 1 : 0;
  }

  const getTasksByGroup = (tasks: Task[], groupId?: number) => {
    return tasks.filter(task => task.groupId === groupId);
  }

  const handleNewGroupClick = () => {
    createGroup({
      name: "New Group",
      dueDate: formatDate(nextWeek)
    })
  }

  const handleNewTaskClick = () => {
    createTask({
      name: 'New task',
      description: '',
      groupId: -1,
      dueDate: formatDate(nextWeek),
      completed: false
    });
  }

  const deleteGroup = (id: number) => {
    setGroups((prevGroups) => {
      const index = prevGroups.findIndex(group => group.id === id);
      prevGroups.splice(index, 1);
      return [ ...prevGroups ];
    })
  }

  const updateGroup = (group: Group) => {
    setGroups((prevGroups) => {
      const index = prevGroups.findIndex(_group => _group.id === group.id);
      prevGroups[index] = group;
      return [ ...prevGroups ];
    })
  }

  const createGroup = (group: Omit<Group, 'id'>) => {
    const id = getMaxID(groups);
    setGroups((prevGroups) => {
      return [
        ...prevGroups,
        {
          ...group,
          id
        }
      ]
    })
  }

  const deleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter(task => task.id !== id));
  }

  const createTask = (task: Omit<Task, 'id'>) => {
    const id = getMaxID(tasks);
    setTasks((prevTasks) => {
      return [
        ...prevTasks,
        {
          ...task,
          groupId: -1,
          id
        }
      ]
    })
  }

  const updateTask = (task: Task) => {
    console.log('updating task: ', task);
    setTasks((prevTasks) => {
      const index = prevTasks.findIndex(_task => _task.id === task.id);
      prevTasks[index] = task;
      return [...prevTasks];
    })
  }

  return (
    <>
      {console.log('rerendering')}
      <header className='px-2 py-2'>
        <h1>Task Timer</h1>
      </header>
      <main className='flex flex-col px-2 w-full flex-grow'>
        <h2>Tasks</h2>
        <ul className='flex flex-col gap-4'>
          {groups.map(group => (
            <GroupItem
              group={group}
              onChange={updateGroup}
              onDelete={deleteGroup}
            >
              {getTasksByGroup(tasks, group.id).map(task => <TaskItem groups={groups} task={task} onDelete={deleteTask} onChange={updateTask}/>)}
            </GroupItem>
          ))}
          <li className='flex flex-col gap-2'>
            <h3>Ungrouped</h3>
            <ul className='pl-2'>
              {getTasksByGroup(tasks, -1).map(task => <TaskItem groups={groups} task={task} onDelete={deleteTask} onChange={updateTask}/>)}
            </ul>
          </li>
        </ul>
        <div className='flex flex-grow'>

        </div>
        <div className='flex w-full justify-between p-4'>
          <button onClick={handleNewGroupClick}>New Group</button>
          <button onClick={handleNewTaskClick}>New Task</button>
        </div>
      </main>
    </>
  )
}

export default App;
