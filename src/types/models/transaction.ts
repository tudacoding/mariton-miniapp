export interface ITransaction {
	id: number;
	wallet: string;
	signature: string;
	nonce: string;
	isDone: boolean | 'pending';
	amount: string;
	createdAt: string;
	updatedAt: string;
}