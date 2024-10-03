function groupBy(array: any[], keyFunction: (item: any) => string) {
    return array.reduce((result, currentValue) => {
        const groupKey = keyFunction(currentValue)
        if (!result[groupKey]) {
            result[groupKey] = []
        }
        result[groupKey].push(currentValue)
        return result
    }, {})
}

export function groupColumns(columns: any[]) {
    return groupBy(columns, function (c: any) {
        return c.group || 'Default'
    })
}

export function ungroupColumns(columns: Record<string, any[]>) {
    return Object.values(columns).flat()
}
