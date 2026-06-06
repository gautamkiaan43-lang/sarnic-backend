import { pool } from "./Config/dbConnect.js";

async function test() {
  try {
    const employeeId = 14; // Let's test with 14
    const [rows] = await pool.query(
      `
      SELECT
        aj.*,

        -- job
        j.id AS job_id,
        j.job_no,
        j.job_status,
        j.priority AS job_priority,
        j.pack_size,
        j.ean_barcode,
        j.project_id,
        j.pack_code,

        -- project
        p.id AS project_id,
        p.project_name,
        p.project_no,
        p.client_name,
        p.status AS project_status,
        p.priority AS project_priority,
        p.start_date,
        p.expected_completion_date,

        -- brand
        b.id AS brand_id,
        b.name AS brand_name,

        -- sub brand
        sb.id AS sub_brand_id,
        sb.name AS sub_brand_name,

        -- flavour
        f.id AS flavour_id,
        f.name AS flavour_name,

        -- pack type
        pt.id AS pack_type_id,
        pt.name AS pack_type_name,

        -- employee user (from assign_jobs)
        u.id AS employee_user_id,
        u.first_name AS employee_first_name,
        u.last_name AS employee_last_name,
        u.email AS employee_email,

        -- job assigned user (from jobs.assigned)
        ju.id AS job_assigned_user_id,
        ju.first_name AS job_assigned_first_name,
        ju.last_name AS job_assigned_last_name,
        ju.email AS job_assigned_email

      FROM jobs j

      -- assign_jobs (may or may not exist)
      LEFT JOIN assign_jobs aj
        ON JSON_CONTAINS(aj.job_ids, JSON_ARRAY(j.id))

      JOIN projects p
        ON j.project_id = p.id

      LEFT JOIN brand_names b
        ON j.brand_id = b.id

      LEFT JOIN sub_brands sb
        ON j.sub_brand_id = sb.id

      LEFT JOIN flavours f
        ON j.flavour_id = f.id

      LEFT JOIN pack_types pt
        ON j.pack_type_id = pt.id

      LEFT JOIN users u
        ON aj.employee_id = u.id

      LEFT JOIN users ju
        ON ju.id = j.assigned

      WHERE 
        (aj.employee_id = ? OR j.assigned = ?)
        AND (aj.id IS NULL OR aj.id IN (
          SELECT MAX(id) FROM assign_jobs GROUP BY project_id, job_ids
        ))

      ORDER BY 
        COALESCE(aj.created_at, j.created_at) DESC
      `,
      [employeeId, employeeId]
    );

    console.log("ROWS FOR EMPLOYEE 14:", rows);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

test();
