export interface NavLink {
    title: string,
    path: string,
    condition?: () => boolean,
    task?: () => void
}