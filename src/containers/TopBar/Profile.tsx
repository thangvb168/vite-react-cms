import { Dropdown, Space } from 'antd';
import type { MenuProps } from 'antd';

import User from '@/types/user';

type ProfileProps = {
  user: User;
};

const Profile = (props: ProfileProps) => {
  const { user } = props;

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'Logout',
      onClick: () => {
        console.log('Logout clicked');
      },
    },
  ];

  return (
    <Dropdown menu={{ items }}>
      <Space size={8}>
        <img
          src={user.avatar}
          alt="Profile"
          className="h-8 w-8 rounded-full object-cover"
        />
        <span className="font-semibold">{user.name}</span>
      </Space>
    </Dropdown>
  );
};

export default Profile;
