import { db } from './db'
import {
  apiKeys,
  attachments,
  auditLogs,
  comments,
  missionCrew,
  missions,
  processingModules,
  processingRecipes,
  products,
  searchIndex,
  settings,
  simulationRuns,
  users,
  wasteMaterials,
} from './tables'
import type {
  NewApiKey,
  NewAttachment,
  NewAuditLog,
  NewComment,
  NewMission,
  NewMissionCrew,
  NewProcessingModule,
  NewProcessingRecipe,
  NewProduct,
  NewSearchIndex,
  NewSetting,
  NewSimulationRun,
  NewUser,
  NewWasteMaterial,
} from './types'

// Organizations
const orgData: NewOrganization[] = [
  {
    description: 'Leading space exploration agency focused on Mars colonization.',
    id: '01234567-89ab-cdef-0123-456789abcdef',
    name: 'NASA',
    settings: { default_mission_duration: 1095, waste_recycling_target: 95 },
    slug: 'nasa',
  },
  {
    description: 'Private aerospace company pioneering Mars transportation.',
    id: '11234567-89ab-cdef-0123-456789abcdef',
    name: 'SpaceX',
    settings: { default_mission_duration: 730, waste_recycling_target: 98 },
    slug: 'spacex',
  },
]

// Users
const userData: NewUser[] = [
  {
    email: 'scott.kelly@nasa.gov',
    first_name: 'Scott',
    id: '01111111-89ab-cdef-0123-456789abcdef',
    last_name: 'Kelly',
    organization_id: '01234567-89ab-cdef-0123-456789abcdef',
    password_hash: '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewMfKEfQnMCgxBJ2',
    username: 'commander.kelly',
  },
  {
    email: 'mark.watney@nasa.gov',
    first_name: 'Mark',
    id: '02222222-89ab-cdef-0123-456789abcdef',
    last_name: 'Watney',
    organization_id: '01234567-89ab-cdef-0123-456789abcdef',
    password_hash: '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewMfKEfQnMCgxBJ2',
    username: 'dr.watney',
  },
  {
    email: 'lisa.chen@spacex.com',
    first_name: 'Lisa',
    id: '04444444-89ab-cdef-0123-456789abcdef',
    last_name: 'Chen',
    organization_id: '11234567-89ab-cdef-0123-456789abcdef',
    password_hash: '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewMfKEfQnMCgxBJ2',
    username: 'captain.chen',
  },
]

// User Roles
const roleData: NewUserRole[] = [
  {
    granted_by: '01111111-89ab-cdef-0123-456789abcdef',
    role: 'mission_commander',
    user_id: '01111111-89ab-cdef-0123-456789abcdef',
  },
  {
    granted_by: '01111111-89ab-cdef-0123-456789abcdef',
    role: 'scientist',
    user_id: '02222222-89ab-cdef-0123-456789abcdef',
  },
  {
    granted_by: '04444444-89ab-cdef-0123-456789abcdef',
    role: 'mission_commander',
    user_id: '04444444-89ab-cdef-0123-456789abcdef',
  },
]

// API Keys
const apiKeyData: NewApiKey[] = [
  {
    expires_at: new Date('2026-03-15T00:00:00Z'),
    key_hash: '$2b$12$8K1p3D0E/c.c.KOwO5R5w.bQf3JRKjxF8w1QsqJ4wDWlaxg7zOEG2',
    name: 'Mission Control Dashboard',
    permissions: ['read:missions', 'write:simulation_runs'],
    user_id: '01111111-89ab-cdef-0123-456789abcdef',
  },
  {
    expires_at: new Date('2026-06-30T00:00:00Z'),
    key_hash: '$2b$12$9L2q4E1F/d.d.LPxP6S6x.cRg4KSLkyG9x2RtrK5xEXmbyh8aOFH3',
    name: 'Research Station API',
    permissions: ['read:waste_materials', 'write:processing_recipes'],
    user_id: '02222222-89ab-cdef-0123-456789abcdef',
  },
]

