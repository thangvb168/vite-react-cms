import { PAGE_DEFAULT } from '@/constants/pagination';
import { ApiResponse } from '@/types/apiResponse';
import { CRUDService } from '@/types/crudService';
import { Employee } from '@/types/employee';
import { SearchParams } from '@/types/params';

import httpClient from './api/httpClient';

export interface EmployeeService extends CRUDService<Employee> {}

const employeeService: EmployeeService = {
  getAll: async (props: SearchParams) => {
    let {
      page = PAGE_DEFAULT,
      pageSize = PAGE_DEFAULT,
      searchTerm = '',
    } = props;

    try {
      const response = await httpClient.get('/employees');

      let data = response.data as Employee[];

      searchTerm = searchTerm?.trim() || '';

      if (searchTerm) {
        data = data.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      const apiResponse: ApiResponse<Employee[]> = {
        status: 'success',
        message: 'Get employees successfully',
        code: 200,
        data: data.slice((page - 1) * pageSize, page * pageSize),
        meta: {
          totalRecords: data.length,
          page: page,
          pageSize: pageSize,
          totalPages: Math.ceil(data.length / pageSize),
        },
      };

      console.log(apiResponse);

      return apiResponse;
    } catch (error) {
      console.error('Failed to fetch employees:', error);
      throw error;
    }
  },
  getById: async (id: string | number) => {
    try {
      const response = await httpClient.get(`/employees/${id}`);
      const apiResponse: ApiResponse<Employee> = {
        status: 'success',
        message: 'Get employees successfully',
        code: 200,
        data: response.data as Employee,
      };
      return apiResponse;
    } catch (error) {
      console.error('Failed to fetch employee:', error);
      throw error;
    }
  },
  create: async (employee: Omit<Employee, 'id' | 'code'>) => {
    try {
      const response = await httpClient.post('/employees', employee);
      const apiResponse: ApiResponse<Employee> = {
        status: 'success',
        message: 'Create employees successfully',
        code: 200,
        data: response.data as Employee,
      };
      return apiResponse;
    } catch (error) {
      console.error('Failed to add employee:', error);
      throw error;
    }
  },
  update: async (id: string | number, employee: Employee) => {
    try {
      const response = await httpClient.put(`/employees/${id}`, employee);
      const apiResponse: ApiResponse<Employee> = {
        status: 'success',
        message: 'Update employees successfully',
        code: 200,
        data: response.data as Employee,
      };
      return apiResponse;
    } catch (error) {
      console.error('Failed to update employee:', error);
      throw error;
    }
  },
  delete: async (id: string | number) => {
    try {
      await httpClient.delete(`/employees/${id}`);
      const apiResponse: ApiResponse<null> = {
        status: 'success',
        message: 'Delete employees successfully',
        code: 200,
        data: null,
      };
      return apiResponse;
    } catch (error) {
      console.error('Failed to delete employee:', error);
      throw error;
    }
  },
};

export default employeeService;
