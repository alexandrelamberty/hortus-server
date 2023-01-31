import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { of } from "rxjs";

/**
 * An interceptor that logs request information and conditions the request based
 * on the body.
 */
@Injectable()
export class PhaseIntercerptor implements NestInterceptor {
  /**
   * Constructs a new `PhaseInterceptor`.
   */
  constructor() {}

  /**
   * Intercepts an incoming request and modifies its behavior.
   *
   * @param context The execution context of the intercepted request.
   * @param next A `CallHandler` that allows the interceptor to pass the request
   * to the next middleware in the chain.
   * @returns An observable of the response.
   */
  async intercept(
    context: ExecutionContext,
    next: CallHandler
  ) /*: Observable<any>*/ {
    const httpContext = context.switchToHttp();
    const req = httpContext.getRequest();

    const bodyDto = req.body;
    const params = req.params;

    // Need Update below logic
    // if (bodyDto instanceof ClassA || bodyDto instanceof ClassB) {
    //   return next.handle();
    // }

    // Return empty set
    // return of([]);
    return next.handle();
  }
}
