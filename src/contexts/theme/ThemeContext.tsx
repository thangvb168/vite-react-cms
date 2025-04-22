import React from 'react';

import '@ant-design/v5-patch-for-react-19';
import { ConfigProvider } from 'antd';

export interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider = (props: ThemeProviderProps) => {
  const { children } = props;

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#d34127',
          fontFamily: 'Roboto',
        },
        components: {
          Layout: {
            siderBg: '#fff',
            headerBg: '#fff',
            headerHeight: 48,
            headerPadding: '0 12px 0 24px',
            bodyBg: '#f5f5f5',

            footerBg: '#fff',
            footerPadding: '12px 8px',
          },
          Menu: {
            itemSelectedBg: '#f8d4ce',
            itemBg: '#fff',
          },
          Table: {
            headerColor: 'rgba(0,0,0,0.5)',
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default ThemeProvider;
