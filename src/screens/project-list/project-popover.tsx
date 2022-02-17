import styled from "@emotion/styled";
import { Divider, Popover, Typography } from "antd";
import { List } from "antd";
import { ButtonNoPadding } from "components/lib";
import { useProjects } from "utils/project";

export const ProjectPopover = (props: {
  setProjectModalOpen: (isOpen: boolean) => void;
}) => {
  const { data: projects, isLoading } = useProjects();
  const pinnedProjects = projects?.filter((project) => project.pin);
  const Content = (
    <ContentContainer>
      <Typography.Text type="secondary">收藏项目</Typography.Text>
      <List>
        {pinnedProjects?.map((project) => (
          <List.Item>
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      <ButtonNoPadding
        onClick={() => props.setProjectModalOpen(true)}
        type="link"
      >
        创建项目
      </ButtonNoPadding>
    </ContentContainer>
  );
  return (
    <Popover placement="bottom" content={Content}>
      <h2>项目</h2>
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;
