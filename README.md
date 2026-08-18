# InterviewDesk

InterviewDesk is a responsive interview scheduler built with Next.js, Tailwind CSS, Neon PostgreSQL, and ExcelJS. It uses one Next.js project for the UI, server actions, API routes, authentication, and database access.

## Local setup

1. Install Node.js 20 or newer.
2. Run `npm install` in this folder.
3. Copy `.env.example` to `.env` and add your Neon connection string plus secure admin credentials:

   ```env
   DATABASE_URL=postgresql://...
   ADMIN_USERNAME=your-username
   ADMIN_PASSWORD=your-password
   AUTH_SECRET=a-long-random-secret-at-least-32-characters
   ```

4. Create a Neon project at [neon.tech](https://neon.tech), copy its pooled connection string, and place it in `DATABASE_URL`.
5. No separate migration command is needed: InterviewDesk creates the `users` and `interviews` tables on its first safe request.
6. Run `npm run dev`, then open `http://localhost:3000`.

## GitHub

```bash
git init
git add .
git commit -m "Create InterviewDesk"
git branch -M main
git remote add origin https://github.com/YOUR_NAME/interviewdesk.git
git push -u origin main
```

## Vercel deployment

1. Push the project to GitHub, then select **Add New → Project** in Vercel.
2. Import the repository; Vercel recognizes Next.js automatically.
3. Add `DATABASE_URL`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`, and `AUTH_SECRET` in Vercel Project Settings → Environment Variables.
4. Use the Neon pooled connection URL for `DATABASE_URL` and deploy.
5. Visit the deployment, sign in, and add a test interview to verify the database connection.
6. Confirm it appears on the dashboard and download it using **Export Excel**.

## Features

- Public student scheduling form with no student account required
- Environment-controlled, HTTP-only admin login for managing all interview records
- Add, edit, delete, search, date-filter, and status-filter interviews
- Overlapping-time warning (with a Save Anyway choice)
- Today and upcoming schedule dashboard
- On-demand `student_interviews.xlsx` export with formatted headers, filters, and frozen header row
