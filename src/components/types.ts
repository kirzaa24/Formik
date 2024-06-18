export interface IField {
	type: string;
	maxAttempts: number;
	typeDisabled: boolean;
	checkSign: boolean;
}

export interface IObligations {
	obligations: IField[];
}
