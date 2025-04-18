import { useState } from 'react';

import {
  faBox,
  faCar,
  faChevronRight,
  faDollar,
  faHome,
  faList,
  faTicket,
  faUser,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems: MenuItem[] = [
    {
      key: '1',
      label: 'Tổng quan',
      icon: <FontAwesomeIcon icon={faHome} />,
    },
    {
      key: '2',
      label: 'Nhân viên',
      icon: <FontAwesomeIcon icon={faUser} />,
    },
    {
      key: '3',
      label: 'Khách hàng',
      icon: <FontAwesomeIcon icon={faUsers} />,
    },
    {
      key: '4',
      label: 'Đơn hàng',
      icon: <FontAwesomeIcon icon={faBox} />,
    },
    {
      key: '5',
      label: 'Kho hàng',
      icon: <FontAwesomeIcon icon={faHome} />,
    },
    {
      key: '6',
      label: 'Đơn vận',
      icon: <FontAwesomeIcon icon={faCar} />,
    },
    {
      key: '7',
      label: 'Tài chính',
      icon: <FontAwesomeIcon icon={faDollar} />,
      children: [
        {
          key: '7-1',
          label: 'Chi phí',
        },
        {
          key: '7-2',
          label: 'Doanh thu',
        },
        {
          key: '7-3',
          label: 'Lợi nhuận',
        },
      ],
    },
    {
      key: '8',
      label: 'Khuyến mại',
      icon: <FontAwesomeIcon icon={faTicket} />,
    },
    {
      key: '9',
      label: 'Danh mục',
      icon: <FontAwesomeIcon icon={faList} />,
      children: [
        {
          key: '9-1',
          label: 'Sản phẩm',
        },
        {
          key: '9-2',
          label: 'Dịch vụ',
        },
        {
          key: '9-3',
          label: 'Nhà cung cấp',
        },
        {
          key: '9-4',
          label: 'Khách hàng',
        },
      ],
    },
  ];

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="relative flex h-12 w-full items-center justify-center bg-gray-200 transition-all duration-500">
        <h4 className="text-primary text-xl font-semibold">
          {collapsed ? 'T' : 'Thang Vu Ba'}
        </h4>
        <div className="absolute right-0 translate-x-1/2">
          <Button size="small" onClick={() => setCollapsed(!collapsed)}>
            <FontAwesomeIcon
              icon={faChevronRight}
              className={`text-primary transition-transform duration-500 ${
                collapsed ? '' : 'rotate-180'
              }`}
            />
          </Button>
        </div>
      </div>
      <Menu mode="inline" defaultSelectedKeys={['2']} items={menuItems} />
    </Sider>
  );
};

export default SideBar;
