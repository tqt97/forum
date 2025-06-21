export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                <span className="font-mono text-2xl font-bold">T</span>
            </div>
            <div className="text-md ml-1 grid flex-1 text-left">
                <span className="mb-0.5 truncate leading-tight font-semibold">Tech Talk</span>
            </div>
        </>
    );
}
