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
    const grouped = groupBy(columns, function (c: any) {
        return c.group || 'Default'
    })

    return Object.entries(grouped).map(([group, columns]) => {
        return {
            group,
            text: group,
            levelName: 'group',
            children: columns,
        }
    })

    return groupBy(columns, function (c: any) {
        return c.group || 'Default'
    })
}

export function ungroupColumns(columns: any[]) {
    return columns
        .map((group: any) =>
            group.children.map((column: any) => ({
                ...column,
                group: group.group,
            })),
        )
        .flat()
    // return Object.values(columns).flat()
}
