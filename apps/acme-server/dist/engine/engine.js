var MarsWasteSimulator = (function () {
    function MarsWasteSimulator(mission, materials, modules, recipes, seed) {
        this.mission = mission;
        this.materials = new Map(materials.map(function (m) { return [m.id, m]; }));
        this.modules = new Map(modules.map(function (m) { return [m.id, m]; }));
        this.recipes = new Map(recipes.map(function (r) { return [r.id, r]; }));
        if (seed !== undefined) {
            var s_1 = seed;
            this.random = function () {
                s_1 = (Math.imul(s_1, 1664525) + 1013904223) | 0;
                return (s_1 >>> 0) / 0x100000000;
            };
        }
        else {
            this.random = Math.random;
        }
    }
    MarsWasteSimulator.prototype.simulate = function (config) {
        var state = this.initializeState(config);
        var steps = [];
        var timeline = [];
        var totalDays = config.mission_duration_days || this.mission.mission_duration_days || 365;
        var hoursPerStep = 24;
        for (var day = 0; day < totalDays; day++) {
            state.day = day;
            this.generateDailyWaste(state, config);
            var dailyPlan = this.optimizeDaily(state, config);
            var dayEvents = this.executeDailyPlan(state, dailyPlan, config);
            this.updateModuleMaintenance(state, config);
            if (dayEvents.length > 0 || day % 7 === 0) {
                var step = {
                    events: dayEvents,
                    snapshot: JSON.parse(JSON.stringify(state)),
                    stepIndex: day,
                    timestamp: new Date(Date.now() + day * 24 * 60 * 60 * 1000),
                };
                steps.push(step);
            }
            if (dayEvents.length > 0) {
                timeline.push({
                    day: day,
                    events: dayEvents,
                });
            }
        }
        return this.generateResults(state, steps, timeline, config);
    };
    MarsWasteSimulator.prototype.initializeState = function (config) {
        var inventory = {};
        for (var _i = 0, _a = Object.entries(config.waste_generation_rates || {}); _i < _a.length; _i++) {
            var _b = _a[_i], materialId = _b[0], rate = _b[1];
            inventory[materialId] = 0;
        }
        var moduleStates = {};
        for (var _c = 0, _d = config.available_modules || []; _c < _d.length; _c++) {
            var moduleId = _d[_c];
            moduleStates[moduleId] = {
                currentLoad: 0,
                maintenanceHours: 0,
                status: 'active',
            };
        }
        return {
            day: 0,
            inventory: inventory,
            metrics: {
                crewHours: 0,
                energyKwh: 0,
                recoveredKg: 0,
                wasteProcessedKg: 0,
                waterLiters: 0,
            },
            moduleStates: moduleStates,
            products: {},
            timestep: 0,
        };
    };
    MarsWasteSimulator.prototype.generateDailyWaste = function (state, config) {
        var _loop_1 = function (wasteType, rate) {
            var typeMaterials = Array.from(this_1.materials.values()).filter(function (m) { return m.category === wasteType; });
            if (typeMaterials.length > 0) {
                var totalRate_1 = rate * (config.crew_size || this_1.mission.crew_size || 6);
                typeMaterials.forEach(function (material) {
                    var materialRate = totalRate_1 / typeMaterials.length;
                    state.inventory[material.id] = (state.inventory[material.id] || 0) + materialRate;
                });
            }
        };
        var this_1 = this;
        for (var _i = 0, _a = Object.entries(config.waste_generation_rates || {}); _i < _a.length; _i++) {
            var _b = _a[_i], wasteType = _b[0], rate = _b[1];
            _loop_1(wasteType, rate);
        }
    };
    MarsWasteSimulator.prototype.optimizeDaily = function (state, config) {
        var _this = this;
        var _a;
        var executions = [];
        var constraints = config.optimization_goals || {
            maximize_utility: 0.3,
            minimize_crew_time: 0.2,
            minimize_energy: 0.2,
            minimize_waste: 0.3,
        };
        var availableRecipes = Array.from(this.recipes.values())
            .filter(function (recipe) { return _this.canExecuteRecipe(recipe, state); })
            .map(function (recipe) { return ({
            recipe: recipe,
            score: _this.calculateRecipeScore(recipe, constraints),
        }); })
            .sort(function (a, b) { return b.score - a.score; });
        var dailyEnergyLimit = ((_a = config.energy_constraints) === null || _a === void 0 ? void 0 : _a.max_daily_kwh) || 100;
        var dailyCrewLimit = (config.crew_size || 6) * 8;
        var usedEnergy = 0;
        var usedCrew = 0;
        for (var _i = 0, availableRecipes_1 = availableRecipes; _i < availableRecipes_1.length; _i++) {
            var recipe = availableRecipes_1[_i].recipe;
            while (this.canExecuteRecipe(recipe, state) && usedEnergy < dailyEnergyLimit && usedCrew < dailyCrewLimit) {
                var execution = this.planRecipeExecution(recipe, state, config);
                if (!execution)
                    break;
                if (usedEnergy + execution.energyKwh > dailyEnergyLimit ||
                    usedCrew + execution.crewMinutes / 60 > dailyCrewLimit) {
                    break;
                }
                executions.push(execution);
                usedEnergy += execution.energyKwh;
                usedCrew += execution.crewMinutes / 60;
                for (var _b = 0, _c = Object.entries(execution.inputMaterials); _b < _c.length; _b++) {
                    var _d = _c[_b], materialId = _d[0], amount = _d[1];
                    state.inventory[materialId] -= amount;
                }
            }
        }
        for (var _e = 0, executions_1 = executions; _e < executions_1.length; _e++) {
            var execution = executions_1[_e];
            for (var _f = 0, _g = Object.entries(execution.inputMaterials); _f < _g.length; _f++) {
                var _h = _g[_f], materialId = _h[0], amount = _h[1];
                state.inventory[materialId] += amount;
            }
        }
        return executions;
    };
    MarsWasteSimulator.prototype.calculateRecipeScore = function (recipe, objectives) {
        var inputs = recipe.inputs;
        var outputs = recipe.outputs;
        var totalInputKg = Object.values(inputs).reduce(function (sum, input) { return sum + input.quantity_kg; }, 0);
        var totalOutputKg = Object.values(outputs).reduce(function (sum, output) { return sum + output.quantity_kg; }, 0);
        var massEfficiency = totalOutputKg / Math.max(totalInputKg, 0.001);
        var energyEfficiency = totalOutputKg / Math.max(Number(recipe.energy_required_kwh), 0.001);
        var crewEfficiency = totalOutputKg / Math.max(recipe.crew_time_minutes || 1, 1);
        var yieldScore = recipe.yield_percentage || 0.8;
        var qualityScore = recipe.quality_score || 1.0;
        return ((massEfficiency * objectives.minimize_waste +
            energyEfficiency * objectives.minimize_energy +
            crewEfficiency * objectives.minimize_crew_time +
            yieldScore * qualityScore * objectives.maximize_utility) /
            4);
    };
    MarsWasteSimulator.prototype.canExecuteRecipe = function (recipe, state) {
        var inputs = recipe.inputs;
        for (var _i = 0, _a = Object.entries(inputs); _i < _a.length; _i++) {
            var _b = _a[_i], materialId = _b[0], requirement = _b[1];
            var available = state.inventory[materialId] || 0;
            if (available < requirement.quantity_kg) {
                return false;
            }
        }
        return true;
    };
    MarsWasteSimulator.prototype.planRecipeExecution = function (recipe, state, config) {
        var _this = this;
        var _a;
        var inputs = recipe.inputs;
        var outputs = recipe.outputs;
        var availableModuleId = (_a = config.available_modules) === null || _a === void 0 ? void 0 : _a.find(function (moduleId) {
            var module = _this.modules.get(moduleId);
            var moduleState = state.moduleStates[moduleId];
            return module && (moduleState === null || moduleState === void 0 ? void 0 : moduleState.status) === 'active';
        });
        if (!availableModuleId)
            return null;
        var inputMaterials = {};
        var limitingFactor = 1.0;
        for (var _i = 0, _b = Object.entries(inputs); _i < _b.length; _i++) {
            var _c = _b[_i], materialId = _c[0], requirement = _c[1];
            var available = state.inventory[materialId] || 0;
            var needed = requirement.quantity_kg;
            if (available < needed) {
                limitingFactor = Math.min(limitingFactor, available / needed);
            }
        }
        if (limitingFactor <= 0)
            return null;
        for (var _d = 0, _e = Object.entries(inputs); _d < _e.length; _d++) {
            var _f = _e[_d], materialId = _f[0], requirement = _f[1];
            inputMaterials[materialId] = requirement.quantity_kg * limitingFactor;
        }
        var outputProducts = Object.entries(outputs).map(function (_a) {
            var productType = _a[0], output = _a[1];
            return ({
                massKg: output.quantity_kg * limitingFactor * (recipe.yield_percentage || 0.8),
                productType: productType,
                units: Math.floor(output.quantity_kg * limitingFactor * (recipe.yield_percentage || 0.8)),
            });
        });
        return {
            crewMinutes: (recipe.crew_time_minutes || 0) * limitingFactor,
            energyKwh: Number(recipe.energy_required_kwh) * limitingFactor,
            inputMaterials: inputMaterials,
            moduleId: availableModuleId,
            outputProducts: outputProducts,
            processingTimeMinutes: recipe.processing_time_minutes * limitingFactor,
            recipeId: recipe.id,
        };
    };
    MarsWasteSimulator.prototype.executeDailyPlan = function (state, executions, config) {
        var _this = this;
        var events = [];
        for (var _i = 0, executions_2 = executions; _i < executions_2.length; _i++) {
            var execution = executions_2[_i];
            for (var _a = 0, _b = Object.entries(execution.inputMaterials); _a < _b.length; _a++) {
                var _c = _b[_a], materialId = _c[0], amount = _c[1];
                state.inventory[materialId] -= amount;
                state.metrics.wasteProcessedKg += amount;
            }
            for (var _d = 0, _e = execution.outputProducts; _d < _e.length; _d++) {
                var output = _e[_d];
                var productKey = output.productType;
                if (!state.products[productKey]) {
                    state.products[productKey] = { totalMassKg: 0, units: 0 };
                }
                state.products[productKey].units += output.units;
                state.products[productKey].totalMassKg += output.massKg;
                state.metrics.recoveredKg += output.massKg;
            }
            state.metrics.energyKwh += execution.energyKwh;
            state.metrics.crewHours += execution.crewMinutes / 60;
            events.push({
                crewTimeMinutes: execution.crewMinutes,
                description: "Processed ".concat(Object.entries(execution.inputMaterials)
                    .map(function (_a) {
                    var _b;
                    var id = _a[0], kg = _a[1];
                    return "".concat(kg.toFixed(1), "kg ").concat(((_b = _this.materials.get(id)) === null || _b === void 0 ? void 0 : _b.name) || id);
                })
                    .join(', '), " \u2192 ").concat(execution.outputProducts.map(function (p) { return "".concat(p.units, " ").concat(p.productType); }).join(', ')),
                energyUsedKwh: execution.energyKwh,
                materialsInvolved: Object.keys(execution.inputMaterials),
                type: 'processing',
            });
        }
        return events;
    };
    MarsWasteSimulator.prototype.updateModuleMaintenance = function (state, config) {
        for (var _i = 0, _a = Object.keys(state.moduleStates); _i < _a.length; _i++) {
            var moduleId = _a[_i];
            var module_1 = this.modules.get(moduleId);
            if (module_1) {
                var maintenanceHours = Number(module_1.maintenance_hours_per_day) || 0;
                state.metrics.crewHours += maintenanceHours;
            }
        }
    };
    MarsWasteSimulator.prototype.generateResults = function (finalState, steps, timeline, config) {
        var totalWasteGenerated = Object.values(config.waste_generation_rates || {}).reduce(function (sum, rate) { return sum + rate * (config.mission_duration_days || 365) * (config.crew_size || 6); }, 0);
        var wasteReductionPercentage = totalWasteGenerated > 0 ? (finalState.metrics.wasteProcessedKg / totalWasteGenerated) * 100 : 0;
        var productsByType = {};
        for (var _i = 0, _a = Object.entries(finalState.products); _i < _a.length; _i++) {
            var _b = _a[_i], productType = _b[0], data = _b[1];
            productsByType[productType] = data.units;
        }
        return {
            efficiency_metrics: {
                crew_time_per_kg_waste: finalState.metrics.crewHours / Math.max(finalState.metrics.wasteProcessedKg, 1),
                energy_per_kg_waste: finalState.metrics.energyKwh / Math.max(finalState.metrics.wasteProcessedKg, 1),
                waste_to_product_ratio: finalState.metrics.recoveredKg / Math.max(finalState.metrics.wasteProcessedKg, 1),
            },
            products_by_type: productsByType,
            recommendations: this.generateRecommendations(finalState, config),
            timeline: timeline,
            total_crew_time_hours: finalState.metrics.crewHours,
            total_energy_used_kwh: finalState.metrics.energyKwh,
            total_products_created: Object.values(finalState.products).reduce(function (sum, p) { return sum + p.units; }, 0),
            total_waste_processed_kg: finalState.metrics.wasteProcessedKg,
            waste_reduction_percentage: wasteReductionPercentage,
        };
    };
    MarsWasteSimulator.prototype.generateRecommendations = function (state, config) {
        var _this = this;
        var _a;
        var recommendations = [];
        var efficiency = state.metrics.recoveredKg / Math.max(state.metrics.wasteProcessedKg, 1);
        if (efficiency < 0.5) {
            recommendations.push('Consider optimizing recipe yields or adding more efficient processing modules');
        }
        if (state.metrics.energyKwh >
            (((_a = config.energy_constraints) === null || _a === void 0 ? void 0 : _a.max_daily_kwh) || 100) * (config.mission_duration_days || 365)) {
            recommendations.push('Energy consumption exceeds budget - consider more energy-efficient processes');
        }
        var unusedMaterials = Object.entries(state.inventory)
            .filter(function (_a) {
            var _ = _a[0], amount = _a[1];
            return amount > 10;
        })
            .map(function (_a) {
            var _b;
            var id = _a[0], _ = _a[1];
            return ((_b = _this.materials.get(id)) === null || _b === void 0 ? void 0 : _b.name) || id;
        });
        if (unusedMaterials.length > 0) {
            recommendations.push("Large amounts of unused materials: ".concat(unusedMaterials.join(', '), " - consider developing new recipes"));
        }
        if (recommendations.length === 0) {
            recommendations.push('Simulation completed successfully with good efficiency metrics');
        }
        return recommendations;
    };
    return MarsWasteSimulator;
}());
export { MarsWasteSimulator };
export function generateSankeyData(result, materials, recipes) {
    var nodes = [];
    var links = [];
    materials.forEach(function (material) {
        nodes.push({
            category: 'material',
            id: "material_".concat(material.id),
            name: material.name,
        });
    });
    recipes.forEach(function (recipe) {
        nodes.push({
            category: 'process',
            id: "process_".concat(recipe.id),
            name: recipe.name,
        });
    });
    Object.keys(result.products_by_type).forEach(function (productType) {
        nodes.push({
            category: 'product',
            id: "product_".concat(productType),
            name: productType.replace('_', ' '),
        });
    });
    return { links: links, nodes: nodes };
}
export default MarsWasteSimulator;
//# sourceMappingURL=engine.js.map