/*
Copyright 2017 OCAD University

Licensed under the New BSD license. You may not use this file except in
compliance with this License.

You may obtain a copy of the License at
https://raw.githubusercontent.com/fluid-project/co-occurrence-engine/master/LICENSE.txt
*/

/* eslint-env node */

"use strict";

var fluid = require("infusion"),
    jqUnit = fluid.require("node-jqunit");

require("../index.js");

fluid.defaults("fluid.tests.nexus.reactantA", {
    gradeNames: "fluid.modelComponent"
});

jqUnit.test("RecipeMatcher Test", function () {
    jqUnit.expect(2);

    var matcher = fluid.nexus.recipeMatcher();

    var recipe = {
        options: {
            reactants: {
                componentA: {
                    match: {
                        type: "gradeMatcher",
                        gradeName: "fluid.tests.nexus.reactantA"
                    }
                }
            }
        }
    };

    // Recipe does not match against empty component array
    jqUnit.assertFalse("No match", matcher.matchRecipe(recipe, []));

    // Recipe matches against an instance of reactantA
    var components = [
        fluid.tests.nexus.reactantA()
    ];
    jqUnit.assertEquals("Matches recipe", components[0], matcher.matchRecipe(recipe, components).componentA);
});
