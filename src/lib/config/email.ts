import { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS } from '$env/static/private';

export const EMAIL_CONFIG = {
	// SMTP Configuration for direct use with Nodemailer
	host: EMAIL_HOST,
	port: parseInt(EMAIL_PORT || '587', 10),
	auth: {
		user: EMAIL_USER,
		pass: EMAIL_PASS
	}
};
