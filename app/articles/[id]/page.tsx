"use client";

import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/app/providers";
import ArticleDetailView from "@/app/components/pages/article-detail-view";
import ArticleSpecificChatbot from "@/app/components/article-specific-chatbot";
import "@/app/styles/article-detail.css";
import { useState } from "react";

/* 
   🔥 UPDATED ARTICLE LIST FROM YOUR PDFs
   -------------------------------------
*/

const articles = [
  {
    id: "1",
    title: "Human Physiology: Core Principles & Body Functions",
    excerpt:
      "Understand how the human body maintains homeostasis and performs vital life processes.",
    tags: ["human-physiology", "biology", "body-systems"],
    content:
      "Human physiology explores how the human body functions through complex organ systems working together to maintain homeostasis...",
    fullContent: `
Human physiology is the scientific study of how the human body works. It explains how organs, cells, and biological systems interact to sustain life.

Key concepts include:
• Homeostasis and internal regulation  
• Neural communication and reflex pathways  
• Muscular and skeletal system functions  
• Respiratory and circulatory coordination  
• Excretion, digestion, and metabolism  
• Hormonal and endocrine signaling  

The PDF chapters cover body regulation, tissues, neural mechanisms, and systemic coordination essential for survival.
    `,
    author: "Academic Reference",
    date: "2024-01-10",
    readTime: "14 min read",
  },

  {
    id: "2",
    title: "Microbes in Space: NASA & JAXA Research Insights",
    excerpt:
      "Learn how microorganisms behave in space and how space agencies study microbial risks and benefits.",
    tags: ["microbiology", "space", "NASA", "JAXA"],
    content:
      "Space agencies study microbial growth, mutations, immunity interactions, and contamination risks aboard the ISS...",
    fullContent: `
Microbiological research in space is essential for astronaut health, spacecraft safety, and astrobiology.

NASA focuses on:
• Microbial survival and mutation in microgravity  
• Host–microbe immune interactions  
• Astronaut microbiome changes  
• Pathogen virulence shifts  
• Planetary protection  

JAXA conducts:
• Microbe-1,2,3,4 surface & air sampling in the Kibo module  
• Real-time microbial monitoring  
• Contamination tracking  

These studies help create safer long-duration missions.
    `,
    author: "NASA & JAXA Research Teams",
    date: "2014-09-01",
    readTime: "12 min read",
  },

  {
    id: "3",
    title: "Plant Water Management in Microgravity",
    excerpt:
      "How NASA grows plants in space using capillary fluidics and passive watering technologies.",
    tags: ["plants", "microgravity", "space", "fluidics"],
    content:
      "Watering plants in microgravity is difficult due to lack of gravity-driven flow. NASA developed capillary-based systems...",
    fullContent: `
Growing plants in microgravity is essential for long-duration space travel. NASA's PWM experiments on the ISS examine:

• Water flow without gravity  
• Capillary fluidics replacing gravitational flow  
• Aerated root-zone designs  
• Hydroponic, soil, and passive wick systems  
• Evapotranspiration and nutrient circulation  
• Autonomous water management for space farms  

PWM-1 → PWM-4 experiments show how plants can survive and grow using only capillary forces in space.
    `,
    author: "NASA Glenn Research Center",
    date: "2022-07-14",
    readTime: "16 min read",
  },

  {
    id: "4",
    title: "Advanced Human Physiology: Systems & Regulation",
    excerpt:
      "A deeper look into organ systems, signaling pathways, immunity, and physiological adaptation.",
    tags: ["physiology", "anatomy", "health"],
    content:
      "This article explains advanced physiological mechanisms including detailed system regulation...",
    fullContent: `
This extended physiology content focuses on:

• Neural regulation & reflex arcs  
• Sensory pathways  
• Muscle contraction physiology  
• Cardiovascular & respiratory coordination  
• Digestive & excretory system functions  
• Endocrine system & hormone loops  

It connects molecular biology to systemic functions for complete understanding.
    `,
    author: "Academic Reference",
    date: "2024-01-18",
    readTime: "18 min read",
  },
];

/* 
   -------------------------------------
   🔥 PAGE COMPONENT
   -------------------------------------
*/
export default function ArticleDetail() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const articleId = params.id as string;
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const article = articles.find((a) => a.id === articleId);

  if (!article) {
    return (
      <div className="article-not-found">
        <h1>Article not found</h1>
        <button onClick={() => router.push("/articles")}>
          Back to Articles
        </button>
      </div>
    );
  }

  return (
    <div className="article-detail-layout">
      {isChatbotOpen && (
        <div
          className="chatbot-overlay"
          onClick={() => setIsChatbotOpen(false)}
        />
      )}

      <div className="article-main">
        <button
          className="article-chat-button"
          onClick={() => setIsChatbotOpen(!isChatbotOpen)}
          title="Ask AI about this article"
        >
          💬 Ask AI
        </button>

        <ArticleDetailView
          article={article}
          onBack={() => router.push("/articles")}
        />
      </div>

      {isChatbotOpen && (
        <aside
          className={`article-chatbot-modal ${
            isChatbotOpen ? "open" : ""
          }`}
        >
          <button
            className="chatbot-close-button"
            onClick={() => setIsChatbotOpen(false)}
            title="Close chatbot"
          >
            ✕
          </button>

          <ArticleSpecificChatbot article={article} />
        </aside>
      )}
    </div>
  );
}
