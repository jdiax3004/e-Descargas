import { EasyPay } from './easypay';
import { Tarjeta } from './tarjeta';

export class Transaccion {
    Codigo?: string;
    Tipo_Pago?: string;
    Monto?: number;
    Fecha?: Date;
    Metodo_Pago?: Tarjeta | EasyPay;
  }
  