import { useState } from 'react';

import { AnyRecord } from '@/types/utils';

export interface UseCreate<Model extends AnyRecord> {
  createService: (data: Partial<Model>) => Promise<Model>;
  onSuccess: (data: Model) => void;
  onError: (error: any) => void;
  onFinally?: () => void;
}

export const useCreate = <Model extends AnyRecord>({
  createService,
  onSuccess,
  onError,
  onFinally,
}: UseCreate<Model>) => {
  const [createState, setCreateState] = useState<{
    data: Model | null;
    isLoading: boolean;
  }>({
    data: null,
    isLoading: false,
  });

  const handleCreate = async (data: Partial<Model>) => {
    setCreateState((prevState) => {
      return {
        ...prevState,
        isLoading: true,
      };
    });

    try {
      const response = await createService(data);

      if (!response) {
        throw new Error('Không có data trả về từ server');
      }

      setCreateState((prevState) => {
        return {
          ...prevState,
          data: response,
        };
      });

      onSuccess(response);
    } catch (error) {
      setCreateState((prevState) => {
        return {
          ...prevState,
        };
      });
      onError(error);
    } finally {
      setCreateState((prevState) => {
        return {
          ...prevState,
          isLoading: false,
        };
      });
      if (onFinally) onFinally();
    }
  };

  return { ...createState, handleCreate };
};
