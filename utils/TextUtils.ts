import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function m(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
