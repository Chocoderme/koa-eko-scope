import { IRouterContext } from "koa-router";
import { isNullOrUndefined } from "util";
import { RouteFilters } from "../models/RouteFilters.model";

export module RouteFiltersHelper {

    export function getRouteFilters(ctx: IRouterContext): RouteFilters {
        let scopes: string[] = getRouteScopes(ctx);
        let fields: string[] = getRouteFields(ctx);

        return new RouteFilters({ scopes: scopes, fields: fields });
    }

    export function getRouteFields(ctx: IRouterContext): string[] {
        if (!isNullOrUndefined(ctx) && !isNullOrUndefined(ctx.query) && !isNullOrUndefined(ctx.query.fields) && ctx.query.fields !== "" ) {
            return ctx.query.fields.split(",");
        }

        return null;
    }

    export function getRouteScopes(ctx: IRouterContext): string[] {

        let scopes:string[] = ["defaultScope"];
        if (!isNullOrUndefined(ctx) && !isNullOrUndefined(ctx.query) && !isNullOrUndefined(ctx.query.scope) && ctx.query.scope !== "" ) {
            scopes = ctx.query.scope.split(",");
            console.log(scopes);
        }

        return scopes;
    }
}
