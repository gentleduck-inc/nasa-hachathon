import { db } from './db'
import {
  dailyMetrics,
  maintenanceRecords,
  processingModules,
  processingRecipes,
  processingRuns,
  productInventory,
  resourceUsage,
  systemAlerts,
  users,
  wasteInventory,
} from './tables'
import type {
  NewDailyMetric,
  NewMaintenanceRecord,
  NewProcessingModule,
  NewProcessingRecipe,
  NewProcessingRun,
  NewProductInventory,
  NewResourceUsage,
  NewSystemAlert,
  NewUser,
  NewWasteInventory,
} from './types'

// ========== USERS ==========
const userData: NewUser[] = [
  {
    email: 'commander.martinez@marsbase.space',
    first_name: 'Elena',
    id: '01234567-89ab-cdef-0123-456789abcdef',
    is_active: true,
    last_name: 'Martinez',
    password_hash: '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewMfKEfQnMCgxBJ2',
    settings: {
      dashboard: { default_view: 'operations' },
      notifications: { alerts: true, email: true },
      preferences: { timezone: 'UTC-8' },
    },
    username: 'commander.martinez',
  },
  {
    email: 'engineer.chen@marsbase.space',
    first_name: 'David',
    id: '11234567-89ab-cdef-0123-456789abcdef',
    is_active: true,
    last_name: 'Chen',
    password_hash: '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewMfKEfQnMCgxBJ2',
    settings: {
      dashboard: { default_view: 'maintenance' },
      notifications: { alerts: true, email: true },
      preferences: { timezone: 'UTC-8' },
    },
    username: 'engineer.chen',
  },
  {
    email: 'scientist.kim@marsbase.space',
    first_name: 'Dr. Sarah',
    id: '21234567-89ab-cdef-0123-456789abcdef',
    is_active: true,
    last_name: 'Kim',
    password_hash: '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewMfKEfQnMCgxBJ2',
    settings: {
      dashboard: { default_view: 'research' },
      notifications: { alerts: false, email: true },
      preferences: { timezone: 'UTC-8' },
    },
    username: 'scientist.kim',
  },
  {
    email: 'operator.singh@marsbase.space',
    first_name: 'Raj',
    id: '31234567-89ab-cdef-0123-456789abcdef',
    is_active: true,
    last_name: 'Singh',
    password_hash: '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewMfKEfQnMCgxBJ2',
    settings: {
      dashboard: { default_view: 'processing' },
      notifications: { alerts: true, email: false },
      preferences: { timezone: 'UTC-8' },
    },
    username: 'operator.singh',
  },
]