// Missions
const missionData: NewMission[] = [
  {
    crew_size: 6,
    description: 'First Mars research station focused on sustainable living.',
    id: '10000000-89ab-cdef-0123-456789abcdef',
    landing_date: new Date('2025-08-22T14:30:00Z'),
    name: 'Artemis Mars Base',
    organization_id: '01234567-89ab-cdef-0123-456789abcdef',
    status: 'active',
  },
  {
    crew_size: 8,
    description: 'Mars colonization mission with recycling facilities.',
    id: '20000000-89ab-cdef-0123-456789abcdef',
    landing_date: new Date('2025-07-03T16:45:00Z'),
    name: 'Mars City Foundation',
    organization_id: '11234567-89ab-cdef-0123-456789abcdef',
    status: 'active',
  },
]

// Mission Crew
const crewData: NewMissionCrew[] = [
  {
    mission_id: '10000000-89ab-cdef-0123-456789abcdef',
    role: 'mission_commander',
    specialization: 'Mission Operations',
    user_id: '01111111-89ab-cdef-0123-456789abcdef',
  },
  {
    mission_id: '10000000-89ab-cdef-0123-456789abcdef',
    role: 'scientist',
    specialization: 'Botanical Engineering',
    user_id: '02222222-89ab-cdef-0123-456789abcdef',
  },
  {
    mission_id: '20000000-89ab-cdef-0123-456789abcdef',
    role: 'mission_commander',
    specialization: 'Colony Operations',
    user_id: '04444444-89ab-cdef-0123-456789abcdef',
  },
]

// Waste Materials
const wasteData: NewWasteMaterial[] = [
  {
    category: 'plastics',
    composition: { materials: ['HDPE', 'LDPE'], percentages: [60, 40] },
    density_kg_per_m3: '920.00',
    description: 'Plastic packaging from food supplies',
    id: '40000000-89ab-cdef-0123-456789abcdef',
    name: 'Food Packaging Waste',
    organization_id: '01234567-89ab-cdef-0123-456789abcdef',
    processing_difficulty: 2,
    recyclability_score: 0.85,
  },
  {
    category: 'metals',
    composition: { materials: ['Aluminum'], percentages: [100] },
    density_kg_per_m3: '2700.00',
    description: 'Used aluminum containers from crew meals',
    id: '41000000-89ab-cdef-0123-456789abcdef',
    name: 'Aluminum Containers',
    organization_id: '01234567-89ab-cdef-0123-456789abcdef',
    processing_difficulty: 2,
    recyclability_score: 0.95,
  },
]

// Processing Modules
const moduleData: NewProcessingModule[] = [
  {
    capabilities: { supported_materials: ['plastics'] },
    description: 'Plastic waste shredder and processor',
    efficiency_rating: 0.9,
    id: '50000000-89ab-cdef-0123-456789abcdef',
    module_type: 'plastic_processor',
    name: 'Plastic Shredder',
    organization_id: '01234567-89ab-cdef-0123-456789abcdef',
    power_consumption_kw: '12.30',
    status: 'active',
    throughput_kg_per_hour: '25.50',
  },
  {
    capabilities: { supported_materials: ['metals'] },
    description: 'Metal melting and reforming unit',
    efficiency_rating: 0.88,
    id: '51000000-89ab-cdef-0123-456789abcdef',
    module_type: 'metal_processor',
    name: 'Metal Furnace',
    organization_id: '01234567-89ab-cdef-0123-456789abcdef',
    power_consumption_kw: '45.20',
    status: 'active',
    throughput_kg_per_hour: '18.75',
  },
]

