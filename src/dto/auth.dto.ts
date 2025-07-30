
export interface LocalSignupDTO {
	name: string;
	email: string;
	password: string;
	info?: string;
	userImgURL?: string;
}

export interface AppleSignupDTO {
	authcode: string;
}

export interface GoogleSignupDTO {
	accessToken: string;
}