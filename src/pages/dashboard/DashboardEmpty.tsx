import { Empty, Flex } from 'antd';

const DashboardEmpty = () => {
  return (
    <Flex align="center" justify="center">
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
    </Flex>
  );
};

export default DashboardEmpty;
