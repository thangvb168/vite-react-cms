import { useState } from 'react';

import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

type NotificationProps = {};

const Notification = (props: NotificationProps) => {
  const {} = props;

  const [count] = useState(1);

  return (
    <div className="relative">
      <FontAwesomeIcon size="xl" icon={faBell} />
      {count > 0 && (
        <span
          className={clsx(
            'absolute top-1 left-1/2 flex items-center justify-center rounded-full bg-red-500 text-xs text-white',
            count < 10 ? 'h-4 w-4 p-2' : 'px-1 py-[2px]'
          )}
        >
          {count > 99 ? '99+' : count}
        </span>
      )}
    </div>
  );
};

export default Notification;
