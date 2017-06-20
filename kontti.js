/**
 * @license
 * Copyright 2015-present, Petri Tahvanainen.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. 
 *
 */

import kontti from './lib/kontti.js';

export const model = kontti.model;
export const state = kontti.state;
export const connector = kontti.connector;
export const pureConnector = kontti.pureConnector;

export default {
	model,
	state,

	connector,
	pureConnector
}