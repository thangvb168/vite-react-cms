import { useState } from 'react';

export interface UseDelete {
  deleteService: (id: string | number) => Promise<void>;
  onSuccess: () => void;
  onError: (error: any) => void;
  onFinally?: () => void;
}

export const useDelete = ({
  deleteService,
  onSuccess,
  onError,
  onFinally,
}: UseDelete) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteOne = async (id: string | number) => {
    setIsLoading(true);

    try {
      await deleteService(id);

      onSuccess();
    } catch (error) {
      onError(error);
    } finally {
      setIsLoading(false);
      if (onFinally) {
        onFinally();
      }
    }
  };

  const handleDeleteMany = async (ids: (string | number)[]) => {
    setIsLoading(true);
    try {
      await Promise.all(ids.map((id) => deleteService(id)));
      onSuccess();
    } catch (error) {
      onError(error);
    } finally {
      setIsLoading(false);
      if (onFinally) {
        onFinally();
      }
    }
  };

  return {
    isLoading,
    handleDeleteOne,
    handleDeleteMany,
  };
};
