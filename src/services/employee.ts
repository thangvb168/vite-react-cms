import { Employee } from '@/types/employee';
import axiosInstance from '@/utils/axiosInstance';

export interface EmployeeService {
  getAll: () => Promise<Employee[]>;
  add: (employee: Omit<Employee, 'id' | 'code'>) => Promise<Employee>;
  update: (employee: Employee) => Promise<Employee>;
  delete: (id: string) => Promise<void>;
}

const employeeService: EmployeeService = {
  getAll: async () => {
    try {
      const response = await axiosInstance.get('/employees');
      return response.data.reverse();
    } catch (error) {
      console.error('Failed to fetch employees:', error);
      throw error;
    }
  },
  add: async (employee: Omit<Employee, 'id' | 'code'>) => {
    try {
      const response = await axiosInstance.post('/employees', employee);
      return response.data;
    } catch (error) {
      console.error('Failed to add employee:', error);
      throw error;
    }
  },
  update: async (employee: Employee) => {
    try {
      const response = await axiosInstance.put(
        `/employees/${employee.id}`,
        employee
      );
      return response.data;
    } catch (error) {
      console.error('Failed to update employee:', error);
      throw error;
    }
  },
  delete: async (id: string) => {
    try {
      await axiosInstance.delete(`/employees/${id}`);
    } catch (error) {
      console.error('Failed to delete employee:', error);
      throw error;
    }
  },
};

export default employeeService;
