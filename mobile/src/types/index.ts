export interface LoginRequest {
	email: string;
	password: string;
}

export interface LoginResponse {
	token: string;
	email: string;
}

export interface RegisterRequest {
	fullName: string;
	email: string;
	password: string;
}

export interface RegisterResponse {
	userId: string;
	fullName: string;
	email: string;
}

export interface SendEmailRequest {
	to: string;
}

export interface SendEmailResponse {
	email: string;
}

export interface UpdatePasswordRequest {
	email: string;
	newPassword: string;
}

export interface UpdatePasswordResponse {
	message: string;
}