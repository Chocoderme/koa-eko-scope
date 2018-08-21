export class RouteFilters {
    scopes: string[];
    fields?: string[];

    public constructor (init?:Partial<RouteFilters>) {
        Object.assign(this, init);
    }
}
