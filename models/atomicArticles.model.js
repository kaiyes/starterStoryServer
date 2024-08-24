import mongoose from 'mongoose';

const atomicArticleSchema = new mongoose.Schema({
  title: String,
  profession: String,
  content: String,
  average_revenue: String,
  average_cost_to_start: String,
});

const AtomicArticle = mongoose.model('AtomicArticle', atomicArticleSchema, 'atomicArticles');

export default AtomicArticle;