// ========== WASTE INVENTORY ==========
const wasteData: NewWasteInventory[] = [
  {
    contamination_level: 0.15,
    date_collected: new Date('2024-12-15T08:30:00Z'),
    id: '40000000-89ab-cdef-0123-456789abcdef',
    location: 'Storage Bay A-1',
    properties: {
      color: 'clear',
      material_composition: ['HDPE', 'LDPE'],
      source: 'crew_meals',
      thickness_mm: 0.5,
    },
    quality_grade: 'standard',
    quantity_kg: '45.5',
    waste_type: 'food_packaging',
  },
  {
    contamination_level: 0.05,
    date_collected: new Date('2024-12-14T14:20:00Z'),
    id: '41000000-89ab-cdef-0123-456789abcdef',
    location: 'Storage Bay A-2',
    properties: {
      alloy: '6061-T6',
      material_type: 'aluminum',
      source: 'equipment_casings',
      thickness_mm: 2.0,
    },
    quality_grade: 'pristine',
    quantity_kg: '23.8',
    waste_type: 'metal_components',
  },
  {
    contamination_level: 0.25,
    date_collected: new Date('2024-12-13T11:45:00Z'),
    id: '42000000-89ab-cdef-0123-456789abcdef',
    location: 'Storage Bay B-1',
    properties: {
      color: 'blue',
      material_type: 'PET',
      source: 'water_containers',
      volume_liters: 2.0,
    },
    quality_grade: 'standard',
    quantity_kg: '67.2',
    waste_type: 'plastic_containers',
  },
  {
    contamination_level: 0.4,
    date_collected: new Date('2024-12-12T16:10:00Z'),
    id: '43000000-89ab-cdef-0123-456789abcdef',
    location: 'Storage Bay B-2',
    properties: {
      components: ['circuit_boards', 'wiring', 'plastics'],
      hazardous_materials: ['lead', 'mercury'],
      source: 'communication_equipment',
    },
    quality_grade: 'degraded',
    quantity_kg: '12.3',
    waste_type: 'electronic_waste',
  },
  {
    contamination_level: 0.1,
    date_collected: new Date('2024-12-16T09:15:00Z'),
    expiry_date: new Date('2024-12-23T00:00:00Z'),
    id: '44000000-89ab-cdef-0123-456789abcdef',
    location: 'Storage Bay C-1',
    properties: {
      material_type: 'food_scraps',
      moisture_content: 0.75,
      source: 'crew_kitchen',
    },
    quality_grade: 'standard',
    quantity_kg: '8.7',
    waste_type: 'organic_waste',
  },
  {
    contamination_level: 0.2,
    date_collected: new Date('2024-12-11T13:30:00Z'),
    id: '45000000-89ab-cdef-0123-456789abcdef',
    location: 'Storage Bay C-2',
    properties: {
      density_kg_m3: 45,
      material_type: 'polyurethane',
      source: 'habitat_insulation',
      thickness_mm: 50,
    },
    quality_grade: 'standard',
    quantity_kg: '34.1',
    waste_type: 'foam_insulation',
  },
  {
    contamination_level: 0.05,
    date_collected: new Date('2024-12-10T10:00:00Z'),
    id: '46000000-89ab-cdef-0123-456789abcdef',
    location: 'Storage Bay D-1',
    properties: {
      material_type: 'corrugated_cardboard',
      source: 'packaging_materials',
      thickness_mm: 3.0,
    },
    quality_grade: 'pristine',
    quantity_kg: '15.6',
    waste_type: 'paper_cardboard',
  },
  {
    contamination_level: 0.3,
    date_collected: new Date('2024-12-09T15:45:00Z'),
    id: '47000000-89ab-cdef-0123-456789abcdef',
    location: 'Storage Bay D-2',
    properties: {
      color: 'white',
      condition: 'worn',
      material_type: 'cotton_polyester_blend',
      source: 'crew_uniforms',
    },
    quality_grade: 'standard',
    quantity_kg: '28.9',
    waste_type: 'clothing_fabric',
  },
]

