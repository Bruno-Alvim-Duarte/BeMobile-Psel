// for AdonisJS v6
import { options } from 'adonis-autoswagger/dist/types.js'
import path from 'node:path'
import url from 'node:url'
// ---

export default {
  // path: __dirname + "/../", for AdonisJS v5
  path: path.dirname(url.fileURLToPath(import.meta.url)) + '/../', // for AdonisJS v6
  title: 'BeMobile Doc',
  version: '1.0.0',
  tagIndex: 1,
  snakeCase: true,
  debug: false, // set to true, to get some useful debug output
  ignore: ['/swagger', '/docs'],
  preferredPutPatch: 'PUT', // if PUT/PATCH are provided for the same route, prefer PUT
  common: {
    parameters: {
      ano: [
        {
          in: 'query',
          name: 'ano',
          schema: { type: 'string', example: '2004' },
        },
      ],
      mes: [
        {
          in: 'query',
          name: 'mes',
          schema: { type: 'string', example: '02' },
        },
      ],
    }, // OpenAPI conform parameters that are commonly used
    headers: {}, // OpenAPI conform headers that are commonly used
  },
  persistAuthorization: true, // persist authorization between reloads on the swagger page
  showFullPath: false, // the path displayed after endpoint summary,
  securitySchemes: {
    JWTAuth: {
      in: 'header',
      type: 'apiKey',
      name: 'Authorization',
      description: 'Token JWT',
    },
    BearerAuth: {},
    BasicAuth: {},
    ApiKeyAuth: {},
  },
  defaultSecurityScheme: 'JWTAuth',
} as options
