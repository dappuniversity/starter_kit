type RouteType = {
    path: string | Function,
    label: string,
    children?: RouteType[],
    isPrivate?: boolean,
}

export default RouteType;
