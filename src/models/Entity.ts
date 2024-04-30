import { Link } from "./link";

export interface Entity {
    _links: {
        self: Link;
        update: Link;
        delete: Link
    }
}