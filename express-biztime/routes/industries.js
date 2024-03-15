const express = require("express");
const router = express.Router();
const db = require("../db");
const ExpressError = require("../expressError");

router.get('/', async (req, res, next) => {
    try {
        const results = await db.query(`
            SELECT i.code AS industry_code, i.industry, 
                   JSON_AGG(JSON_BUILD_OBJECT('code', c.code, 'name', c.name)) AS companies
            FROM industries AS i
            LEFT JOIN company_industries AS ci ON i.code = ci.industry_code
            LEFT JOIN companies AS c ON ci.comp_code = c.code
            GROUP BY i.code, i.industry
        `);
        return res.json({ industries: results.rows });
    } catch (err) {
        return next(err);
    }
});



router.post('/', async (req, res, next) => {
    try {
        const { code, industry } = req.body;
        const result = await db.query(
            'INSERT INTO industries (code, industry) VALUES ($1, $2) RETURNING code, industry',
            [code, industry]
        );
        return res.status(201).json({ industry: result.rows[0] });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;