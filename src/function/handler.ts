import type { HandlerContext } from './handler_context.js'
import type { HandlerEvent } from './handler_event.js'
import type { HandlerResponse, BuilderResponse, StreamingResponse } from './handler_response.js'

export interface HandlerCallback<ResponseType extends HandlerResponse | Response = HandlerResponse> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (error: any, response: ResponseType): void
}

export interface BaseHandler<
  ResponseType extends HandlerResponse | Response = HandlerResponse,
  C extends HandlerContext = HandlerContext,
> {
  (event: HandlerEvent, context: C, callback?: HandlerCallback<ResponseType>): void | Promise<ResponseType>
}

export interface BackgroundHandler<C extends HandlerContext = HandlerContext> {
  (event: HandlerEvent, context: C): void | Promise<void>
}

export type Handler = BaseHandler<HandlerResponse | Response, HandlerContext>
export type BuilderHandler = BaseHandler<BuilderResponse, HandlerContext>

export interface StreamingHandler {
  (event: HandlerEvent, context: HandlerContext): Promise<StreamingResponse>
}
