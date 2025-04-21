import { useState } from 'react';

import { Dropdown, Modal, Space } from 'antd';
import type { MenuProps } from 'antd';

import User from '@/types/user';

type ProfileProps = {
  user: User;
  onLogout: () => void;
};

const Profile = (props: ProfileProps) => {
  const { user, onLogout } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    onLogout();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'Logout',
      onClick: () => {
        showModal();
      },
    },
  ];

  return (
    <>
      <Modal
        title="Đăng xuất"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Đăng xuất"
        cancelText="Hủy"
      >
        <p>Bạn có chắc chắn muốn đăng xuất không ?</p>
      </Modal>
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
    </>
  );
};

export default Profile;
