const express = require("express");
const slugify = require("slugify");
const router = express.Router();
const db = require("../db");
const ExpressError = require("../expressError");

router.get('/', async (req, res, next) => {
    try {
        const results = await db.query(`SELECT * FROM companies`);
        return res.json({companies: results.rows});
    } catch (err) {
        return next(err);
    }
})

router.get('/:code', async(req, res, next) => {
    try {
        const { code } = req.params;
        const companyResults = await db.query('SELECT * FROM companies WHERE code = $1', [code])
        if (companyResults.rows.length === 0) {
            throw new ExpressError(`Can't find company with code of ${code}`, 404);
        }
        const industryResults = await db.query(`
            SELECT c.code, i.code
                FROM companies AS c
                    LEFT JOIN
                        company_industries AS ci
                    ON c.code = ci.comp_code
                    LEFT JOIN
                        industries as i
                    ON ci.industry_code = i.code
                WHERE c.code = $1
        `, [code])
        const company = companyResults.rows[0];
        company.tags = industryResults.rows.map(r => r.code);
        return res.send({ company: company});
    } catch (err) {
        return next(err);
    }
})

router.post('/', async (req, res, next) => {
    try {
        const { name, description } = req.body;
        let code = slugify(name, {lower: true});
        const results = await db.query('INSERT INTO companies (code, name, description) VALUES ($1, $2, $3) RETURNING code, name, description', [code, name, description]);
        return res.status(201).json({ company: results.rows[0]});
    } catch(err) {
        return next(err);
    }
})

router.put('/:code', async (req, res, next) => {
    try {
        const { code } = req.params;
        const {name, description } = req.body;
        const results = await db.query('UPDATE companies SET name=$1, description=$2 WHERE code =$3 RETURNING code, name, description', [name, description, code]);
        if (results.rows.length === 0) {
            throw new ExpressError(`Can't find company with code of ${code}`, 404);
        }
        return res.send({company: results.rows[0]});
    } catch(err) {
        return next(err);
    }
})

router.post('/:code/industries', async (req, res, next) => {
    try {
        const { code } = req.params; // Company code
        const { industryCode } = req.body; // Industry code

        const companyCheck = await db.query('SELECT * FROM companies WHERE code = $1', [code]);
        if (companyCheck.rows.length === 0) {
            throw new ExpressError(`Company with code '${code}' not found`, 404);
        }

        const industryCheck = await db.query('SELECT * FROM industries WHERE code = $1', [industryCode]);
        if (industryCheck.rows.length === 0) {
            throw new ExpressError(`Industry with code '${industryCode}' not found`, 404);
        }

        const result = await db.query(
            'INSERT INTO company_industries (comp_code, industry_code) VALUES ($1, $2) RETURNING comp_code, industry_code',
            [code, industryCode]
        );
        return res.status(201).json({ association: result.rows[0] });
    } catch (err) {
        return next(err);
    }
});


router.delete('/:code', async(req, res, next) => {
    try {
        const { code } = req.params;
        const results = await db.query('DELETE FROM companies WHERE code=$1 RETURNING code', [code])
        if (results.rows.length === 0) {
            throw new ExpressError(`Can't find company with code of ${code}`, 404);
        }
        return res.json({ "status": "deleted"});
    } catch (err) {
        return next(err);
    }
})

module.exports = router;