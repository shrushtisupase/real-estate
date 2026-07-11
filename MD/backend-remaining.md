1. Lead Management (The Kanban CRM Engine)
This is the core of the agent experience.

POST /api/v1/leads (Public)

Description: The lead capture endpoint. When a buyer clicks "Request Site Visit" on the frontend, this creates a new lead with status "New", linking the buyer, property, and agent.

GET /api/v1/leads (Private - Agent)

Description: Fetches all active leads belonging to the logged-in agent. This endpoint feeds the Kanban board on the frontend.

PATCH /api/v1/leads/:id/status (Private - Agent)

Description: The drag-and-drop trigger. When an agent moves a card from "Site Visit" to "Negotiation", this ultra-fast endpoint just updates the status string.

PATCH /api/v1/leads/:id (Private - Agent)

Description: The details updater. Used when an agent clicks into a lead card to add notes, update the budget, or set a nextFollowUp date.

2. Agency Admin (Oversight & Analytics)
The dashboard endpoints for the boss.

GET /api/v1/admin/agents (Private - Admin)

Description: Fetches all users with the agent role. Crucial for seeing who has isVerified: false.

PATCH /api/v1/admin/agents/:id/verify (Private - Admin)

Description: Toggles an agent's isVerified flag to true, granting them access to the platform.

GET /api/v1/admin/revenue (Private - Admin)

Description: The analytics engine. This will use a MongoDB Aggregation Pipeline to sum up the price of all properties connected to leads with a "Closed" status.

3. The Automated Services (Not Routes)
These aren't Express routes you call via HTTP; they are background workers that live alongside your server.

The Cron Job (node-cron): A script scheduled to run automatically (e.g., every morning at 8:00 AM). It queries the database for all leads where nextFollowUp matches today's date.

The Email Dispatcher (nodemailer): Takes the list of leads found by the cron job and fires off formatted HTML emails to the respective agents saying, "You have 3 site visits to follow up on today."