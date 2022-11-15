export type Pet = {
    id: number;
    name: string;
    species: string;
    isCute: boolean;
};

export type Pets = {
    pets: Pet[];
};

export type ProtoPets = {
    name: string;
    species: string;
    isCute: boolean;
};
