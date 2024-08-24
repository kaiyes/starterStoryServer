import AtomicArticlesResolver from './atomicArticle.resolver.js';

export default {
  Query: {
		getArticles: AtomicArticlesResolver.getArticles,
  },

  Mutation: {
   generateContent: AtomicArticlesResolver.generateContent,
   generateArticleContent: AtomicArticlesResolver.generateArticleContent,
  },
};
