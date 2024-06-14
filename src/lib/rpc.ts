/* eslint-disable */
import { NextResponse } from 'next/server'
import { z } from 'zod'

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS'
type PathParams<T> = T extends `${infer _Start}/[${infer Param}]${infer Rest}`
  ? { [K in Param]: string } & PathParams<Rest>
  : {}

export function createContract<
  M extends Method,
  P extends string,
  T extends z.ZodObject<any>,
  K extends z.ZodObject<any>,
>({
  method,
  path,
  input,
  output,
}: {
  method: M
  path: P
  input: T
  output: K
}) {
  function handler(
    impl: (ctx: {
      input: z.infer<T>
      request: Request
      params: PathParams<P>
    }) => Promise<z.infer<K>>,
  ): (
    request: Request,
    ctx: { params: PathParams<P> },
  ) => Promise<NextResponse> {
    return async (request, ctx) => {
      const body = await request.json()
      input.parse(body)
      const data = await impl({ ...ctx, input: body, request })
      output.parse(data)
      return NextResponse.json(data)
    }
  }
  function createUrl(path: P, params: Record<string, string>): string {
    return path.replace(/\[([^\]]+)\]/g, (_, key) => params[key])
  }
  function client(
    {
      input,
      params,
    }: {
      input: z.infer<T>
      params: PathParams<P>
    },
    init?: RequestInit | undefined,
  ): Promise<z.infer<K>> {
    return fetch(createUrl(path, params), {
      headers: { 'Content-Type': 'application/json' },
      ...init,
      method,
      body: JSON.stringify(input),
    }).then(res => res.json())
  }
  return {
    fetch: client,
    handler,
  }
}
