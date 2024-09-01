// types.d.ts

export interface HonoBindings {
	DATABASE_URL: string;
	SALT_ROUNDS: number;
	PRIVATE_KEY: string;
}

export interface HonoVariables {
	userId: string;
}

export interface EnvConfig {
	pvtKey: string;
	saltRounds: number;
}
