import { useEffect } from "react";
import { Button, Drawer, Spin, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form"; // 这个有点神奇
import { useProjectModal, useProjectsQueryKey } from "./util";
import { UserSelect } from "components/user-select";
import { useAddProject, useEditProject } from "utils/project";
import { ErrorBox } from "components/lib";

export default function ProjectModal() {
  const { projectModalOpen, close, editingProject, isLoading } =
    useProjectModal();
  const useMutateProject = editingProject ? useEditProject : useAddProject;

  const {
    mutateAsync,
    error,
    isLoading: mutateLoading,
  } = useMutateProject(useProjectsQueryKey());
  const [form] = useForm(); // 重置表单
  const onFinish = (values: any) => {
    mutateAsync({ ...editingProject, ...values }).then(() => {
      form.resetFields(); // 这个是什么操作？
      close();
    });
  };
  const title = editingProject ? "编辑项目" : "创建项目";

  useEffect(() => {
    form.setFieldsValue(editingProject);
  }, [editingProject, form]);

  return (
    <Drawer
      forceRender={true}
      onClose={close}
      visible={projectModalOpen}
      width={"100%"}
    >
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <>
          <h1>{title}</h1>
          <ErrorBox error={error} />
          <Form
            form={form}
            layout="vertical"
            style={{ width: "40rem" }}
            onFinish={onFinish}
          >
            {/* 项目名称 */}
            <Form.Item
              label="名称"
              name="name"
              rules={[{ required: true, message: "请输入项目名" }]}
            >
              <Input placeholder={"请输入项目名称"}></Input>
            </Form.Item>

            {/* 部门 */}
            <Form.Item
              label="部门"
              name="organization"
              rules={[{ required: true, message: "请输入部门名" }]}
            >
              <Input placeholder={"请输入部门名"}></Input>
            </Form.Item>

            {/* 负责人 */}
            <Form.Item label="负责人" name="personId">
              <UserSelect defaultOptionName="负责人" />
            </Form.Item>

            {/* 提交 */}
            <Form.Item label="负责人" name="personId">
              <Button
                loading={mutateLoading}
                type={"primary"}
                htmlType="submit"
              >
                提交
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
    </Drawer>
  );
}