// ========== PROCESSING MODULES ==========
const moduleData: NewProcessingModule[] = [
  {
    capabilities: {
      max_particle_size_mm: 5.0,
      supported_materials: ['food_packaging', 'plastic_containers', 'paper_cardboard'],
      temperature_range_c: [-20, 80],
    },
    efficiency_rating: 0.92,
    id: '50000000-89ab-cdef-0123-456789abcdef',
    maintenance_hours_remaining: 850,
    module_type: 'shredder',
    name: 'Mars Shredder Alpha',
    power_consumption_kw: '18.5',
    status: 'active',
    throughput_kg_per_hour: '45.0',
  },
  {
    capabilities: {
      max_temperature_c: 1200,
      melting_capacity_kg: 50.0,
      supported_materials: ['metal_components'],
    },
    efficiency_rating: 0.88,
    id: '51000000-89ab-cdef-0123-456789abcdef',
    maintenance_hours_remaining: 1200,
    module_type: 'furnace',
    name: 'Metal Forge Beta',
    power_consumption_kw: '35.2',
    status: 'active',
    throughput_kg_per_hour: '25.0',
  },
  {
    capabilities: {
      processing_time_hours: 72,
      supported_materials: ['organic_waste'],
      temperature_range_c: [35, 65],
    },
    efficiency_rating: 0.85,
    id: '52000000-89ab-cdef-0123-456789abcdef',
    maintenance_hours_remaining: 200,
    module_type: 'composter',
    name: 'Bio-Processor Gamma',
    power_consumption_kw: '8.7',
    status: 'maintenance',
    throughput_kg_per_hour: '15.0',
  },
  {
    capabilities: {
      color_removal: true,
      fiber_length_mm: 15.0,
      supported_materials: ['clothing_fabric'],
    },
    efficiency_rating: 0.78,
    id: '53000000-89ab-cdef-0123-456789abcdef',
    maintenance_hours_remaining: 600,
    module_type: 'textile_processor',
    name: 'Fabric Recycler Delta',
    power_consumption_kw: '12.3',
    status: 'active',
    throughput_kg_per_hour: '12.0',
  },
  {
    capabilities: {
      print_volume_cm3: 30000,
      resolution_mm: 0.1,
      supported_materials: ['plastic_containers', 'foam_insulation'],
    },
    efficiency_rating: 0.95,
    id: '54000000-89ab-cdef-0123-456789abcdef',
    maintenance_hours_remaining: 1500,
    module_type: 'printer',
    name: '3D Printer Epsilon',
    power_consumption_kw: '15.8',
    status: 'active',
    throughput_kg_per_hour: '8.0',
  },
]

// ========== PROCESSING RECIPES ==========
const recipeData: NewProcessingRecipe[] = [
  {
    created_by: '11234567-89ab-cdef-0123-456789abcdef',
    description: 'Convert plastic waste into storage containers for habitat organization',
    energy_required_kwh: '12.5',
    id: '60000000-89ab-cdef-0123-456789abcdef',
    input_materials: {
      food_packaging: 8.0,
      plastic_containers: 5.0,
    },
    is_active: true,
    name: 'Storage Container Production',
    output_products: {
      storage_container: 10.0,
    },
    process_steps: [
      { action: 'shred', duration_minutes: 30, step: 1, temperature_c: 25 },
      { action: 'clean', duration_minutes: 15, step: 2, temperature_c: 60 },
      { action: 'melt', duration_minutes: 45, step: 3, temperature_c: 180 },
      { action: 'print', duration_minutes: 30, step: 4, temperature_c: 200 },
    ],
    processing_time_minutes: 120,
    quality_score: 0.88,
    required_modules: ['shredder', 'printer'],
    yield_percentage: 0.85,
  },
  {
    created_by: '11234567-89ab-cdef-0123-456789abcdef',
    description: 'Create aluminum structural beams for habitat construction',
    energy_required_kwh: '28.0',
    id: '61000000-89ab-cdef-0123-456789abcdef',
    input_materials: {
      metal_components: 15.0,
    },
    is_active: true,
    name: 'Structural Beam Manufacturing',
    output_products: {
      structural_beam: 12.0,
    },
    process_steps: [
      { action: 'clean', duration_minutes: 20, step: 1, temperature_c: 25 },
      { action: 'melt', duration_minutes: 90, step: 2, temperature_c: 660 },
      { action: 'cast', duration_minutes: 45, step: 3, temperature_c: 650 },
      { action: 'cool', duration_minutes: 25, step: 4, temperature_c: 25 },
    ],
    processing_time_minutes: 180,
    quality_score: 0.95,
    required_modules: ['furnace'],
    yield_percentage: 0.92,
  },
  {
    created_by: '21234567-89ab-cdef-0123-456789abcdef',
    description: 'Transform foam waste into new insulation panels',
    energy_required_kwh: '8.5',
    id: '62000000-89ab-cdef-0123-456789abcdef',
    input_materials: {
      foam_insulation: 12.0,
    },
    is_active: true,
    name: 'Insulation Panel Creation',
    output_products: {
      insulation_panel: 8.0,
    },
    process_steps: [
      { action: 'shred', duration_minutes: 20, step: 1, temperature_c: 25 },
      { action: 'process', duration_minutes: 40, step: 2, temperature_c: 120 },
      { action: 'form', duration_minutes: 30, step: 3, temperature_c: 100 },
    ],
    processing_time_minutes: 90,
    quality_score: 0.82,
    required_modules: ['shredder', 'printer'],
    yield_percentage: 0.8,
  },
  {
    created_by: '21234567-89ab-cdef-0123-456789abcdef',
    description: 'Convert organic waste into nutrient-rich compost for hydroponics',
    energy_required_kwh: '3.2',
    id: '63000000-89ab-cdef-0123-456789abcdef',
    input_materials: {
      organic_waste: 6.0,
    },
    is_active: true,
    name: 'Compost Production',
    output_products: {
      compost: 4.2,
    },
    process_steps: [
      { action: 'shred', duration_minutes: 30, step: 1, temperature_c: 25 },
      { action: 'compost', duration_minutes: 4200, step: 2, temperature_c: 55 },
      { action: 'cure', duration_minutes: 90, step: 3, temperature_c: 25 },
    ],
    processing_time_minutes: 4320, // 3 days
    quality_score: 0.9,
    required_modules: ['composter'],
    yield_percentage: 0.7,
  },
]

