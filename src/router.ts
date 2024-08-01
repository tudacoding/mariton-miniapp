const pages = import.meta.glob("./pages/*.tsx", { eager: true });

const getRouterConfig = (pages: Record<string, any>) => {
    const routes = [];
    for (const path of Object.keys(pages)) {
        const fileName = path.match(/\.\/pages\/(.*)\.tsx$/)?.[1];
        if (!fileName) {
            continue;
        }

        const normalizedPathName = fileName.includes("$")
            ? fileName.replace("$", ":")
            : fileName.replace(/\/index/, "");
        const pathPage = pages[path] as any;
        routes.push({
            path: fileName === "index" ? "/" : `/${normalizedPathName.toLowerCase()}`,
            Element: pathPage?.default,
            loader: pathPage?.loader,
            action: pathPage?.action,
            ErrorBoundary: pathPage?.ErrorBoundary,
        });
    }
    return routes;
};
export const routes = getRouterConfig(pages);