// Processing Recipes
const recipeData: NewProcessingRecipe[] = [
  {
    crew_time_minutes: 30,
    description: 'Convert plastic waste into storage containers',
    energy_required_kwh: '8.250',
    id: '60000000-89ab-cdef-0123-456789abcdef',
    inputs: {
      materials: [{ material_id: '40000000-89ab-cdef-0123-456789abcdef', quantity_kg: 5.0 }],
    },
    name: 'Plastic to Container Recipe',
    organization_id: '01234567-89ab-cdef-0123-456789abcdef',
    output_product_type: 'container',
    outputs: {
      primary: { mass_kg: 4.0, quantity: 2, type: 'container' },
    },
    process_steps: [
      { action: 'shred', duration_minutes: 20, step: 1, temperature: 25 },
      { action: 'melt_and_form', duration_minutes: 45, step: 2, temperature: 180 },
    ],
    processing_time_minutes: 65,
    quality_score: 0.85,
    yield_percentage: 0.8,
  },
  {
    crew_time_minutes: 45,
    description: 'Melt aluminum into construction bricks',
    energy_required_kwh: '25.500',
    id: '61000000-89ab-cdef-0123-456789abcdef',
    inputs: {
      materials: [{ material_id: '41000000-89ab-cdef-0123-456789abcdef', quantity_kg: 8.0 }],
    },
    name: 'Aluminum to Brick Recipe',
    organization_id: '01234567-89ab-cdef-0123-456789abcdef',
    output_product_type: 'brick',
    outputs: {
      primary: { mass_kg: 7.2, quantity: 6, type: 'brick' },
    },
    process_steps: [
      { action: 'melt', duration_minutes: 60, step: 1, temperature: 660 },
      { action: 'pour_and_cool', duration_minutes: 30, step: 2, temperature: 25 },
    ],
    processing_time_minutes: 90,
    quality_score: 0.92,
    yield_percentage: 0.9,
  },
]

// Simulation Runs
const simulationData: NewSimulationRun[] = [
  {
    completed_at: new Date('2025-09-18T10:00:00Z'),
    config: {
      energy_budget: 400,
      waste_inputs: { metals: 15.0, plastics: 20.0 },
    },
    created_by: '02222222-89ab-cdef-0123-456789abcdef',
    description: 'Weekly waste processing optimization',
    id: '70000000-89ab-cdef-0123-456789abcdef',
    mission_id: '10000000-89ab-cdef-0123-456789abcdef',
    name: 'Week 20 Optimization',
    progress_percent: 100,
    results: {
      products_created: 12,
      waste_recycled_percentage: 85.5,
    },
    run_type: 'waste_optimization',
    started_at: new Date('2025-09-18T09:00:00Z'),
    status: 'completed',
  },
  {
    config: {
      required_tools: ['containers', 'bricks'],
      time_limit_hours: 8,
    },
    created_by: '04444444-89ab-cdef-0123-456789abcdef',
    description: 'Emergency production simulation',
    id: '71000000-89ab-cdef-0123-456789abcdef',
    mission_id: '20000000-89ab-cdef-0123-456789abcdef',
    name: 'Emergency Production',
    progress_percent: 65,
    run_type: 'emergency_production',
    started_at: new Date('2025-09-20T08:00:00Z'),
    status: 'running',
  },
]

// Products
const productData: NewProduct[] = [
  {
    creation_date: new Date('2025-09-18T12:00:00Z'),
    description: 'Storage containers for habitat organization',
    id: '80000000-89ab-cdef-0123-456789abcdef',
    is_in_use: true,
    mass_kg: '8.000',
    mission_id: '10000000-89ab-cdef-0123-456789abcdef',
    name: 'Storage Container Set',
    product_type: 'container',
    quality_score: 0.85,
    recipe_id: '60000000-89ab-cdef-0123-456789abcdef',
    simulation_run_id: '70000000-89ab-cdef-0123-456789abcdef',
    source_materials: { primary: { mass_kg: 10.0, material: 'plastic_waste' } },
  },
  {
    creation_date: new Date('2025-09-18T14:00:00Z'),
    description: 'Construction bricks for habitat expansion',
    id: '81000000-89ab-cdef-0123-456789abcdef',
    is_in_use: false,
    mass_kg: '14.400',
    mission_id: '10000000-89ab-cdef-0123-456789abcdef',
    name: 'Aluminum Bricks',
    product_type: 'brick',
    quality_score: 0.92,
    recipe_id: '61000000-89ab-cdef-0123-456789abcdef',
    simulation_run_id: '70000000-89ab-cdef-0123-456789abcdef',
    source_materials: { primary: { mass_kg: 16.0, material: 'aluminum_containers' } },
  },
]

