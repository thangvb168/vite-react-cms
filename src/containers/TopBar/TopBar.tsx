import { Layout, Select } from 'antd';

const { Header } = Layout;

type TopBarProps = {
  title: string;
};

const TopBar = (props: TopBarProps) => {
  const { title } = props;

  return (
    <Header>
      <div className="flex h-full items-center justify-between">
        <h4 className="text-lg font-medium">{title}</h4>
        <div className="">
          <Select defaultValue="1">
            <Select.Option value="1">Tiếng Việt</Select.Option>
          </Select>
        </div>
      </div>
    </Header>
  );
};

export default TopBar;
