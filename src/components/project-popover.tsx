import React from "react";
import { Divider, List, Popover, Typography, Button } from "antd";
import { useProjects } from "utils/project";

export default function ProjectPopover(props: { projectButton: JSX.Element }) {
  const { data: project, isLoading } = useProjects(); // 获取一些数据
  const pinnedProjects = project?.filter((project) => project.pin);
  console.log("project", project);

  // 在这里同样是可以写JSX的语法的
  const content = (
    <div>
      <Typography.Text type="secondary">收藏项目</Typography.Text>
      <List>
        {pinnedProjects?.map((project) => (
          <List.Item>
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      {props.projectButton}
    </div>
  );

  return (
    <Popover placement={"bottom"} content={content}>
      项目
    </Popover>
  );
}
