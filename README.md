# KoaEko Scope
Scoped and fielded routes for koa-eko

# What is KoaEko Scope ?
KoaEko Scope is [**KoaEko**](https://github.com/Chocoderme/koa-eko) module allowing you to generate scoped and fielded routes
##### What are fielded routes ?
Fileded routes are API routes with the ability to define the fields you want to receive in your request.
```
GET /users/
```
Will return the default exposed entity
```
GET /users/?fields=id,name
```
Will only return the fields *id* and *name* 
##### What are scoped routes ?
Scoped routes are predifined fielded API routes
```
GET /users/?scope=minimal
```
Can be equivalent to
```
GET /users/?fields=id,name
```

# Dependencies
KoaEko Scope was built using multiple packages and is meant to be used with KoaEko:
* **koa**: [Website](https://koajs.com/) | [GitHub](https://github.com/koajs/koa) | [**Npm**](https://www.npmjs.com/package/koa)
* **koa-router**: Website | [GitHub](https://github.com/alexmingoia/koa-router) | [**Npm**](https://www.npmjs.com/package/koa-router)
* **koa-eko**: Website | [GitHub](https://github.com/Chocoderme/koa-eko) | [**Npm**](https://www.npmjs.com/package/koa-eko-scope)
* **sequelize**: [Website](http://docs.sequelizejs.com/) | [GitHub](https://github.com/sequelize/sequelize) | [**Npm**](https://www.npmjs.com/package/sequelize)
* **sequelize-typescript**: Website | GitHub | [**Npm**](https://www.npmjs.com/package/sequelize-typescript)
* **reflect-metadata**: [Website](https://rbuckton.github.io/reflect-metadata/) | GitHub | [**Npm**](https://www.npmjs.com/package/reflect-metadata)

# Installation
You can install **KoaEko Scope** using **npm**:
```bash
npm i koa-eko-scope
```

# Reference

* Classes
    * [EkoScopedController](#ekoscopedcontroller)

## EkoScopedController
**KoaEko Scope** provides a EkoScopedController inheriting from `EkoController`. If you want to use fielded and scoped routes, you must inherit from it
```typescript
import { EkoScopedController } from "koa-eko-scope";

class MyController extends EkoScopedController {}
```
Once your controller inherits from EkoScopedController, it will have access to `protected getScope(): string[]`.
this method will handle all the fields and scopes of of any request. Here is an exemple of how to use it using sequelize-typescript
```typescript
import { EkoGet } from "koa-eko";
import { EkoScopedController } from "koa-eko-scope";

class MyController extends EkoScopedController {

    public contructor() {
        super();
    }

    @EkoGet("/")
    public async MyGetRoute(ctx: IRouterContext): Promise<void> {
        ctx.body = await Entity.scope(this.getScope()).all();
    }

}
```


## Defining scopes
**KoaEko Scope** uses sequelize scopes. Read more about it [here](http://docs.sequelizejs.com/manual/tutorial/scopes.html) and [here](https://www.npmjs.com/package/sequelize-typescript#scopes)
```typescript
@DefaultScope({
    attributes: ["id", "name", "description", "startDate", "endDate"]
})

@Scopes({
    empty: {
        attributes: []
    },
    minimal: {
        attributes: ["id", "name"]
    },
    full: {
        include: [() => User, () => Organizer, () => Event, () => Comment, () => Rating]
    }
})
@Table
export class Activity extends Model<Activity> {}
```
