
export interface StoreState {
    languageName: string;
    enthusiasmLevel: number;
}

export interface RootState {
    todos: StoreState;
    router?: any;
}