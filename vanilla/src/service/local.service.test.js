import {vakansieService} from "./local.service.js"
import {Suite} from "../madjs/test/test.js";

const localServiceSuite = Suite("localService");

localServiceSuite.add("setup", assert => {

    vakansieService().loadPersons( persons => {
        assert.is(persons.length, 10);
    })

});

localServiceSuite.run();
