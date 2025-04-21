import { faFlag, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Select } from 'antd';

type LangProps = {
  widthFull?: boolean;
};

const Lang = (props: LangProps) => {
  const { widthFull = false } = props;

  return (
    <Select defaultValue="1" style={{ width: widthFull ? '100%' : 150 }}>
      <Select.Option value="1">
        <FontAwesomeIcon icon={faStar} className="mr-2" />
        <span>Tiếng Việt</span>
      </Select.Option>
      <Select.Option value="2">
        <FontAwesomeIcon icon={faFlag} className="mr-2" />
        <span>English</span>
      </Select.Option>
    </Select>
  );
};

export default Lang;
