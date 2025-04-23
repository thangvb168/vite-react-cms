import { CRUDService } from '@/types/crudService';
import { AnyRecord } from '@/types/utils';

export type Props<T> = {
  field: string[];

  service: CRUDService<T>;
};

export const FormList = <T extends AnyRecord>(props: Props<T>) => {
  return <div>FormList</div>;
};
