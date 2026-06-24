WITH ranked_active_tasks AS (
    SELECT
        "id",
        ROW_NUMBER() OVER (
            PARTITION BY "wordId", "category"
            ORDER BY "priority" DESC, "createdAt" ASC, "id" ASC
        ) AS row_num
    FROM "scrape_tasks"
    WHERE "status" IN ('PENDING', 'PROCESSING')
)
UPDATE "scrape_tasks" AS tasks
SET
    "status" = 'FAILED',
    "error" = CASE
        WHEN tasks."error" IS NULL OR tasks."error" = '' THEN 'Superseded during active-task dedup migration.'
        ELSE tasks."error" || ' | Superseded during active-task dedup migration.'
    END
FROM ranked_active_tasks AS ranked
WHERE tasks."id" = ranked."id"
  AND ranked.row_num > 1;

CREATE UNIQUE INDEX "scrape_tasks_active_pair_unique"
ON "scrape_tasks"("wordId", "category")
WHERE "status" IN ('PENDING', 'PROCESSING');
