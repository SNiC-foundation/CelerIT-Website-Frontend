import validator from 'validator';

export const notEmptyString = (value: any) => typeof value !== 'string' || validator.isEmpty(value);

export const validDate = (value: any) => value === null || value === undefined || value.toString() === '';
