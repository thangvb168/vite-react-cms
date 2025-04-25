import { useEffect, useState } from 'react';

import { AnyRecord } from '@/types/utils';

export interface UseGetByIdProps<Model extends AnyRecord> {
  id: string | number;
  getIdService: (id: string | number) => Promise<Model>;
}

export const useGetById = <Model extends AnyRecord>({
  id,
  getIdService,
}: UseGetByIdProps<Model>) => {
  const [getByIdState, setGetByIdState] = useState<{
    data: Model | null;
    idLoading: boolean;
  }>({
    data: null,
    idLoading: false,
  });

  const handleGetById = async () => {
    setGetByIdState((prev) => {
      return {
        ...prev,
        idLoading: true,
      };
    });

    try {
      const response = await getIdService(id);

      if (!response) {
        throw new Error('No data returned from the server');
      }

      setGetByIdState((prev) => {
        return {
          ...prev,
          data: response,
        };
      });
    } catch (error) {
      console.log('Error fetching data:', error);
    } finally {
      setGetByIdState((prev) => {
        return {
          ...prev,
          idLoading: false,
        };
      });
    }
  };

  useEffect(() => {
    if (!id) return;
    handleGetById();
  }, [id]);

  return {
    ...getByIdState,
    handleGetById,
  };
};
