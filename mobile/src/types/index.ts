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
	email: string;
}

export interface SendEmailResponse {
	email: string;
}

export interface UpdatePasswordRequest {
	email: string;
	password: string;
}

export interface UpdatePasswordResponse {
	userId: string;
}

export interface MeasureRequest {
	status?: string;
    from?: string;
    to?: string;
}

export interface MeasureResponse {
	measureId: string;
    value: number;
    dateCreation: string;        
	status: string;
    userId: string;
}

export interface AddMeasureRequest {
	value: number;
	email: string;
}	

export interface AddMeasureResponse {
	measureId: string;
	value: number;
	dateCreation: string;        
	status: string;
	userId: string;
}

export interface UpdateMeasureRequest {
	measureId: string;
	value: number;
	offsetDateTime: string;        
	email: string;
}