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
export class User {
  public username: string;
  public email: string;
  public picture: string;
  public roles: any[];
  public userPermissions: string[];
  public userApiPermissions: string[];
  public userApplicationPermissions: string[];
  public tasks: any;

  constructor() {
    'ngInject';
  }

  allowedTo(permissions: string[]): boolean {
    if (!permissions || !this.userPermissions) {
      return false;
    }
    return _.intersection(this.userPermissions, permissions).length > 0 ||
      _.intersection(this.userApiPermissions, permissions).length > 0 ||
      _.intersection(this.userApplicationPermissions, permissions).length > 0;
  }

  isAdmin(): boolean {
    if (!this.userPermissions) {
      return false;
    }
    return _.some(this.userPermissions, (userPermission) => {
      return _.startsWith(userPermission, 'management-instance')
       || _.startsWith(userPermission, 'management-platform');
    });
  }
}
