import {ResponseComposition, rest, RestContext, RestRequest} from 'msw';

const baseUrl = 'https://example.com';

export const handlers = [
  rest.get(baseUrl + '/users', async (req, res, ctx) => {
    handleUnauthorized(req, res, ctx);

    return res(
      ctx.json({
        Items: [
          {
            identityId: 'AA-2137',
            name: 'Juan Pablo',
          },
        ],
      })
    );
  }),
  rest.post(baseUrl + '/users', async (req, res, ctx) => {
    handleUnauthorized(req, res, ctx);
    return res(
      ctx.status(200),
      ctx.json({
        $metadata: {
          httpStatusCode: 200,
          requestId: 'SOME_REQUEST',
        },
      })
    );
  }),
];

const handleUnauthorized = (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
  if (!req.headers.get('Authorization')?.includes('some-jwt-id-token')) {
    return res(ctx.status(401), ctx.json({message: 'Not authorized'}));
  }
};
