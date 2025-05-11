import { env } from '$env/dynamic/private';

export const EMAIL_CONFIG = {
	// SMTP Configuration for direct use with Nodemailer
	host: env.EMAIL_HOST,
	port: parseInt(env.EMAIL_PORT || '587', 10),
	auth: {
		user: env.EMAIL_USER,
		pass: env.EMAIL_PASS
	}
};
