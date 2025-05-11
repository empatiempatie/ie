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
			const topic = formData.get('topic')?.toString();
			const message = formData.get('message')?.toString();

			// Validate required fields
			if (!name || !email || !topic || !message) {
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

			await transporter.verify(); // Verify connection before sending
			const mailOptions = {
				from: `"Contact Form" <${EMAIL_CONFIG.auth.user}>`,
				to: env.BUSINESS_EMAIL || EMAIL_CONFIG.auth.user,
				replyTo: email,
				subject: `Contact Form: ${topic}`,
				text: `Name: ${name}\nEmail: ${email}\nTopic: ${topic}\nMessage: ${message}`,
				html: `
					<h3>New Contact Form Submission</h3>
					<p><strong>Name:</strong> ${name}</p>
					<p><strong>Email:</strong> ${email}</p>
					<p><strong>Topic:</strong> ${topic}</p>
					<p><strong>Message:</strong></p>
					<p>${message.replace(/\n/g, '<br>')}</p>
				`
			};
			const info = await transporter.sendMail(mailOptions);

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