// ========== PROCESSING RUNS ==========
const runData: NewProcessingRun[] = [
  {
    actual_outputs: {
      storage_container: 9.5,
    },
    completed_at: new Date('2024-12-16T10:00:00Z'),
    created_by: '31234567-89ab-cdef-0123-456789abcdef',
    energy_consumed_kwh: '12.3',
    estimated_outputs: {
      storage_container: 10.0,
    },
    id: '70000000-89ab-cdef-0123-456789abcdef',
    input_quantities: {
      food_packaging: 8.0,
      plastic_containers: 5.0,
    },
    module_id: '50000000-89ab-cdef-0123-456789abcdef',
    name: 'Daily Container Production',
    operator_notes: 'Production completed successfully. Quality within acceptable parameters.',
    progress_percent: 100,
    quality_check_passed: true,
    recipe_id: '60000000-89ab-cdef-0123-456789abcdef',
    started_at: new Date('2024-12-16T08:00:00Z'),
    status: 'completed',
  },
  {
    created_by: '11234567-89ab-cdef-0123-456789abcdef',
    energy_consumed_kwh: '18.2',
    estimated_outputs: {
      structural_beam: 12.0,
    },
    id: '71000000-89ab-cdef-0123-456789abcdef',
    input_quantities: {
      metal_components: 15.0,
    },
    module_id: '51000000-89ab-cdef-0123-456789abcdef',
    name: 'Structural Beam Batch #1',
    operator_notes: 'Melting phase complete, proceeding to casting.',
    progress_percent: 65,
    recipe_id: '61000000-89ab-cdef-0123-456789abcdef',
    started_at: new Date('2024-12-16T14:00:00Z'),
    status: 'running',
  },
  {
    created_by: '21234567-89ab-cdef-0123-456789abcdef',
    energy_consumed_kwh: '1.4',
    estimated_outputs: {
      compost: 4.2,
    },
    id: '72000000-89ab-cdef-0123-456789abcdef',
    input_quantities: {
      organic_waste: 6.0,
    },
    module_id: '52000000-89ab-cdef-0123-456789abcdef',
    name: 'Compost Production Cycle',
    operator_notes: 'Composting process active, temperature stable at 55°C.',
    progress_percent: 45,
    recipe_id: '63000000-89ab-cdef-0123-456789abcdef',
    started_at: new Date('2024-12-14T09:00:00Z'),
    status: 'running',
  },
]

