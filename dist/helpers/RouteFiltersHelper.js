"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const RouteFilters_model_1 = require("../models/RouteFilters.model");
var RouteFiltersHelper;
(function (RouteFiltersHelper) {
    function getRouteFilters(ctx) {
        let scopes = getRouteScopes(ctx);
        let fields = getRouteFields(ctx);
        return new RouteFilters_model_1.RouteFilters({ scopes: scopes, fields: fields });
    }
    RouteFiltersHelper.getRouteFilters = getRouteFilters;
    function getRouteFields(ctx) {
        if (!util_1.isNullOrUndefined(ctx) && !util_1.isNullOrUndefined(ctx.query) && !util_1.isNullOrUndefined(ctx.query.fields) && ctx.query.fields !== "") {
            return ctx.query.fields.split(",");
        }
        return null;
    }
    RouteFiltersHelper.getRouteFields = getRouteFields;
    function getRouteScopes(ctx) {
        let scopes = ["defaultScope"];
        if (!util_1.isNullOrUndefined(ctx) && !util_1.isNullOrUndefined(ctx.query) && !util_1.isNullOrUndefined(ctx.query.scope) && ctx.query.scope !== "") {
            scopes = ctx.query.scope.split(",");
            console.log(scopes);
        }
        return scopes;
    }
    RouteFiltersHelper.getRouteScopes = getRouteScopes;
})(RouteFiltersHelper = exports.RouteFiltersHelper || (exports.RouteFiltersHelper = {}));
//# sourceMappingURL=RouteFiltersHelper.js.map