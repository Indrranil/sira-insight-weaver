# --- Stage 1: Build the React App ---
FROM node:18-alpine as builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies cleanly
RUN npm ci

# Copy the rest of the source code
COPY . .

# -----------------------------------------------------------
# CRITICAL ADDITION: Capture the Build Arguments from GitHub
# -----------------------------------------------------------
ARG VITE_SUPABASE_PROJECT_ID
ARG VITE_SUPABASE_PUBLISHABLE_KEY
ARG VITE_SUPABASE_URL
ARG VITE_API_BASE

# Make them available to the 'npm run build' command
ENV VITE_SUPABASE_PROJECT_ID=$VITE_SUPABASE_PROJECT_ID
ENV VITE_SUPABASE_PUBLISHABLE_KEY=$VITE_SUPABASE_PUBLISHABLE_KEY
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_API_BASE=$VITE_API_BASE
# -----------------------------------------------------------

# Build the app (Now it has the keys!)
RUN npm run build

# --- Stage 2: Serve with Nginx ---
FROM nginx:alpine

# Copy the built files from Stage 1 to Nginx's hosting folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy our custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 (Matches your updated main.tf)
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]