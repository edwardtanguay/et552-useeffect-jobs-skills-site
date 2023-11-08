export interface IJob {
	id: number;
	title: string;
	company: string;
	url: string;
	description: string;
	skillList: string;
	publicationDate: string;
	isOpen: boolean;
}

export interface ISkill {
	id: number;
	idCode: string;
	name: string;
	url: string;
	description: string;
	isOpen: boolean;
}