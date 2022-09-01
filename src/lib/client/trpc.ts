import type { inferProcedureInput, inferProcedureOutput } from '@trpc/server'
import type { LoadEvent } from '@sveltejs/kit'
import type { Router } from '$lib/server'

import superjson from 'superjson'
import * as trpc from '@trpc/client'
import { browser } from '$app/environment'

const url = browser ? '/trpc' : 'http://localhost:5173/trpc'

export const client = (loadFetch?: typeof fetch | LoadEvent['fetch']) =>
	trpc.createTRPCClient<Router>({
		url,
		transformer: superjson,
		...(loadFetch && { fetch: loadFetch as typeof fetch })
	})

type Query = keyof Router['_def']['queries']
type Mutation = keyof Router['_def']['mutations']

export type InferQueryOutput<RouteKey extends Query> = inferProcedureOutput<
	Router['_def']['queries'][RouteKey]
>
export type InferQueryInput<RouteKey extends Query> = inferProcedureInput<
	Router['_def']['queries'][RouteKey]
>
export type InferMutationOutput<RouteKey extends Mutation> = inferProcedureOutput<
	Router['_def']['mutations'][RouteKey]
>
export type InferMutationInput<RouteKey extends Mutation> = inferProcedureInput<
	Router['_def']['mutations'][RouteKey]
>
