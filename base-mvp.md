## 🗄️ Database Schema (MVP)

We don’t need 20 tables — just enough to store mission runs, materials, processes, and outputs.

**Tables:**

### `missions`

* `id` (UUID, PK)
* `name` (text)
* `created_at` (timestamp)

### `materials`

* `id` (UUID, PK)
* `mission_id` (FK → missions.id)
* `name` (text) — e.g. "Aluminum strut"
* `quantity_kg` (float)
* `form` (text) — e.g. "structural", "foam", "packaging"
* `created_at` (timestamp)

### `processes`

* `id` (UUID, PK)
* `mission_id` (FK → missions.id)
* `name` (text) — e.g. "Shred foam into insulation"
* `input_material_id` (FK → materials.id)
* `output_product` (text) — e.g. "Insulation Panel"
* `efficiency` (float, 0–1)
* `energy_kwh` (float) — cost to run
* `crew_hours` (float) — time cost
* `created_at` (timestamp)

### `results`

* `id` (UUID, PK)
* `mission_id` (FK → missions.id)
* `process_id` (FK → processes.id)
* `input_used_kg` (float)
* `output_produced_units` (float)
* `waste_leftover_kg` (float)
* `created_at` (timestamp)

---

## 🌐 API Routes (REST, MVP)

Base URL: `/api/v1`

### Missions

* `POST /missions`

  * Create new mission
  * Body: `{ "name": "Mars Renovation Test" }`
* `GET /missions/:id`

  * Fetch mission with materials + processes + results

### Materials

* `POST /missions/:id/materials`

  * Add materials to mission
  * Body: `[ { "name": "Aluminum Strut", "quantity_kg": 100, "form": "structural" } ]`
* `GET /missions/:id/materials`

  * List all materials for mission

### Processes

* `POST /missions/:id/processes`

  * Define a recycling process
  * Body: `{ "name": "Foam to Insulation", "input_material_id": "...", "output_product": "Insulation Panel", "efficiency": 0.85, "energy_kwh": 5, "crew_hours": 0.5 }`
* `GET /missions/:id/processes`

  * List all processes for mission

### Simulation

* `POST /missions/:id/run`

  * Runs the Rust simulation engine with mission materials + processes
  * Stores results in `results`
  * Returns JSON: `{ outputs: [...], sankeyData: {...} }`
* `GET /missions/:id/results`

  * Fetch all results (for Sankey, timeline, etc.)

---

## 🧩 Example Flow (Residence Renovations)

1. Create mission:

   ```http
   POST /missions
   { "name": "Residence Renovation Demo" }
   ```

2. Add materials:

   ```http
   POST /missions/123/materials
   [
     { "name": "Aluminum Strut", "quantity_kg": 200, "form": "structural" },
     { "name": "Foam Packaging", "quantity_kg": 50, "form": "foam" }
   ]
   ```

3. Define processes:

   ```http
   POST /missions/123/processes
   { "name": "Shred Foam → Insulation", "input_material_id": "foam-uuid", "output_product": "Insulation Panel", "efficiency": 0.9, "energy_kwh": 5, "crew_hours": 1 }
   ```

4. Run sim:

   ```http
   POST /missions/123/run
   → returns sankey data + outputs
   ```

---

⚡ This design is lightweight:

* DB is just **missions + materials + processes + results**.
* Routes are CRUD + “run simulation”.
* Simulation engine plugs in at `/run`.

o

    "@gentleduck/hooks": "workspace:*",
    "@gentleduck/lazy": "workspace:*",
    "@gentleduck/libs": "workspace:*",
    "@gentleduck/motion": "workspace:*",
    "@gentleduck/primitives": "workspace:*",
    "@gentleduck/state": "workspace:*",
    "@gentleduck/tsdown-config": "workspace:*",
    "@gentleduck/typescript-config": "workspace:*",
    "@gentleduck/variants": "workspace:*",
    "@gentleduck/vim": "workspace:*",