// ========== PRODUCT INVENTORY ==========
const productData: NewProductInventory[] = [
  {
    id: '80000000-89ab-cdef-0123-456789abcdef',
    is_available: true,
    location: 'Storage Room 1A',
    product_type: 'storage_container',
    production_run_id: '70000000-89ab-cdef-0123-456789abcdef',
    properties: {
      color: 'white',
      dimensions: { height_cm: 15, length_cm: 30, width_cm: 20 },
      durability_rating: 'high',
      material: 'recycled_plastic',
    },
    quality_score: 0.88,
    quantity: 15,
    reserved_quantity: 3,
    total_mass_kg: '12.0',
    unit_mass_kg: '0.8',
  },
  {
    id: '81000000-89ab-cdef-0123-456789abcdef',
    is_available: true,
    location: 'Construction Yard',
    product_type: 'structural_beam',
    properties: {
      height_cm: 5,
      length_m: 2.0,
      load_capacity_kg: 500,
      material: 'aluminum_6061',
      width_cm: 10,
    },
    quality_score: 0.95,
    quantity: 8,
    reserved_quantity: 0,
    total_mass_kg: '20.0',
    unit_mass_kg: '2.5',
  },
  {
    id: '82000000-89ab-cdef-0123-456789abcdef',
    is_available: true,
    location: 'Insulation Storage',
    product_type: 'insulation_panel',
    properties: {
      dimensions: { length_cm: 100, thickness_cm: 5, width_cm: 50 },
      fire_rating: 'class_a',
      material: 'recycled_foam',
      r_value: 3.5,
    },
    quality_score: 0.82,
    quantity: 12,
    reserved_quantity: 4,
    total_mass_kg: '14.4',
    unit_mass_kg: '1.2',
  },
  {
    id: '83000000-89ab-cdef-0123-456789abcdef',
    is_available: true,
    location: 'Life Support Storage',
    product_type: 'filter_component',
    properties: {
      efficiency: 0.999,
      filter_type: 'hepa',
      lifespan_hours: 2000,
      material: 'recycled_fabric',
    },
    quality_score: 0.9,
    quantity: 6,
    reserved_quantity: 2,
    total_mass_kg: '1.8',
    unit_mass_kg: '0.3',
  },
]

// ========== RESOURCE USAGE ==========
const resourceData: NewResourceUsage[] = [
  {
    cost_estimate: '2.46',
    id: '90000000-89ab-cdef-0123-456789abcdef',
    module_id: '50000000-89ab-cdef-0123-456789abcdef',
    processing_run_id: '70000000-89ab-cdef-0123-456789abcdef',
    quantity_used: '12.3',
    resource_type: 'power',
    unit: 'kwh',
    usage_date: new Date('2024-12-16T08:00:00Z'),
  },
  {
    cost_estimate: '3.64',
    id: '91000000-89ab-cdef-0123-456789abcdef',
    module_id: '51000000-89ab-cdef-0123-456789abcdef',
    processing_run_id: '71000000-89ab-cdef-0123-456789abcdef',
    quantity_used: '18.2',
    resource_type: 'power',
    unit: 'kwh',
    usage_date: new Date('2024-12-16T14:00:00Z'),
  },
  {
    cost_estimate: '50.00',
    id: '92000000-89ab-cdef-0123-456789abcdef',
    processing_run_id: '70000000-89ab-cdef-0123-456789abcdef',
    quantity_used: '2.0',
    resource_type: 'crew_time',
    unit: 'hours',
    usage_date: new Date('2024-12-16T08:00:00Z'),
  },
  {
    cost_estimate: '1.55',
    id: '93000000-89ab-cdef-0123-456789abcdef',
    module_id: '50000000-89ab-cdef-0123-456789abcdef',
    processing_run_id: '70000000-89ab-cdef-0123-456789abcdef',
    quantity_used: '15.5',
    resource_type: 'water',
    unit: 'liters',
    usage_date: new Date('2024-12-16T08:00:00Z'),
  },
]

