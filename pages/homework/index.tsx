import { createContext } from "react";
import Todolists from "../../components/todolist/Todolists";
import { IHomeworkContext } from "./interfaces";
import useHomeworkEventHandlers from "./useHomeworkEventHandlers";

export const HomeworkCtx = createContext<IHomeworkContext | null>(null);

export default function Homework() {
  const contextValue = useHomeworkEventHandlers();

  return (
    <HomeworkCtx.Provider value={contextValue}>
      <Todolists />
    </HomeworkCtx.Provider>
  );
}
