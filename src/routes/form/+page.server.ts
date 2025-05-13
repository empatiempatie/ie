import { EMAIL_CONFIG } from '$lib/config/email';
import { createClient } from '$lib/prismicio';
import { env } from '$env/dynamic/private';
import { fail } from '@sveltejs/kit';
import nodemailer from 'nodemailer';

export async function load({ params, fetch, cookies }) {
	const client = createClient({ fetch, cookies });
	const page = await client.getSingle('form');

	return {
		page
	};
}

export const actions = {
	default: async ({ request }) => {
		try {
			// Parse form data
			const formData = await request.formData();
			const name = formData.get('name')?.toString();
			const email = formData.get('email')?.toString();
			const evidence = formData.get('evidence')?.toString();
			const message = formData.get('message')?.toString();

			// Validate required fields
			if (!name || !email || !evidence || !message) {
				return fail(400, {
					success: false,
					error: 'All fields are required'
				});
			}

			// Create transporter using our email config
			const transporter = nodemailer.createTransport({
				host: EMAIL_CONFIG.host,
				port: EMAIL_CONFIG.port,
				secure: false, // Use TLS
				auth: EMAIL_CONFIG.auth
			});

			// Send email to the business
			await transporter.verify();
			const mailOptions = {
				from: `"Contact Form" <${EMAIL_CONFIG.auth.user}>`,
				to: env.BUSINESS_EMAIL || EMAIL_CONFIG.auth.user,
				replyTo: email,
				subject: `Contact Form: ${evidence}`,
				text: `Name: ${name}\nEmail: ${email}\nEvidence: ${evidence}\nMessage: ${message}`,
				html: `
					<h3>New Contact Form Submission</h3>
					<p><strong>Name:</strong> ${name}</p>
					<p><strong>Email:</strong> ${email}</p>
					<p><strong>Evidence:</strong> ${evidence}</p>
					<p><strong>Message:</strong></p>
					<p>${message.replace(/\n/g, '<br>')}</p>
				`
			};
			await transporter.sendMail(mailOptions);

			// Send confirmation email to the user
			await transporter.verify();
			const userMailOptions = {
				from: `"i.e., Studio" <${EMAIL_CONFIG.auth.user}>`,
				to: email,
				subject: "We've received your message",
				text: `Hello ${name},\n\nThank you for reaching out! We've received your message about "${evidence}".\n\nWe'll get back to you as soon as possible.\n\nBest regards,\ni.e.,`,
				html: `
						<h3>Thank you for reaching out!</h3>
						<p>Hello ${name},</p>
						<p>We've received your message about <strong>"${evidence}"</strong>.</p>
						<p>We'll get back to you as soon as possible.</p>
						<p>Best regards,<br>The i.e.,</p>
				`
			};
			await transporter.sendMail(userMailOptions);

			return {
				success: true,
				message: 'Thank you for your message! We will get back to you soon.'
			};
		} catch (error) {
			console.error('Contact form error:', error);
			return fail(500, {
				success: false,
				error: 'Failed to send message. Please try again later.'
			});
		}
	}
};
