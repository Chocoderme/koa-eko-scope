"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const koa_eko_1 = require("koa-eko");
const util_1 = require("util");
const RouteFiltersHelper_1 = require("./helpers/RouteFiltersHelper");
class EkoScopedController extends koa_eko_1.EkoController {
    constructor(autoInit = true) {
        super(false);
        this.filters = null;
        if (autoInit) {
            this.Initialize();
        }
    }
    Initialize() {
        this.router.use(this.FilterMiddleware());
        super.Initialize();
    }
    FilterMiddleware() {
        return async (ctx, next) => {
            let filters = RouteFiltersHelper_1.RouteFiltersHelper.getRouteFilters(ctx);
            this.filters = filters;
            return next();
        };
    }
    getScope() {
        if (this.filters == null) {
            return [];
        }
        let attr = {};
        if (!util_1.isNullOrUndefined(this.filters.fields)) {
            attr.attributes = this.filters.fields;
        }
        if (this.filters.scopes.length === 1 && this.filters.scopes[0] === "defaultScope" &&
            !util_1.isNullOrUndefined(this.filters.fields) && this.filters.fields.length > 0) {
            return [attr];
        }
        return this.filters.scopes.concat(attr);
    }
}
exports.EkoScopedController = EkoScopedController;
//# sourceMappingURL=EkoScopedController.js.map