"use strict";

const BaseTask = require( "./_task" );
const Promise  = require( "bluebird" );

const _      = require( "lodash" );
const errors = require( "../errors" );
const fs     = Promise.promisifyAll( require( "fs" ) );
const log    = require( "fm-log" ).module();
const path   = require( "path" );
const utils  = require( "./utils" );

class UpdateTask extends BaseTask {
	constructor( repository, options ) {
		super( repository, options );
	}

	process() {
		return this.checkWorkingDirectory();
	}

	checkWorkingDirectory() {
		return utils.isClean( this.repository )
			.then( repository => {

				if( !repository.isClean ) {
					log.error( `Working directory of '${repository.name}' isn't clean` );
				}

				return repository;
			} );
	}
}

function taskFactory( repository, options ) {
	const task = new UpdateTask( repository, options );
	return task.process();
}

module.exports = taskFactory;
