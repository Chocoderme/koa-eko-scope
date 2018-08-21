import { EkoController } from "koa-eko";
import { IEkoScopedController } from "./interfaces/IEkoScopedController";
import { IMiddleware } from "koa-router";
import { isNullOrUndefined } from "util";
import { RouteFiltersHelper } from "./helpers/RouteFiltersHelper";
import { RouteFilters } from "./models/RouteFilters.model";

export abstract class EkoScopedController extends EkoController implements IEkoScopedController {

    protected filters: RouteFilters = null;

    public constructor(autoInit: boolean = true) {
        super(false);
        if (autoInit) {
            this.Initialize();
        }
    }

    protected Initialize(): void {
        this.router.use(this.FilterMiddleware());
        super.Initialize();
    }

    protected FilterMiddleware(): IMiddleware {
        return async (ctx, next) => {
            let filters: RouteFilters = RouteFiltersHelper.getRouteFilters(ctx);
            this.filters = filters;
            return next();
        };
    }

    protected getScope(): string[] {
        if (this.filters == null) {
            return [];
        }

        let attr:any = {};
        if (!isNullOrUndefined(this.filters.fields)) {
            attr.attributes = this.filters.fields;
        }

        if (this.filters.scopes.length === 1 && this.filters.scopes[0] === "defaultScope" &&
        !isNullOrUndefined(this.filters.fields) && this.filters.fields.length > 0) {
            return [attr];
        }

        return this.filters.scopes.concat(attr);
    }

}
