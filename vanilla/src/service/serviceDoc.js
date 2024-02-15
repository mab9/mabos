import "../domainDoc.js"

/**
 * @callback onPersonsReadyCallback
 * @param    {Person[]} persons - array of persons
 * @return   {undefined} void
 */


/**
 * Common interface for all services (abstract factory pattern)
 *
 * @typedef {{loadPersons: (function(onPersonsReadyCallback): undefined)}} PersonService
 * */


/**
 * Group services interface (abstract factory pattern)
 * @typedef {{
 *      loadGroups: (),
 *      loadGroupUsers: (groupId),
 *      }} GroupService
 * */
