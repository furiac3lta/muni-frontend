export type AlertType = 'CLIMA' | 'CORTE' | 'AVISO';

export interface AlertItem {
  id: number;
  title: string;
  message: string;
  type: AlertType;
  active: boolean;
  createdAt: string;
}
