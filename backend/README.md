# **Backend Project Using Cloudflare Workers**

This project is a backend service built using Cloudflare Workers. It provides APIs for user authentication, blog management, and more, using a serverless architecture. The project is configured with Prisma for database management and Zod for input validation.

## **Table of Contents**

- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Development](#development)
- [Deployment](#deployment)
- [License](#license)

## **Installation**

### **1. Prerequisites**

Before you begin, ensure you have the following tools installed on your local machine:

- **Node.js** (v14 or later)
- **NPM** or **Yarn**
- **Wrangler** (Cloudflare's CLI tool for managing Workers)

### **2. Clone the Repository**

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name/backend
```

### **3. Install Dependencies**

Install the necessary NPM packages:

```bash
npm install
```

Or if you use Yarn:

```bash
yarn install
```

### **4. Set Up Environment Variables**

Create a `.env` file in the root of your `backend` directory and add the following environment variables:

```plaintext
DATABASE_URL=prisma://accelerate.prisma-data.net/?api_key=your_database_api_key
SALT_ROUNDS=10
PRIVATE_KEY=your_private_key
```

### **5. Prisma Setup**

If you haven't already, set up Prisma by running the following commands:

```bash
npx prisma generate
```

This will generate the necessary Prisma client based on your schema.

## **Development**

To start the development server, use the following command:

```bash
npm run dev
```

This will start a local development server using Wrangler and watch for changes in your Cloudflare Worker scripts.

You can access the server locally at:

```
http://localhost:8787
```

### **Testing Your API**

You can use tools like Postman, Insomnia, or curl to test the endpoints provided by this backend.

## **Deployment**

To deploy your Cloudflare Worker to the production environment, use the following command:

```bash
npm run deploy
```

Make sure you have your Cloudflare account configured and authenticated using Wrangler before deploying.

### **Wrangler Configuration**

Ensure that your `wrangler.toml` is correctly configured with your Cloudflare account details:

```toml
name = "your-worker-name"
type = "javascript"
account_id = "your-cloudflare-account-id"
compatibility_date = "2024-08-28"

# Add more configurations as needed
[env.production]
vars = { DATABASE_URL = "your-production-database-url" }
```

## **License**

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

---

### **Summary**

- **Clone the repo** and set up your environment.
- **Install dependencies** and run the Prisma setup.
- **Start the dev server** using `npm run dev`.
- **Deploy your worker** using `npm run deploy`.

