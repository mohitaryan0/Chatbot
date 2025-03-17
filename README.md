This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Deploying to Vercel as a New Project

Follow these steps to deploy this project as a new application on Vercel:

1. **Create a GitHub Repository**
   - Create a new GitHub repository
   - Push your code to this new repository

2. **Sign in to Vercel**
   - Go to [Vercel](https://vercel.com) and sign in with your account
   - Click "Add New..." > "Project"

3. **Import Your Repository**
   - Select the GitHub repository you created
   - Click "Import"

4. **Configure Project**
   - Project Name: Choose a unique name (e.g., `ai-chatbot-v2`)
   - Framework Preset: Next.js (should be auto-detected)
   - Root Directory: `./` (default)

5. **Environment Variables**
   - Add the following environment variables:
     - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon/public key

6. **Deploy**
   - Click "Deploy"
   - Wait for the deployment to complete

7. **Configure Supabase**
   - Go to your Supabase dashboard > Authentication > URL Configuration
   - Set the Site URL to your new Vercel deployment URL (e.g., `https://ai-chatbot-v2.vercel.app`)
   - Add a redirect URL for authentication: `https://ai-chatbot-v2.vercel.app/auth/callback`
   - Save changes

Your chatbot will now be live at your Vercel deployment URL.

## Additional Tips

- **Custom Domain**: You can add a custom domain in the Vercel project settings
- **Environment Variables**: Update them in Vercel project settings if needed
- **Logs**: Check deployment logs in Vercel dashboard for troubleshooting

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