// Comments
const commentData: NewComment[] = [
  {
    author_id: '02222222-89ab-cdef-0123-456789abcdef',
    content: 'Optimization run completed successfully. 85.5% recycling rate achieved.',
    entity_id: '70000000-89ab-cdef-0123-456789abcdef',
    entity_type: 'simulation_run',
    id: '90000000-89ab-cdef-0123-456789abcdef',
  },
  {
    author_id: '01111111-89ab-cdef-0123-456789abcdef',
    content: 'Great work on the recycling efficiency. Approve for next quarter.',
    entity_id: '70000000-89ab-cdef-0123-456789abcdef',
    entity_type: 'simulation_run',
    id: '91000000-89ab-cdef-0123-456789abcdef',
    parent_comment_id: '90000000-89ab-cdef-0123-456789abcdef',
  },
]

// Attachments
const attachmentData: NewAttachment[] = [
  {
    checksum_sha256: '4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b',
    filename: 'waste_analysis_report.pdf',
    id: 'a0000000-89ab-cdef-0123-456789abcdef',
    is_public: false,
    mime_type: 'application/pdf',
    original_filename: 'waste_analysis_report.pdf',
    size_bytes: 2048576,
    storage_path: '/storage/documents/waste_analysis_report.pdf',
    uploaded_by: '02222222-89ab-cdef-0123-456789abcdef',
  },
]

// Audit Logs
const auditData: NewAuditLog[] = [
  {
    action: 'simulation_completed',
    changes: {
      results: { products_created: 12 },
      status: { from: 'running', to: 'completed' },
    },
    entity_id: '70000000-89ab-cdef-0123-456789abcdef',
    entity_type: 'simulation_run',
    id: 'b0000000-89ab-cdef-0123-456789abcdef',
    ip_address: '192.168.1.45',
    organization_id: '01234567-89ab-cdef-0123-456789abcdef',
    user_id: '02222222-89ab-cdef-0123-456789abcdef',
  },
  {
    action: 'product_created',

    changes: {
      mass_kg: 8.0,
      product_type: 'container',
    },
    entity_id: '80000000-89ab-cdef-0123-456789abcdef',
    entity_type: 'product',
    id: 'b1111111-89ab-cdef-0123-456789abcdef',
    ip_address: '192.168.1.45',
    organization_id: '01234567-89ab-cdef-0123-456789abcdef',
    user_id: '02222222-89ab-cdef-0123-456789abcdef',
  },
]

// Settings
const settingData: NewSetting[] = [
  {
    category: 'system',
    description: 'Maximum concurrent simulations',
    id: 'c0000000-89ab-cdef-0123-456789abcdef',
    is_system: true,
    key: 'max_concurrent_simulations',
    value: { limit: 5 },
  },
  {
    category: 'notifications',
    description: 'Simulation completion notifications',
    id: 'c1111111-89ab-cdef-0123-456789abcdef',
    is_system: false,
    key: 'simulation_notifications',
    user_id: '02222222-89ab-cdef-0123-456789abcdef',
    value: { on_completion: true, on_failure: true },
  },
]

// Search Index
const searchData: NewSearchIndex[] = [
  {
    content: 'First Mars research station focused on sustainable living and waste recycling.',
    entity_id: '10000000-89ab-cdef-0123-456789abcdef',
    entity_type: 'mission',
    id: 'd0000000-89ab-cdef-0123-456789abcdef',
    organization_id: '01234567-89ab-cdef-0123-456789abcdef',
    tags: ['mars', 'research', 'waste', 'recycling'],
    title: 'Artemis Mars Base',
  },
  {
    content: 'Plastic waste shredder and processing system.',
    entity_id: '50000000-89ab-cdef-0123-456789abcdef',
    entity_type: 'processing_module',
    id: 'd1111111-89ab-cdef-0123-456789abcdef',
    organization_id: '01234567-89ab-cdef-0123-456789abcdef',
    tags: ['plastic', 'processing', 'equipment'],
    title: 'Plastic Shredder',
  },
]

