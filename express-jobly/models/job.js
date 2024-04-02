"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

/** Related functions for jobs. */

class Job {
  /** Create a job (from data), update db, return new job data.
   *
   * data should be { title, salary, equity, company_handle }
   *
   * Returns { id, title, salary, equity, company_handle }
   *
   * Throws BadRequestError if job is already in database.
   * */

  static async create({ title, salary, equity, company_handle }) {
    // A job with the same title is okay as long as it is at a different company
    const duplicateCheck = await db.query(
        `SELECT title
         FROM jobs
         WHERE title = $1 AND company_handle = $2`,
        [title, company_handle]);
      
      if (duplicateCheck.rows[0])
        throw new BadRequestError(`Duplicate job: ${title} at company: ${company_handle}`);      

    const result = await db.query(
          `INSERT INTO jobs
           (title, salary, equity, company_handle)
           VALUES ($1, $2, $3, $4)
           RETURNING id, title, salary, equity, company_handle AS "companyHandle"`,
        [
          title,
          salary,
          equity,
          company_handle
        ],
    );
    const job = result.rows[0];

    return job;
  }

  /** Find all jobs.
   *
   * Returns [{ id, title, salary, equity, company_handle }, ...]
   * */

  static async findAll() {
    const jobRes = await db.query(
          `SELECT id,
                  title,
                  salary,
                  equity,
                  company_handle AS "companyHandle"
           FROM jobs
           ORDER BY title`);
    return jobRes.rows;
  }

  /** Filter jobs by parameters in request query. User can provide title, minSalary, and hasEquity.
   *
   * Returns [{ id, title, salary, equity, company_handle }, ...]
   * */
  static async filterBy(params) {
    const { title, minSalary, hasEquity} = params;
    let query = `SELECT id,
                        title,
                        salary,
                        equity,
                        company_handle AS "companyHandle"
                 FROM jobs
                 WHERE 1=1`;
    const values = [];
    const filterQueries = [];
    let idx = 0;

    if (title) {
      idx++;
      values.push(`%${title}%`);
      filterQueries.push(`title ILIKE $${idx}`);
    }
    if (minSalary) {
      idx++;
      values.push(parseInt(minSalary));
      filterQueries.push(`salary >= $${idx}`);
    }
    if (hasEquity) {
      idx++;
      filterQueries.push(`equity > 0`);
    }
    if (idx > 0) {
      query += ` AND `;
      query += filterQueries.join(` AND `);
    }
    query += `;`;
    const jobRes = await db.query(query, values);
    return jobRes.rows;
  }

  /** Given a job id, return data about job.
   *
   * Returns { id, title, salary, equity, company_handle }
   *
   * Throws NotFoundError if not found.
   **/

  static async get(id) {
    const jobRes = await db.query(
          `SELECT id,
                  title,
                  salary,
                  equity,
                  company_handle AS "companyHandle"
           FROM jobs
           WHERE id = $1`,
        [id]);

    const job = jobRes.rows[0];

    if (!job) throw new NotFoundError(`No job: ${id}`);

    return job;
  }

  /** Update id data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain all the
   * fields; this only changes provided ones.
   *
   * Data can include: {title, salary, equity, company_handle}
   *
   * Returns {id, title, salary, equity, company_handle}
   *
   * Throws NotFoundError if not found.
   */

  static async update(id, data) {
    const { setCols, values } = sqlForPartialUpdate(
        data,
        {
          companyHandle: "company_handle"
        });
    const idIdx = values.length + 1;
    const querySql = `UPDATE jobs 
                      SET ${setCols} 
                      WHERE id = $${idIdx} 
                      RETURNING id, 
                                title, 
                                salary, 
                                equity, 
                                company_handle AS "companyHandle"`;
    const result = await db.query(querySql, [...values, id]);
    const job = result.rows[0];

    if (!job) throw new NotFoundError(`No job: ${id}`);

    return job;
  }

  /** Delete given job from database; returns undefined.
   *
   * Throws NotFoundError if job not found.
   **/

  static async remove(id) {
    const result = await db.query(
          `DELETE
           FROM jobs
           WHERE id = $1
           RETURNING id`,
        [id]);
    const job = result.rows[0];

    if (!job) throw new NotFoundError(`No job: ${id}`);
  }
}


module.exports = Job;
