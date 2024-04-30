import { Entity } from "./entity";

export interface Organization extends Entity {
    id: string;
    name: string;
    contactName: string;
    contactEmail: string;
    contactPhone: string;
}