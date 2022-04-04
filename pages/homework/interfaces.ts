export interface ITodolist {
  id: number;
  title: string;
  todoTimeblocks: ITodoTimeblock[];
}

export function NewTodolist(title: string): ITodolist {
  return {
    id: +new Date(),
    title,
    todoTimeblocks: [],
  };
}

export interface ITodoTimeblock {
  id: number;
  title: string;
  isWeekly: boolean;
  todos: ITodo[];
}

export function NewTodoTimeblock(
  title: string,
  isWeekly: boolean
): ITodoTimeblock {
  return {
    id: +new Date(),
    title,
    isWeekly,
    todos: [],
  };
}

export interface ITodo {
  id: number;
  content: string;
  isCompleted: boolean;
}

export function NewTodo(content: string): ITodo {
  return {
    id: +new Date(),
    content,
    isCompleted: false,
  };
}

export interface IHomeworkContext {
  todolists: ITodolist[]; // NOTE: 필요한가? 필요하지 않으면 빼도 될 듯
  eventHandlers: IHomeworkEventHandlers;
}

export interface IHomeworkEventHandlers {
  addTodolist: (title: string) => void;
  deleteTodolist: (todolistId: number) => void;
  editTodolistTitle: (todolistId: number, todolistTitle: string) => void;

  addTodoTimeblock: (
    todolistId: number,
    title: string,
    isWeekly: boolean
  ) => void;
  deleteTodoTimeblock: (todolistId: number, todoTimeblockId: number) => void;
  editTodoTimeblockTitle: (
    todolistId: number,
    todoTimeblockId: number,
    title: string
  ) => void;

  addTodo: (
    todolistId: number,
    todoTimeblockId: number,
    content: string
  ) => void;
  deleteTodo: (
    todolistId: number,
    todoTimeblockId: number,
    todoId: number
  ) => void;
  editTodoContent: (
    todolistId: number,
    todoTimeblockId: number,
    todoId: number,
    content: string
  ) => void;
  toggleTodoComplete: (
    todolistId: number,
    todoTimeblockId: number,
    todoId: number
  ) => void;
}
