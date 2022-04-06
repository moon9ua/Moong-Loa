import { createContext } from "react";
import Todolists from "../../components/todolist/Todolists";
import { IHomeworkContext } from "../../components/todolist/interfaces";
import useHomeworkEventHandlers from "../../components/todolist/useHomeworkEventHandlers";

export const HomeworkCtx = createContext<IHomeworkContext | null>(null);

export default function Homework() {
  const contextValue = useHomeworkEventHandlers();

  return (
    <HomeworkCtx.Provider value={contextValue}>
      <Todolists />
    </HomeworkCtx.Provider>
  );
}
