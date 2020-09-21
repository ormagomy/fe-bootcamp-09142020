export type CalcToolHistory = {
    operation: string;
    value: number;
};

export type CalcToolState = {
    history: CalcToolHistory[];
    validationError?: string;
};

export type Stats = {
    add: number;
    subtract: number;
    multiply: number;
    divide: number;
};

export type CalcToolResults = { total: number; stats: Stats };
