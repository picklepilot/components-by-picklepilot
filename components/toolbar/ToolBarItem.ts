import type { DropdownItem } from '../dropdown-menu/DropdownItem'

export type ToolbarItem = {
    children?: DropdownItem[][]
    classes?: {
        button?: string
        buttonIcon?: string
        menuItems?: string
    }
    count?: number
    disabled?: boolean
    icon?: string
    label?: string
    onClick?: () => void
    position?: 'left' | 'right'
    statusColor?: string
    tooltip?: string
}

export type ToolbarItemGroup = {
    children: ToolbarItem[]
    position: 'left' | 'right'
}
