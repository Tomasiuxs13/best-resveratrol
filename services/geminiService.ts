import { GoogleGenAI, Type } from "@google/genai";
import type { Product, FAQItem, BlogPost, ResveratrolInfo, AboutInfo, GuidePost } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const productSchema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        id: { type: Type.INTEGER },
        rank: { type: Type.INTEGER },
        name: { type: Type.STRING, description: "Catchy product name." },
        brand: { type: Type.STRING, description: "Brand of the product." },
        image: { type: Type.STRING, description: "A placeholder image URL from picsum.photos, e.g., https://picsum.photos/seed/product1/400/400" },
        summary: { type: Type.STRING, description: "A concise, compelling summary (2-3 sentences) for the product." },
        pros: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of 3-4 key benefits or pros." },
        cons: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of 1-2 potential drawbacks or cons." },
        bestFor: { type: Type.STRING, description: "A short highlight, e.g., 'Best Overall', 'High Potency', 'Best Budget'." },
        rating: { type: Type.NUMBER, description: "A rating out of 5, e.g., 4.9" },
        affiliateLink: { type: Type.STRING, description: "A placeholder URL, e.g., #product-link" },
        servingSize: { type: Type.STRING, description: "Serving size, e.g., '2 Capsules Daily'" },
        potency: { type: Type.STRING, description: "Potency of active ingredient, e.g., '99% Trans-Resveratrol'" },
        certifications: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of 2-3 trust certifications, e.g., 'Third-Party Tested', 'GMP Certified', 'Made in USA'." },
      },
      required: ["id", "rank", "name", "brand", "image", "summary", "pros", "cons", "bestFor", "rating", "affiliateLink", "servingSize", "potency", "certifications"],
    },
};

const guidePostSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            id: { type: Type.INTEGER },
            slug: { type: Type.STRING, description: "A URL-friendly slug, e.g., 'how-to-choose-resveratrol'." },
            title: { type: Type.STRING, description: "An engaging, SEO-friendly guide title." },
            summary: { type: Type.STRING, description: "A short, enticing summary of the guide." },
            content: { type: Type.STRING, description: "The full content of the guide. Format as a single HTML string with tags like <p>, <strong>, <ul>, and <li>. Where relevant, include internal links to other sections of the website, using relative paths like '/faq' or '/what-is-resveratrol'." }
        },
        required: ["id", "slug", "title", "summary", "content"]
    }
};


const faqSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            question: { type: Type.STRING },
            answer: { type: Type.STRING, description: "A detailed but clear answer, formatted as an HTML string. Include internal links where relevant (e.g., to the '/blog' or '/what-is-resveratrol' pages)." }
        },
        required: ["question", "answer"]
    }
};

const blogSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            id: { type: Type.INTEGER },
            title: { type: Type.STRING, description: "An engaging, SEO-friendly blog post title." },
            author: { type: Type.STRING, description: "A fictional but credible author name, e.g., Dr. Evelyn Reed, Nutrition Scientist" },
            authorBio: { type: Type.STRING, description: "A short, credible bio for the fictional author." },
            date: { type: Type.STRING, description: "A recent date, e.g., October 26, 2024" },
            summary: { type: Type.STRING, description: "A short, enticing summary of the blog post." },
            content: { type: Type.STRING, description: "The full content of the blog post, at least 3-4 paragraphs long. Format as a single HTML string with tags like <p>, <strong>, <ul>, and <li>. Where relevant, include internal links to other sections of the website, using relative paths like '/faq' or '/what-is-resveratrol'." }
        },
        required: ["id", "title", "author", "authorBio", "date", "summary", "content"]
    }
};

const resveratrolInfoSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING },
        introduction: { type: Type.STRING, description: "A comprehensive introduction to Resveratrol, formatted as an HTML string." },
        sections: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    heading: { type: Type.STRING, description: "Heading for a section, e.g., 'Scientific Evidence', 'Sources of Resveratrol'." },
                    content: { type: Type.STRING, description: "Detailed content for the section, formatted as an HTML string with internal links to the '/faq' or '/blog' where appropriate." }
                },
                required: ["heading", "content"]
            }
        }
    },
    required: ["title", "introduction", "sections"]
};

const aboutInfoSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING },
        content: { type: Type.STRING, description: "Content for an 'About Us' page, explaining the site's mission, review process, and expertise. Format as an HTML string with <p> and <strong> tags. Include links to other pages like the main reviews page ('/')." }
    },
    required: ["title", "content"]
};


