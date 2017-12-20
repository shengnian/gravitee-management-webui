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
import angular = require('angular');

class ApiEditPlanController {

  private plan: any;

  private vm: {
    selectedStep: number;
    stepProgress: number;
    maxStep: number;
    showBusyText: boolean;
    stepData: {
      step: number;
      label?: string;
      completed: boolean;
      optional: boolean;
      data: any
    }[]
  };

  constructor(
    private $timeout: ng.ITimeoutService
  ) {
    'ngInject';

    this.vm = {
      selectedStep: 0,
      stepProgress: 1,
      maxStep: 4,
      showBusyText: false,
      stepData: [
        {step: 1, completed: false, optional: false, data: {}},
        {step: 2, completed: false, optional: false, data: {}},
        {step: 3, completed: false, optional: true, data: {}},
        {step: 4, completed: false, optional: true, data: {}}
      ]
    };
  }

  $onInit() {
    if (!this.plan) {
      this.plan = {characteristics: []};
    }
  }

  moveToNextStep(step: any) {
    //this.plan = _.merge(this.plan, step.data);
    this.submitCurrentStep(step);
  }

  moveToPreviousStep() {
    if (this.vm.selectedStep > 0) {
      this.vm.selectedStep = this.vm.selectedStep - 1;
    }
  }

  selectStep(step) {
    this.vm.selectedStep = step;
  }

   submitCurrentStep(stepData) {
    this.vm.showBusyText = true;
    if (!stepData.completed) {
      if (this.vm.selectedStep !== 4) {
        this.vm.showBusyText = false;
        //move to next step when success
        stepData.completed = true;
        this.enableNextStep();
      }
    } else {
      this.vm.showBusyText = false;
      this.enableNextStep();
    }
  }

  enableNextStep() {
    //do not exceed into max step
    if (this.vm.selectedStep >= this.vm.maxStep) {
      return;
    }
    //do not increment vm.stepProgress when submitting from previously completed step
    if (this.vm.selectedStep === this.vm.stepProgress - 1) {
      this.vm.stepProgress = this.vm.stepProgress + 1;
    }

    /*
    //change api step state
    if (this.skippedStep) {
      this.apiSteps[this.vm.selectedStep].badgeClass = 'disable';
      this.apiSteps[this.vm.selectedStep].badgeIconClass = 'glyphicon-remove-circle';
      this.apiSteps[this.vm.selectedStep].title = this.steps()[this.vm.selectedStep].title + " <em>skipped</em>";
      this.skippedStep = false;
    } else {
      this.apiSteps[this.vm.selectedStep].badgeClass = 'info';
      this.apiSteps[this.vm.selectedStep].badgeIconClass = 'glyphicon-ok-circle';
    }
    if (!this.apiSteps[this.vm.selectedStep + 1]) {
      this.apiSteps.push(this.steps()[this.vm.selectedStep + 1]);
    }
    */

    var that = this;
    this.$timeout(function () {
      that.vm.selectedStep = that.vm.selectedStep + 1;
    });
  }
}

export default ApiEditPlanController;
