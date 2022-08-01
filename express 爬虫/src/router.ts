import { Router, Request, Response } from "express";
import Crawler from "./Crawler";
import CodingImoocAnalyzer from "./CodingImoocAnalyzer";
const analyzer = CodingImoocAnalyzer.getInstance();
const router = Router()
router.get('/', (req: Request, res: Response) => {
    res.send('express')
})
router.get('/crawler', (req: Request, res: Response) => {
    const url = "https://coding.imooc.com/";
    new Crawler(url, analyzer)
    res.send('crawler success')
})
export default router