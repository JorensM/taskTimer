import { Task } from './TaskItem';

export const getTasksByGroup = (tasks: Task[], groupId?: number) => {
    return tasks.filter(task => task.groupId === groupId);
}

export const formatDate = (date: Date) => {
    return date.getFullYear() + '-' + 
      (date.getMonth() + 1).toString().padStart(2, '0') + '-' +
      date.getDate().toString().padStart(2, '0') + 'T' +
      date.getHours().toString().padStart(2, '0') + ':' +
      date.getMinutes().toString().padStart(2, '0');
}

export const getTimeRemaining = (endDate: Date) => {
    const currentDate = new Date();

    const timeNames = ['minutes', 'hours', 'days'];

    const remaining = endDate.getTime() - currentDate.getTime();
    const seconds = Math.floor(remaining / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const times = [
        minutes % 60,
        hours % 24,
        days % 30
    ]

    let str = '';
    for(let i = timeNames.length - 1; i >= 0; i--) {
        if(times[i] === 0) {
            continue;
        }
        str += times[i] + ' ' + (times[i] === 1 ? timeNames[i].substring(1, timeNames[0].length - 1) : timeNames[i]) + ' ';
    }

    str += 'remaining';

    return str;
}