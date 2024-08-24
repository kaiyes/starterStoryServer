import AtomicArticle from '../models/atomicArticles.model.js';
import axios from 'axios';

export default {
  generateContent: async () => {
    try {
      console.log('Starting profession generation for medical articles...');
      
      const articles = await AtomicArticle.find({ profession: { $in: ["", null] } });
      console.log(`Found ${articles.length} articles without profession.`);
      
      if (articles.length === 0) {
        console.log('No articles found without profession. Check if all articles already have professions.');
        return { message: 'No articles to process' };
      }

      let processedCount = 0;

      for (const article of articles) {
        console.log(`Processing article: ${article.title}`);
        
        const prompt = `Based on the title "${article.title}", determine if this could be even remotely related to a doctor's profession, a business a doctor might run, or any health-related field. Consider all medical fields, health-related businesses, wellness practices, nutrition, sleep, beauty treatments, and any area where a doctor's expertise might be relevant. If there's any possibility it could be related to a doctor's work, business, or side job, respond with "Doctor".  if it's completely unrelated to health, medicine, or any field a doctor might work in. Provide only "Doctor" or "Not Doctor", nothing else.`;
        
        try {
          const response = await axios.post('http://localhost:11434/api/generate', {
            model: 'llama3.1',
            stream: false,
            prompt: prompt,
          });

          const generatedProfession = response.data.response.trim();
          
          if (generatedProfession === "Doctor") {
            article.profession = generatedProfession;
            await article.save();
            console.log(`Profession set to Doctor for article: ${article.title}`);
            processedCount++;
          } else {
            console.log(`Skipping article: ${article.title} - Not related to medical profession`);
          }
        } catch (error) {
          console.error(`Error processing article ${article.title}:`, error.message);
          // Continue with the next article
        }
      }

      console.log(`Medical profession generation completed. Processed ${processedCount} articles.`);
      return { message: `Medical profession generation completed. Processed ${processedCount} articles.` };
    } catch (error) {
      console.error('Error in generateContent:', error);
      return { message: `Error: ${error.message}` };
    }
  },

  generateArticleContent: async () => {
    try {
      console.log('Starting content generation for Doctor articles...');
      
      const articles = await AtomicArticle.find({ profession: "Doctor", content: { $in: ["", null] } });
      console.log(`Found ${articles.length} Doctor articles without content.`);
      
      if (articles.length === 0) {
        console.log('No Doctor articles found without content.');
        return { message: 'No articles to process' };
      }

      let processedCount = 0;

      for (const article of articles) {
        console.log(`Generating content for article: ${article.title}`);
        
        const prompt = `Generate a detailed description for an article titled "${article.title}" from a doctor's perspective. The content should be informative, professional, and highlight the medical or health-related aspects of the topic. Aim for about 150-200 words.`;
        
        try {
          const response = await axios.post('http://localhost:11434/api/generate', {
            model: 'llama3.1',
            stream: false,
            prompt: prompt,
          });

          const generatedContent = response.data.response.trim();
          
          if (generatedContent) {
            article.content = generatedContent;
            await article.save();
            console.log(`Content generated for article: ${article.title}`);
            processedCount++;
          } else {
            console.log(`Failed to generate content for article: ${article.title}`);
          }
        } catch (error) {
          console.error(`Error processing article ${article.title}:`, error.message);
          // Continue with the next article
        }
      }

      console.log(`Content generation completed. Processed ${processedCount} articles.`);
      return { message: `Content generation completed. Processed ${processedCount} articles.` };
    } catch (error) {
      console.error('Error in generateArticleContent:', error);
      return { message: `Error: ${error.message}` };
    }
  },

  getArticles: async (_, {profession}) => {
    return await AtomicArticle.find({profession});
  },  
};