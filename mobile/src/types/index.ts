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
