import { faker } from '@faker-js/faker'

export const randomWord = Array.from({ length: 100}, () => faker.word.sample()); 