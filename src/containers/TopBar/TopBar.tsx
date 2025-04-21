import { MenuOutlined } from '@ant-design/icons';
import { Button, Dropdown, Flex, Grid, Layout, MenuProps } from 'antd';

import { useAuth } from '@/contexts/auth';

import Lang from './Lang';
import Notification from './Notification';
import Profile from './Profile';

const { Header } = Layout;

type TopBarProps = {
  title: string;
};

const TopBar = (props: TopBarProps) => {
  const { title } = props;
  const { user, logout } = useAuth();

  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const items: MenuProps['items'] = [
    {
      key: '0',
      label: (
        <div onClick={(e) => e.stopPropagation()}>
          <Lang />
        </div>
      ),
    },
    {
      key: '1',
      label: (
        <div onClick={(e) => e.stopPropagation()}>
          <Notification />
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <div onClick={(e) => e.stopPropagation()}>
          <Profile user={user!} onLogout={logout} />
        </div>
      ),
    },
  ];

  return (
    <Header>
      <Flex justify="space-between" align="center" className="h-full">
        <h4 className="text-xl font-semibold">{title}</h4>
        {isMobile ? (
          <Dropdown menu={{ items: items }} trigger={['hover']}>
            <Button icon={<MenuOutlined />} />
          </Dropdown>
        ) : (
          <Flex gap={16} align="center">
            <Lang />
            <Notification />
            <Profile user={user!} onLogout={logout} />
          </Flex>
        )}
      </Flex>
    </Header>
  );
};

export default TopBar;
