import { StateSchema } from 'app/store'

export const getIsOpen = (state: StateSchema) => state.authForm.isOpen
export const getIsRegister = (state: StateSchema) => state.authForm.isRegister