// ========== SYSTEM ALERTS ==========
const alertData: NewSystemAlert[] = [
  {
    alert_type: 'maintenance',
    created_at: new Date('2024-12-16T10:30:00Z'),
    entity_id: '50000000-89ab-cdef-0123-456789abcdef',
    entity_type: 'module',
    id: 'a0000000-89ab-cdef-0123-456789abcdef',
    is_resolved: false,
    message: 'Mars Shredder Alpha requires scheduled maintenance. Efficiency has dropped to 85%.',
    severity: 'warning',
    title: 'Module Maintenance Required',
  },
  {
    alert_type: 'inventory',
    created_at: new Date('2024-12-16T11:15:00Z'),
    entity_id: '40000000-89ab-cdef-0123-456789abcdef',
    entity_type: 'waste_inventory',
    id: 'a1000000-89ab-cdef-0123-456789abcdef',
    is_resolved: false,
    message: 'Food packaging waste inventory below 20kg threshold. Consider increasing collection.',
    severity: 'info',
    title: 'Low Waste Inventory',
  },
  {
    alert_type: 'notification',
    entity_id: '70000000-89ab-cdef-0123-456789abcdef',
    entity_type: 'processing_run',
    id: 'a2000000-89ab-cdef-0123-456789abcdef',
    is_resolved: true,
    message: 'Daily Container Production run completed successfully. 9.5 storage containers produced.',
    resolution_notes: 'Run completed within expected parameters.',
    resolved_at: new Date('2024-12-16T10:05:00Z'),
    resolved_by: '31234567-89ab-cdef-0123-456789abcdef',
    severity: 'info',
    title: 'Processing Run Completed',
  },
]

// ========== MAINTENANCE RECORDS ==========
const maintenanceData: NewMaintenanceRecord[] = [
  {
    cost_estimate: '150.00',
    description: 'Routine blade sharpening and lubrication',
    duration_hours: '4.0',
    id: 'b0000000-89ab-cdef-0123-456789abcdef',
    maintenance_type: 'preventive',
    module_id: '50000000-89ab-cdef-0123-456789abcdef',
    performed_by: '11234567-89ab-cdef-0123-456789abcdef',
    scheduled_date: new Date('2024-12-20T08:00:00Z'),
    status: 'scheduled',
  },
  {
    cost_estimate: '300.00',
    description: 'Replace worn heating elements and calibrate temperature sensors',
    duration_hours: '6.0',
    efficiency_after: 0.85,
    efficiency_before: 0.75,
    id: 'b1000000-89ab-cdef-0123-456789abcdef',
    maintenance_type: 'corrective',
    module_id: '52000000-89ab-cdef-0123-456789abcdef',
    notes: 'Heating elements were severely corroded. Temperature calibration improved efficiency significantly.',
    parts_replaced: ['heating_element', 'temperature_sensor'],
    performed_by: '11234567-89ab-cdef-0123-456789abcdef',
    scheduled_date: new Date('2024-12-17T14:00:00Z'),
    status: 'in_progress',
  },
]

// ========== DAILY METRICS ==========
const metricsData: NewDailyMetric[] = [
  {
    energy_consumed_kwh: '30.5',
    id: 'c0000000-89ab-cdef-0123-456789abcdef',
    metric_date: new Date('2024-12-16T00:00:00Z'),
    module_uptime_percent: 0.92,
    processing_efficiency: 0.87,
    products_by_type: {
      storage_container: 9.5,
      structural_beam: 8.0,
    },
    products_created_count: 3,
    quality_score_average: 0.89,
    waste_processed_kg: '45.5',
    waste_types_processed: {
      food_packaging: 8.0,
      metal_components: 15.0,
      plastic_containers: 5.0,
    },
  },
  {
    energy_consumed_kwh: '11.7',
    id: 'c1000000-89ab-cdef-0123-456789abcdef',
    metric_date: new Date('2024-12-15T00:00:00Z'),
    module_uptime_percent: 0.88,
    processing_efficiency: 0.82,
    products_by_type: {
      compost: 4.2,
      insulation_panel: 8.0,
    },
    products_created_count: 2,
    quality_score_average: 0.86,
    waste_processed_kg: '38.2',
    waste_types_processed: {
      foam_insulation: 12.0,
      organic_waste: 6.0,
      paper_cardboard: 15.6,
    },
  },
]

