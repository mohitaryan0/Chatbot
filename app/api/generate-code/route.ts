import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

// Landing page specific CSS styles - optimized for conversion
const landingPageStyles = `
  /* Landing Page Specific Styles */
  :root {
    --primary-color: #4f46e5;
    --secondary-color: #7c3aed;
    --accent-color: #f59e0b;
    --text-color: #1f2937;
    --light-color: #f9fafb;
    --dark-color: #111827;
    --success-color: #10b981;
    --error-color: #ef4444;
  }
  
  body {
    font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: var(--text-color);
  }
  
  .hero-section {
    padding: 5rem 2rem;
    text-align: center;
    background-color: var(--light-color);
    position: relative;
    overflow: hidden;
  }
  
  .hero-content {
    max-width: 800px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
  }
  
  .hero-title {
    font-size: 3rem;
    font-weight: 800;
    line-height: 1.2;
    margin-bottom: 1.5rem;
    background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  .hero-subtitle {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    color: #4b5563;
  }
  
  .cta-button {
    display: inline-block;
    background-color: var(--primary-color);
    color: white;
    font-weight: 600;
    padding: 1rem 2rem;
    border-radius: 0.5rem;
    text-decoration: none;
    transition: all 0.3s ease;
    font-size: 1.1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .cta-button:hover {
    background-color: var(--secondary-color);
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
  
  .cta-secondary {
    margin-left: 1rem;
    display: inline-block;
    background-color: transparent;
    color: var(--primary-color);
    border: 2px solid var(--primary-color);
    font-weight: 600;
    padding: 1rem 2rem;
    border-radius: 0.5rem;
    text-decoration: none;
    transition: all 0.3s ease;
  }
  
  .cta-secondary:hover {
    background-color: rgba(79, 70, 229, 0.1);
  }
  
  .features-section {
    padding: 5rem 2rem;
    background-color: white;
  }
  
  .section-title {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 3rem;
    color: var(--dark-color);
  }
  
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .feature-card {
    background-color: white;
    border-radius: 0.5rem;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .feature-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  }
  
  .feature-icon {
    width: 60px;
    height: 60px;
    background-color: rgba(79, 70, 229, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
    color: var(--primary-color);
  }
  
  .feature-title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: var(--dark-color);
  }
  
  .testimonials-section {
    background-color: var(--light-color);
    padding: 5rem 2rem;
  }
  
  .testimonial-card {
    background-color: white;
    border-radius: 0.5rem;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    margin-bottom: 2rem;
  }
  
  .testimonial-text {
    font-style: italic;
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
  }
  
  .customer-name {
    font-weight: 600;
    color: var(--dark-color);
  }
  
  .customer-title {
    color: #6b7280;
    font-size: 0.9rem;
  }
  
  .pricing-section {
    padding: 5rem 2rem;
    background-color: white;
  }
  
  .pricing-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .pricing-card {
    background-color: white;
    border-radius: 0.5rem;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease;
    border: 2px solid #e5e7eb;
    text-align: center;
  }
  
  .pricing-card.featured {
    border-color: var(--primary-color);
    transform: scale(1.05);
    position: relative;
  }
  
  .featured-tag {
    position: absolute;
    top: 0;
    right: 2rem;
    background-color: var(--primary-color);
    color: white;
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
    border-radius: 0 0 0.5rem 0.5rem;
    font-weight: 600;
  }
  
  .pricing-card.featured:hover {
    transform: scale(1.08);
  }
  
  .pricing-card:hover {
    transform: translateY(-5px);
  }
  
  .price {
    font-size: 3rem;
    font-weight: 800;
    color: var(--dark-color);
    margin: 1.5rem 0;
  }
  
  .price-currency {
    font-size: 1.5rem;
    vertical-align: top;
    margin-right: 0.25rem;
  }
  
  .price-duration {
    font-size: 1rem;
    color: #6b7280;
    font-weight: normal;
  }
  
  .price-features {
    list-style: none;
    padding: 0;
    margin: 2rem 0;
    text-align: left;
  }
  
  .price-features li {
    margin-bottom: 0.75rem;
    padding-left: 1.5rem;
    position: relative;
  }
  
  .price-features li::before {
    content: "✓";
    color: var(--success-color);
    position: absolute;
    left: 0;
    font-weight: bold;
  }
  
  .contact-section {
    background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
    color: white;
    padding: 5rem 2rem;
    text-align: center;
  }
  
  .contact-form {
    max-width: 600px;
    margin: 0 auto;
  }
  
  .form-group {
    margin-bottom: 1.5rem;
    text-align: left;
  }
  
  .form-control {
    width: 100%;
    padding: 1rem;
    border-radius: 0.5rem;
    border: none;
    font-size: 1rem;
  }
  
  .form-submit {
    background-color: var(--accent-color);
    border: none;
    color: white;
    font-weight: 600;
    padding: 1rem 2rem;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
    font-size: 1.1rem;
    width: 100%;
  }
  
  .form-submit:hover {
    background-color: #e3a008;
  }
  
  footer {
    background-color: var(--dark-color);
    color: white;
    padding: 3rem 2rem;
    text-align: center;
  }
  
  .social-icons {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    margin: 2rem 0;
  }
  
  .social-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    transition: background-color 0.3s ease;
  }
  
  .social-icon:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  
  /* Responsive styles */
  @media (max-width: 768px) {
    .hero-title {
      font-size: 2.2rem;
    }
    
    .hero-subtitle {
      font-size: 1.2rem;
    }
    
    .cta-button, .cta-secondary {
      display: block;
      width: 100%;
      margin: 1rem 0;
    }
    
    .pricing-card.featured {
      transform: none;
    }
    
    .pricing-card.featured:hover {
      transform: translateY(-5px);
    }
  }
`;

