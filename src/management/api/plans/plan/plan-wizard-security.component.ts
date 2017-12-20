/*
 * Copyright (C) 2015 The Gravitee team (http://gravitee.io)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import _ = require('lodash');
import PolicyService from "../../../../services/policy.service";

const ApiPlanWizardSecurityComponent: ng.IComponentOptions = {
  require: {
    parent: '^editPlan'
  },
  template: require("./plan-wizard-security.html"),
  controller: function(
    $scope: ng.IScope,
    PolicyService: PolicyService
  ) {
    'ngInject';

    this.securityTypes = [
      {
        'id': 'oauth2',
        'name': 'OAuth2',
        'policy': 'oauth2'
      }, {
        'id': 'jwt',
        'name': 'JWT',
        'policy': 'jwt'
      }, {
        'id': 'api_key',
        'name': 'API Key',
        'policy': 'api-key'
      }, {
        'id': 'key_less',
        'name': 'Keyless (public)'
      }];

    this.securitySchemaForm = ["*"];

    this.onSecurityTypeChange = function() {
      let securityType: any = _.find(this.securityTypes, { 'id': this.parent.plan.security });
      if (securityType && securityType.policy) {
        PolicyService.getSchema(securityType.policy).then(schema => {
          this.securitySchema = schema.data;
        });
      } else {
        this.securitySchema = undefined;
      }
    }
  }
};

export default ApiPlanWizardSecurityComponent;
