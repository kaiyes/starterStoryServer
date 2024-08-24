import { gql } from 'apollo-server-express'

const typeDefs = gql`
type AtomicArticle {
  title: String
  content: String
  profession: String
  average_revenue:String 
  average_cost_to_start:String  
}

type GenerateContentResponse {
  message: String
}

type Mutation {
  generateContent: GenerateContentResponse
  generateArticleContent: GenerateContentResponse
}

type Query {
  getArticles(profession: String): [AtomicArticle]
}
`

export default typeDefs