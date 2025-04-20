import { faFlag, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Flex, Layout, Select } from 'antd';

import User from '@/types/user';

import Notification from './Notification';
import Profile from './Profile';

const { Header } = Layout;

type TopBarProps = {
  title: string;
};

const TopBar = (props: TopBarProps) => {
  const { title } = props;

  const user: User = {
    id: '1',
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    avatar:
      'https://i.pinimg.com/736x/ad/31/39/ad313981729643d8ceef53da5dec58ff.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return (
    <Header>
      <Flex justify="space-between" align="center">
        <h4 className="text-lg font-medium">{title}</h4>
        <Flex gap={16} align="center">
          <Select defaultValue="1" style={{ width: 150 }}>
            <Select.Option value="1">
              <FontAwesomeIcon icon={faStar} className="mr-2" />
              <span>Tiếng Việt</span>
            </Select.Option>
            <Select.Option value="2">
              <FontAwesomeIcon icon={faFlag} className="mr-2" />
              <span>English</span>
            </Select.Option>
          </Select>
          <Notification />
          <Profile user={user} />
        </Flex>
      </Flex>
    </Header>
  );
};

export default TopBar;