// ========== MAIN SEEDING FUNCTION ==========
export async function seed() {
  console.log('🌱 Starting Mars Waste Management System database seeding...')

  try {
    // Clear existing data in dependency order
    console.log('🧹 Clearing existing data...')
    await db.delete(dailyMetrics)
    await db.delete(maintenanceRecords)
    await db.delete(resourceUsage)
    await db.delete(systemAlerts)
    await db.delete(productInventory)
    await db.delete(processingRuns)
    await db.delete(processingRecipes)
    await db.delete(processingModules)
    await db.delete(wasteInventory)
    await db.delete(users)

    // Insert data in dependency order
    console.log('👥 Inserting users...')
    await db.insert(users).values(userData)
    console.log(`✅ Inserted ${userData.length} users`)

    console.log('♻️ Inserting waste inventory...')
    await db.insert(wasteInventory).values(wasteData)
    console.log(`✅ Inserted ${wasteData.length} waste items`)

    console.log('🏭 Inserting processing modules...')
    await db.insert(processingModules).values(moduleData)
    console.log(`✅ Inserted ${moduleData.length} processing modules`)

    console.log('📋 Inserting processing recipes...')
    await db.insert(processingRecipes).values(recipeData)
    console.log(`✅ Inserted ${recipeData.length} processing recipes`)

    console.log('⚙️ Inserting processing runs...')
    await db.insert(processingRuns).values(runData)
    console.log(`✅ Inserted ${runData.length} processing runs`)

    console.log('📦 Inserting product inventory...')
    await db.insert(productInventory).values(productData)
    console.log(`✅ Inserted ${productData.length} product items`)

    console.log('📊 Inserting resource usage...')
    await db.insert(resourceUsage).values(resourceData)
    console.log(`✅ Inserted ${resourceData.length} resource usage records`)

    console.log('🚨 Inserting system alerts...')
    await db.insert(systemAlerts).values(alertData)
    console.log(`✅ Inserted ${alertData.length} system alerts`)

    console.log('🔧 Inserting maintenance records...')
    await db.insert(maintenanceRecords).values(maintenanceData)
    console.log(`✅ Inserted ${maintenanceData.length} maintenance records`)

    console.log('📈 Inserting daily metrics...')
    await db.insert(dailyMetrics).values(metricsData)
    console.log(`✅ Inserted ${metricsData.length} daily metrics`)

    console.log('🎉 Database seeding completed successfully!')
    console.log('\n📊 Summary:')
    console.log(`  • ${userData.length} users`)
    console.log(`  • ${wasteData.length} waste inventory items`)
    console.log(`  • ${moduleData.length} processing modules`)
    console.log(`  • ${recipeData.length} processing recipes`)
    console.log(`  • ${runData.length} processing runs`)
    console.log(`  • ${productData.length} product inventory items`)
    console.log(`  • ${resourceData.length} resource usage records`)
    console.log(`  • ${alertData.length} system alerts`)
    console.log(`  • ${maintenanceData.length} maintenance records`)
    console.log(`  • ${metricsData.length} daily metrics`)
  } catch (error) {
    console.error('❌ Database seeding failed:', error)
    throw error
  }
}

// Export data arrays for testing
export {
  userData,
  wasteData,
  moduleData,
  recipeData,
  runData,
  productData,
  resourceData,
  alertData,
  maintenanceData,
  metricsData,
}

// Run seeding if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seed()
}
