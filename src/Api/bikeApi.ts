export enum BikeStatus {
    Available, Rented, Reserved, Blocked,
}

export interface Bike {
    id: string;
    status: BikeStatus;
    station?: {
        id: string;
        name: string;
    };
}