// Main seeding function
export async function seed() {
  console.log('🌱 Starting Mars Waste Management System database seeding...')

  try {
    // Clear existing data in dependency order
    console.log('🧹 Clearing existing data...')
    await db.delete(searchIndex)
    await db.delete(settings)
    await db.delete(auditLogs)
    await db.delete(attachments)
    await db.delete(comments)
    await db.delete(products)
    await db.delete(simulationRuns)
    await db.delete(processingRecipes)
    await db.delete(processingModules)
    await db.delete(wasteMaterials)
    await db.delete(missionCrew)
    await db.delete(missions)
    await db.delete(apiKeys)
    await db.delete(userRoles)
    await db.delete(users)
    await db.delete(organizations)

    // Insert data in dependency order
    console.log('📊 Inserting organizations...')
    await db.insert(organizations).values(orgData)
    console.log(`✅ Inserted ${orgData.length} organizations`)

    console.log('👥 Inserting users...')
    await db.insert(users).values(userData)
    console.log(`✅ Inserted ${userData.length} users`)

    console.log('🔐 Inserting user roles...')
    await db.insert(userRoles).values(roleData)
    console.log(`✅ Inserted ${roleData.length} user roles`)

    console.log('🔑 Inserting API keys...')
    await db.insert(apiKeys).values(apiKeyData)
    console.log(`✅ Inserted ${apiKeyData.length} API keys`)

    console.log('🚀 Inserting missions...')
    await db.insert(missions).values(missionData)
    console.log(`✅ Inserted ${missionData.length} missions`)

    console.log('👨 Inserting mission crew assignments...')
    await db.insert(missionCrew).values(crewData)
    console.log(`✅ Inserted ${crewData.length} crew assignments`)

    console.log('♻ Inserting waste materials...')
    await db.insert(wasteMaterials).values(wasteData)
    console.log(`✅ Inserted ${wasteData.length} waste materials`)

    console.log('🏭 Inserting processing modules...')
    await db.insert(processingModules).values(moduleData)
    console.log(`✅ Inserted ${moduleData.length} processing modules`)

    console.log('📋 Inserting processing recipes...')
    await db.insert(processingRecipes).values(recipeData)
    console.log(`✅ Inserted ${recipeData.length} processing recipes`)

    console.log('🧮 Inserting simulation runs...')
    await db.insert(simulationRuns).values(simulationData)
    console.log(`✅ Inserted ${simulationData.length} simulation runs`)

    console.log('📦 Inserting products...')
    await db.insert(products).values(productData)
    console.log(`✅ Inserted ${productData.length} products`)

    console.log('💬 Inserting comments...')
    await db.insert(comments).values(commentData)
    console.log(`✅ Inserted ${commentData.length} comments`)

    console.log('📎 Inserting attachments...')
    await db.insert(attachments).values(attachmentData)
    console.log(`✅ Inserted ${attachmentData.length} attachments`)

    console.log('📝 Inserting audit logs...')
    await db.insert(auditLogs).values(auditData)
    console.log(`✅ Inserted ${auditData.length} audit logs`)

    console.log('⚙ Inserting settings...')
    await db.insert(settings).values(settingData)
    console.log(`✅ Inserted ${settingData.length} settings`)

    console.log('🔍 Inserting search index entries...')
    await db.insert(searchIndex).values(searchData)
    console.log(`✅ Inserted ${searchData.length} search index entries`)

    console.log('🎉 Database seeding completed successfully!')
    console.log('\n📊 Summary:')
    console.log(`  • ${orgData.length} organizations`)
    console.log(`  • ${userData.length} users`)
    console.log(`  • ${missionData.length} missions`)
    console.log(`  • ${wasteData.length} waste material types`)
    console.log(`  • ${moduleData.length} processing modules`)
    console.log(`  • ${recipeData.length} processing recipes`)
    console.log(`  • ${simulationData.length} simulation runs`)
    console.log(`  • ${productData.length} products`)
    console.log(`  • ${commentData.length} comments`)
  } catch (error) {
    console.error('❌ Database seeding failed:', error)
    throw error
  }
}

// Export data arrays for testing
export {
  orgData,
  userData,
  roleData,
  apiKeyData,
  missionData,
  crewData,
  wasteData,
  moduleData,
  recipeData,
  simulationData,
  productData,
  commentData,
  attachmentData,
  auditData,
  settingData,
  searchData,
}
seed()
