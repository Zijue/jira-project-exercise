import { Button, Drawer } from "antd";
import { useProjectModal } from "./utils";

export const ProjectModal = () => {
  const { projectModalOpen, close } = useProjectModal();
  return (
    <Drawer onClose={close} visible={projectModalOpen} width="100%">
      <h1>Project modal</h1>
      <Button onClick={close}>关闭</Button>
    </Drawer>
  );
};
