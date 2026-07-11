import cron from 'node-cron';
import Lead from '../models/lead.model.js';
import { sendEmail } from './email.service.js';

/**
 * Queries database for leads requiring follow-up today,
 * groups them by agent email, and sends out email alerts.
 */
export const checkAndSendFollowUpReminders = async () => {
  console.log('⏰ Running daily lead follow-up reminder cron job...');
  try {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    // Find all leads where nextFollowUp falls within today
    const leads = await Lead.find({
      nextFollowUp: {
        $gte: startOfToday,
        $lte: endOfToday,
      },
    })
      .populate('agentId')
      .populate('propertyId');

    console.log(`🔍 Found ${leads.length} lead(s) for follow-up today.`);

    if (leads.length === 0) {
      return;
    }

    // Group leads by agent email
    const leadsByAgent = {};
    for (const lead of leads) {
      if (!lead.agentId || !lead.agentId.email) {
        continue;
      }
      const agentEmail = lead.agentId.email;
      if (!leadsByAgent[agentEmail]) {
        leadsByAgent[agentEmail] = {
          agentName: lead.agentId.name || 'Agent',
          leads: [],
        };
      }
      leadsByAgent[agentEmail].leads.push(lead);
    }

    // Dispatch email to each agent
    for (const [agentEmail, data] of Object.entries(leadsByAgent)) {
      const leadCount = data.leads.length;
      const leadListHtml = data.leads
        .map(
          (lead) => `
        <li style="margin-bottom: 12px; padding: 8px; border-bottom: 1px solid #eee;">
          <strong>Buyer:</strong> ${lead.buyerName} (${lead.buyerEmail}${
            lead.buyerPhone ? `, ${lead.buyerPhone}` : ''
          })<br/>
          <strong>Property:</strong> ${lead.propertyId?.title || 'N/A'}<br/>
          <strong>Budget:</strong> $${lead.budget || 'N/A'}<br/>
          <strong>Notes:</strong> ${lead.notes || 'None'}
        </li>`
        )
        .join('');

      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd;">
          <h2 style="color: #333;">Hello ${data.agentName},</h2>
          <p style="font-size: 16px;">This is a reminder that you have <strong>${leadCount}</strong> site visit(s) / lead(s) to follow up on today.</p>
          <ul style="list-style-type: none; padding-left: 0;">
            ${leadListHtml}
          </ul>
          <p style="color: #777; font-size: 12px;">This is an automated message. Please do not reply directly to this email.</p>
        </div>
      `;

      await sendEmail({
        to: agentEmail,
        subject: `📋 Daily Follow-up Reminder: ${leadCount} Lead(s) Today`,
        html,
      });
    }
  } catch (error) {
    console.error(`❌ Error in lead follow-up cron job: ${error.message}`);
  }
};

/*
 * Initializes all cron jobs for the application.
 */
export const initCronJobs = () => {
  // Scheduled to run every morning at 8:00 AM (0 8 * * *)
  cron.schedule('0 8 * * *', async () => {
    await checkAndSendFollowUpReminders();
  });
  console.log('✅ Cron scheduler initialized successfully.');
};
