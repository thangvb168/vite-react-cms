export interface Employee {
  id: string;
  code: string;
  gender: 'male' | 'female' | 'other';
  status: 'active' | 'pending' | 'deactive';
  name: string;
  email: string;
  phone: string;
  address: string;
  position: string;
  department: string;
  salary: number;
  hireDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
