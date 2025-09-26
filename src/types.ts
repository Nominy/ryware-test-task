export interface Address {
    street: string;
    city: string;
    state: string;
    zip: string;
}

export interface ParkingMeter {
    id: string;
    address: Address;
    status?: boolean;
    usages?: number;
}

export type WithRequired<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type ParkingMeterFull = WithRequired<ParkingMeter, 'status' | 'usages'>;