export interface NavLink {
    title: string,
    path: string,
    condition?: FunctionInterface
    task?: () => void
}

interface FunctionInterface {
    (): boolean;
}