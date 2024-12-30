export type PropertyType =
    | 'string'
    | 'number'
    | 'boolean'
    | 'string[]'
    | 'enum'
    | 'image'
    | 'date'

export type EnumOption = {
    label?: string
    value: string
}

export type PropertyConfig = {
    formatter?: (value: any) => any
    options?: EnumOption[]
    [key: string]: any
}

export type EditableProperty = {
    attribute: string
    config: PropertyConfig
    display: string
    helpText: string
    id: string | number
    order: number
    type: PropertyType
}
