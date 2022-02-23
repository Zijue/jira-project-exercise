import { Card, Input } from "antd";
import { useEffect, useState } from "react";
import { useAddTask } from "utils/task";
import { useProjectIdInUrl, useTasksQueryKey } from "./utils";

export const CreateTask = ({ kanbanId }: { kanbanId: number }) => {
  const [name, setName] = useState("");
  const projectId = useProjectIdInUrl();
  const { mutateAsync: addTask } = useAddTask(useTasksQueryKey());
  const [inputMode, setInputMode] = useState(false);

  const submit = async () => {
    await addTask({ name, projectId, kanbanId });
    setInputMode(false);
    setName("");
  };
  const toggle = () => setInputMode((mode) => !mode);
  //用于输入框关闭时，清空内容
  useEffect(() => {
    if (!inputMode) {
      setName("");
    }
  }, [inputMode]);
  //默认不展示输入框，鼠标移动上去才展示
  if (!inputMode) {
    return <div onClick={toggle}>+创建事务</div>;
  }
  return (
    <Card>
      <Input
        onBlur={toggle}
        placeholder="新建任务名称"
        autoFocus={true}
        onPressEnter={submit}
        value={name}
        onChange={(evt) => setName(evt.target.value)}
      />
    </Card>
  );
};
