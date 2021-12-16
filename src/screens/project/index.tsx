import { Route, Routes, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { EpicScreen } from "screens/epic";
import { KanbanScreen } from "screens/kanban";

export const ProjectScreen = () => {
  return (
    <div>
      <h1>ProjectScreen</h1>
      {/* to{'/project'} 有/ 所以包含了根路由  to{'project'} 就没有包含根路由 有/和没有/区别是很大的 */}
      <Link to={"kanban"}>看板 </Link>|<Link to={"epic"}> 任务组</Link>
      {/* 艹，就地写路由，牛逼，有什么讲究没？这种写法会不会遇见路由名 重复的情况*/}
      <Routes>
        {/* /projects/:projectId/kanban */}
        <Route path="/kanban" element={<KanbanScreen />} />
        {/* /projects/:projectId/epic */}
        <Route path="/epic" element={<EpicScreen />} />
        {/* 默认路由 */}
        <Route index element={<KanbanScreen />} />
      </Routes>
    </div>
  );
};
