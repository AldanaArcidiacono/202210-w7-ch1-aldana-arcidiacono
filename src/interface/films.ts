export type Film = {
    id: string;
    title: string;
    genre: string;
    isGood: boolean;
};

export type Films = {
    films: Film[];
};

export type ProtoFilms = {
    title?: string;
    genre?: string;
    isGood?: boolean;
};
