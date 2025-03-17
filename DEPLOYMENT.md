# Deployment Guide for AI Chatbot

This guide will help you deploy your AI Chatbot as a completely new project on Vercel.

## Pre-Deployment Checklist

1. **Verify Environment Variables**
   - You'll need your Supabase credentials:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Get these from your Supabase dashboard if you don't have them

2. **Build Project Locally**
   - Run this command to make sure your project builds successfully:
   ```bash
   npm run build
   ```
   - Fix any build errors before proceeding

## Deploying to Vercel

### Option 1: Deploy with Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy as New Project**
   ```bash
   vercel --name ai-chatbot-v2-new
   ```
   
4. **Set Environment Variables**
   When prompted, enter your environment variables or add them later in the Vercel dashboard.

### Option 2: Deploy from Vercel Dashboard

1. **Create a New Git Repository**
   - Create a new GitHub/GitLab/Bitbucket repository
   - Push your code to this new repository

2. **Import into Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/new)
   - Select "Import Project" and choose your repository
   - Configure project:
     - Project Name: `ai-chatbot-v2-new` (or your preferred name)
     - Framework: Next.js
     - Set environment variables mentioned above
   - Click "Deploy"

## Post-Deployment Configuration

1. **Update Supabase Configuration**
   - Go to Supabase Dashboard > Authentication > URL Configuration
   - Set Site URL to your new Vercel deployment URL
   - Add a redirect URL: `https://your-project-name.vercel.app/auth/callback`
   - Save changes

2. **Verify Email Confirmation**
   - Test registration and email confirmation flow
   - Make sure your email confirmation page appears correctly

3. **Test Authentication**
   - Log in and out to ensure authentication works
   - Verify that UI elements update correctly based on authentication state

## Troubleshooting

- **Authentication Issues**: Double-check Supabase Site URL and redirect URLs
- **Build Errors**: Check Vercel deployment logs for specific errors
- **Email Confirmation**: Ensure your callback route is properly configured

## Need Help?

- Vercel Documentation: [https://vercel.com/docs](https://vercel.com/docs)
- Supabase Documentation: [https://supabase.com/docs](https://supabase.com/docs)
- Next.js Documentation: [https://nextjs.org/docs](https://nextjs.org/docs)
