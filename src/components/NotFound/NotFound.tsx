import { useNavigate } from 'react-router-dom';

import { Button, Result } from 'antd';

export type NotFoundProps = {
  title?: string;
  subTitle?: string;
  status?: 'success' | 'error' | 'info' | 'warning' | 404 | 403 | 500;
};

const NotFound = (props: NotFoundProps) => {
  const {
    title = '404 - Không tìm thấy trang',
    subTitle = 'Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.',
    status = 404,
  } = props;

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div>
      <Result
        status={status}
        title={title}
        subTitle={subTitle}
        extra={[
          <Button type="primary" key="home" onClick={handleGoHome}>
            Về trang chủ
          </Button>,
          <Button key="back" onClick={handleGoBack}>
            Quay lại
          </Button>,
        ]}
      />
    </div>
  );
};

export default NotFound;