export const generateAffiliateContent = async (): Promise<{ products: Product[] }> => {
  try {
    const productResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: "Generate a list of the top 10 best resveratrol supplements for an affiliate marketing website. The content should be SEO and conversion-rate optimized. Create fictional but realistic brand and product names. Provide realistic certifications for each. Ensure the rankings are from 1 to 10. For images, use picsum.photos with unique seeds for each product (e.g., product1, product2). The copy should be persuasive and trustworthy.",
        config: {
            responseMimeType: "application/json",
            responseSchema: productSchema
        }
    });

    const products: Product[] = JSON.parse(productResponse.text);

    if (!products || !Array.isArray(products) || products.length === 0) {
        throw new Error("Failed to generate product content from API.");
    }

    return { products: products.sort((a, b) => a.rank - b.rank) };
  } catch (error) {
    console.error("Error generating affiliate content:", error);
    throw new Error("Could not fetch content from Gemini API. Please check your API key and try again.");
  }
};

export const generateGuidesContent = async (): Promise<GuidePost[]> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: "Generate 3-4 comprehensive, SEO-optimized guides about resveratrol supplements. Topics should include 'How to Choose the Best Resveratrol Supplement', 'Understanding Resveratrol Purity and Potency', and 'The Health Benefits of Resveratrol Explained'. Each guide needs a title, a URL-friendly slug, a summary, and full content formatted as an HTML string with internal links.",
            config: {
                responseMimeType: "application/json",
                responseSchema: guidePostSchema
            }
        });
        const guides: GuidePost[] = JSON.parse(response.text);
        if (!guides || !Array.isArray(guides) || guides.length === 0) {
            throw new Error("Failed to generate guides content.");
        }
        return guides;
    } catch (error) {
        console.error("Error generating guides content:", error);
        throw new Error("Could not fetch guides content from Gemini API.");
    }
};

export const generateFaqContent = async (): Promise<FAQItem[]> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: "Generate a list of 8-10 frequently asked questions about resveratrol supplements. The questions should cover topics like dosage, side effects, benefits, timing, and what to look for. The answers should be informative, easy to understand, formatted as HTML strings, and include internal links where appropriate. The content must be optimized for SEO and aim to achieve a featured snippet on Google.",
            config: {
                responseMimeType: "application/json",
                responseSchema: faqSchema
            }
        });
        const faqs: FAQItem[] = JSON.parse(response.text);
        if (!faqs || !Array.isArray(faqs) || faqs.length === 0) {
            throw new Error("Failed to generate FAQ content.");
        }
        return faqs;
    } catch (error) {
        console.error("Error generating FAQ content:", error);
        throw new Error("Could not fetch FAQ content from Gemini API.");
    }
};

export const generateBlogContent = async (): Promise<BlogPost[]> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: "Generate 3-4 high-quality, SEO-optimized blog posts about resveratrol. Topics could include 'Resveratrol and Anti-Aging: What the Science Says', 'How to Maximize Resveratrol Absorption', 'Resveratrol vs. Pterostilbene', and 'Top 5 Foods High in Resveratrol'. Each post needs a title, author, a short author bio, date, summary, and full content formatted as an HTML string with internal links.",
            config: {
                responseMimeType: "application/json",
                responseSchema: blogSchema
            }
        });
        const posts: BlogPost[] = JSON.parse(response.text);
        if (!posts || !Array.isArray(posts) || posts.length === 0) {
            throw new Error("Failed to generate blog content.");
        }
        return posts;
    } catch (error) {
        console.error("Error generating blog content:", error);
        throw new Error("Could not fetch blog content from Gemini API.");
    }
};

export const generateResveratrolInfoContent = async (): Promise<ResveratrolInfo> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: "Generate a detailed, authoritative page on 'What is Resveratrol?'. It should have a title, an introduction, and several sections covering its chemical nature, sources, mechanism of action, scientific research, and potential side effects. The tone should be scientific but accessible. Format all text content as HTML strings with internal links.",
            config: {
                responseMimeType: "application/json",
                responseSchema: resveratrolInfoSchema
            }
        });
        const info: ResveratrolInfo = JSON.parse(response.text);
        if (!info) {
            throw new Error("Failed to generate resveratrol info content.");
        }
        return info;
    } catch (error) {
        console.error("Error generating resveratrol info content:", error);
        throw new Error("Could not fetch info content from Gemini API.");
    }
};


export const generateAboutContent = async (): Promise<AboutInfo> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: "Generate content for an 'About Us' page for a resveratrol supplement review site. The title should be something like 'Our Mission & Review Process'. The content should explain the site's commitment to providing unbiased, science-backed reviews. Describe a fictional, rigorous review process. Format the content as an HTML string.",
            config: {
                responseMimeType: "application/json",
                responseSchema: aboutInfoSchema,
            }
        });
        const info: AboutInfo = JSON.parse(response.text);
        if (!info) {
            throw new Error("Failed to generate about info content.");
        }
        return info;
    } catch (error) {
        console.error("Error generating about info content:", error);
        throw new Error("Could not fetch about info content from Gemini API.");
    }
};