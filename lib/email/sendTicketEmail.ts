import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendTicketEmail({
  email,
  eventTitle,
  ticketCode,
  startDate,
  location
}: {
  email: string
  eventTitle: string
  ticketCode: string
  startDate: Date
  location: string
}) {

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: `Your Ticket for ${eventTitle}`,
    html: `
      <h2>Your Ticket is Confirmed 🎉</h2>

      <p><strong>Event:</strong> ${eventTitle}</p>
      <p><strong>Date:</strong> ${new Date(startDate).toLocaleString()}</p>
      <p><strong>Location:</strong> ${location}</p>

      <hr/>

      <h3>Ticket Code</h3>
      <p style="font-size:20px;font-weight:bold">${ticketCode}</p>

      <p>Please show this ticket at the event entrance.</p>

      <br/>

      <p>Thanks for using <b>Pirogram</b> 🚀</p>
    `
  })
}