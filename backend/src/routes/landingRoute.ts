import { Request, Response, Router } from 'express';
import fs from 'fs'

const landingRoute = Router();


landingRoute.get('/', (req: Request, res: Response) => {
    fs.readFile('./sampleData.json', 'utf-8', (err, data) => {
        if(err) {
            res.status(404).json({message: "we cannot get the paragraph"});
        }
        console.log(data);
        const paragraph =   JSON.parse(data).paragraphs
        const randomParagraph = paragraph[Math.floor(Math.random() * paragraph.length)]
        res.json({paragraph: randomParagraph})
    })
})


export default landingRoute;