import { DafResolver } from 'daf-resolver'
import * as Daf from 'daf-core'
import * as DidJwt from 'daf-did-jwt'
import { IdentityProvider } from 'daf-ethr-did'
import { KeyManagementSystem } from 'daf-react-native-libsodium'

import * as W3c from 'daf-w3c'
import * as SD from 'daf-selective-disclosure'

import * as URL from 'daf-url'
import * as DIDComm from 'daf-did-comm'
import { createConnection } from 'typeorm'

import merge from 'lodash.merge'
import Debug from 'debug'

const debug = Debug('daf:setup')

// Debug.enable('*')

import * as LocalGql from './graphql'

export const typeDefs = [
  Daf.Gql.baseTypeDefs,
  Daf.Gql.Core.typeDefs,
  Daf.Gql.IdentityManager.typeDefs,
  DIDComm.DIDCommGql.typeDefs,
  W3c.W3cGql.typeDefs,
  SD.SdrGql.typeDefs,
  LocalGql.typeDefs
]

export const resolvers = merge(
  Daf.Gql.Core.resolvers,
  DIDComm.DIDCommGql.resolvers,
  Daf.Gql.IdentityManager.resolvers,
  W3c.W3cGql.resolvers,
  SD.SdrGql.resolvers,
  LocalGql.resolvers
)

// You need to have Root access then access /data/data/{your.app.folder}/databases
const dbConnection = createConnection({
  type: 'react-native',
  database: 'daf.sqlite',
  location: 'default',
  synchronize: true,
  logging: ['error'],
  entities: [...Daf.Entities]
})

// // this.driver.connect is not a function
// // we need to extend a package for react-native typeorm mysql support
// // ref 1: https://dev.to/vinipachecov/setup-typeorm-with-react-native-50c4
// // ref 2: https://github.com/typeorm/react-native-example/blob/master/package.json
// const dbConnection = createConnection({
//   type: 'mysql',
//   host: 'localhost',
//   port: 3306,
//   database: 'daf',
//   synchronize: true,
//   logging: ['error'],
//   entities: [...Daf.Entities],
//   username: 'daf',
//   password: 'daf'
// })

const keyStore = new Daf.KeyStore(dbConnection)
const identityStore = new Daf.IdentityStore('rinkeby', dbConnection)
const kms = new KeyManagementSystem(keyStore)
const infuraProjectId = '5ffc47f65c4042ce847ef66a3fa70d4c'
const didResolver = new DafResolver({ infuraProjectId })
const rinkebyIdentityProvider = new IdentityProvider({
  kms,
  identityStore,
  network: 'rinkeby',
  rpcUrl: 'https://rinkeby.infura.io/v3/' + infuraProjectId
})

const messageHandler = new URL.UrlMessageHandler()
messageHandler
  .setNext(new DIDComm.DIDCommMessageHandler())
  .setNext(new DidJwt.JwtMessageHandler())
  .setNext(new W3c.W3cMessageHandler())
  .setNext(new SD.SdrMessageHandler())

const actionHandler = new DIDComm.DIDCommActionHandler()
actionHandler.setNext(new W3c.W3cActionHandler()).setNext(new SD.SdrActionHandler())

export const agent = new Daf.Agent({
  dbConnection,
  didResolver,
  identityProviders: [rinkebyIdentityProvider],
  actionHandler,
  messageHandler
})

export const Message = Daf.Message
