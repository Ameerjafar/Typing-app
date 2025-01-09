import { faker } from '@faker-js/faker'

export const wordGenerator = () => {
    return Array.from({ length: 100 }, () => faker.word.noun()); 
}