// Template for enhancing generated content with styling
const enhanceWithStyling = (content: string, isLandingPage: boolean = false) => {
  // First determine if the content is already valid HTML
  const hasHtmlStructure = content.includes('<html') && content.includes('<body') && content.includes('</html>');
  
  if (hasHtmlStructure) {
    // Check if it already has CSS, if not add appropriate styling
    if (!content.includes('<style>')) {
      // For landing pages, use the specialized landing page styles
      if (isLandingPage) {
        return content.replace('</head>', `
  <style>${landingPageStyles}</style>
</head>`);
      }
      
      // Default styling for non-landing page content
      return content.replace('</head>', `
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f8f9fa;
    }
    
    header {
      text-align: center;
      margin-bottom: 2rem;
    }
    
    h1, h2, h3 {
      color: #343a40;
      margin-bottom: 1rem;
    }
    
    p {
      margin-bottom: 1rem;
    }
    
    .container, main, section, article {
      background-color: #fff;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      margin-bottom: 1.5rem;
    }
    
    a {
      color: #0056b3;
      text-decoration: none;
    }
    
    a:hover {
      text-decoration: underline;
    }
    
    img {
      max-width: 100%;
      height: auto;
      border-radius: 4px;
    }
    
    @media (max-width: 768px) {
      body {
        padding: 10px;
      }
      
      .container, main, section, article {
        padding: 1rem;
      }
    }
  </style>
</head>`);
    }
    return content;
  }
  
  // If it's not valid HTML, wrap it in a proper HTML structure
  const baseTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Generated Content</title>
  <style>
  ${isLandingPage ? landingPageStyles : `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f8f9fa;
    }
    
    h1, h2, h3 {
      color: #343a40;
      margin-bottom: 1rem;
    }
    
    p {
      margin-bottom: 1rem;
    }
    
    .container {
      background-color: #fff;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      margin-bottom: 1.5rem;
    }
    
    a {
      color: #0056b3;
      text-decoration: none;
    }
    
    a:hover {
      text-decoration: underline;
    }
    
    img {
      max-width: 100%;
      height: auto;
      border-radius: 4px;
    }
    
    @media (max-width: 768px) {
      body {
        padding: 10px;
      }
      
      .container {
        padding: 1rem;
      }
    }
  `}
  </style>
</head>
<body>
  <div class="container">
    ${content}
  </div>
</body>
</html>`;

  return baseTemplate;
};

// Landing page optimized prompt template
const getLandingPagePrompt = (message: string) => {
  return `Generate a high-converting, modern landing page for: ${message}. 

IMPORTANT GUIDELINES:
1. Create a complete, responsive landing page with HTML and CSS
2. Include these essential sections in this order:
   - Hero section with compelling headline, subheadline, and primary CTA button
   - Features section (3-4 key benefits with icons)
   - Testimonials/social proof section
   - Pricing options (if applicable)
   - Secondary CTA section
   - Footer with contact information

3. Design requirements:
   - Modern, clean aesthetic with ample whitespace
   - Conversion-focused layout that guides users to take action
   - Responsive design that works on all devices
   - Use a cohesive color scheme with primary, accent, and neutral colors
   - Include subtle animations or hover effects where appropriate
   - Implement best practices for landing page conversion

4. Technical requirements:
   - Valid, semantic HTML5
   - Include clear call-to-action buttons throughout the page
   - Optimize for performance and loading speed
   - Add appropriate header tags and metadata
   - Include responsive navigation/menu

Return ONLY the complete HTML code with embedded CSS. No explanations or markdown.`;
};

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    
    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Check if the request is for a landing page
    const isLandingPage = message.toLowerCase().includes('landing page') || 
                          message.toLowerCase().includes('homepage') ||
                          message.toLowerCase().includes('sales page') ||
                          message.toLowerCase().includes('marketing page');

    // Generate content using Google's Generative AI
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    
    // Use optimized prompt for landing pages or standard prompt for other content
    const prompt = isLandingPage 
      ? getLandingPagePrompt(message)
      : `Generate valid HTML and CSS for: ${message}. 
         Make it responsive, visually appealing, and include modern design elements. 
         Return ONLY the HTML code with embedded CSS, nothing else.`;
    
    const response = await model.generateContent(prompt);
    
    // Extract the generated content
    const generatedContent = response?.response?.text() || "<p>Error generating content</p>";
    
    // Enhance the content with proper styling
    const enhancedHTML = enhanceWithStyling(generatedContent, isLandingPage);
    
    return NextResponse.json({ html: enhancedHTML });
  } catch (error) {
    console.error('Error generating code:', error);
    return NextResponse.json({ error: 'Failed to generate code' }, { status: 500 });
  }
}
