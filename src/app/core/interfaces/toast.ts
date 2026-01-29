export interface IToast {
  id: number;
  title?: string;
  message: string;
  icon?: 'success' | 'error';
  bgColor?: 'white' | 'red' | 'green';
  textColor?: 'white' | 'red' | 'black';
  duration?: number;
}
