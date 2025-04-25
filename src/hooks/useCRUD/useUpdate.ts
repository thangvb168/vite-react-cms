import { useState } from 'react';

import { isEmpty } from '@/utils';

export interface UseUpdate<Model> {
  id: string | number;
  updateService: (id: string | number, data: Partial<Model>) => Promise<Model>;
  onSuccess: (data: Model) => void;
  onError: (error: any) => void;
  onFinally?: () => void;
}

export const useUpdate = <Model>({
  id,
  updateService,
  onSuccess,
  onError,
  onFinally,
}: UseUpdate<Model>) => {
  const [updateState, setUpdateState] = useState<{
    data: Model | null;
    isLoading: boolean;
  }>({
    data: null,
    isLoading: false,
  });

  const handleUpdate = async (data: Partial<Model>) => {
    console.log('Id', id);
    console.log('Data', data);

    setUpdateState((prevState) => {
      return {
        ...prevState,
        isLoading: true,
      };
    });

    try {
      if (isEmpty(data)) {
        throw new Error('Không có data để cập nhật');
      }

      const response = await updateService(id, data);

      if (!response) {
        throw new Error('Không có data trả về từ server');
      }

      setUpdateState((prevState) => {
        return {
          ...prevState,
          data: response,
        };
      });

      onSuccess(response);
    } catch (error) {
      setUpdateState((prevState) => {
        return {
          ...prevState,
        };
      });
      onError(error);
    } finally {
      setUpdateState((prevState) => {
        return {
          ...prevState,
          isLoading: false,
        };
      });
      onFinally?.();
    }
  };

  return {
    ...updateState,
    handleUpdate,
  };
};
