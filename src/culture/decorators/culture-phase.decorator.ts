import { createParamDecorator, ExecutionContext } from "@nestjs/common";
/**
 * A param decorator that retrieves data from the request context.
 *
 * The `CulturePhaseDecorator` function is a param decorator that can be used to
 * retrieve data from the request context in a Nest.js application. It uses the
 * `createParamDecorator` function from the `@nestjs/common` module to create a
 * decorator function that takes a string parameter `data` and an
 * `ExecutionContext` object `ctx`.
 *
 */
export const CulturePhaseDecorator = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request;
    console.log("CulturePhaseDecorator data : ", data, user);
    // console.log("CulturePhaseDecorator body: ", request.body);
    // Get phase action and phase type
    /**
     * If start only harvesting change
     * If stop nothing
     * If skip nothing
     *
     */
    return data ? user?.[data] : user;
  }
);
