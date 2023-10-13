import {object } from 'yup'

let schema = object({
    id: number(),
    firtname: string(),
    lastname: string()
});

export { schema }