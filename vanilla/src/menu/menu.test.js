import {Suite} from "../test/test.js"
import {Menu} from "./menu.js";

const util = Suite("menu-json");

util.add("Json Menu to JS object", assert => {
    const element = document.createElement("DIV");
    const menu = Menu(element);
    assert.is(menu.getEntries()[0].id, '0');
    assert.is(menu.getEntries()[0].title, 'menu.main.entry.mabos');
    assert.is(menu.getEntries()[0].ctrl, 'HomeController');
});

util.add("Sorted menu entries", assert => {
    const element = document.createElement("DIV");
    const menu = Menu(element);
    assert.is(menu.getEntries()[0].id, '0');
    assert.is(menu.getEntries()[0].title, 'menu.main.entry.mabos');

    assert.is(menu.getEntries()[1].id, '1');
    assert.is(menu.getEntries()[1].title, 'menu.main.entry.persons');
});

util.add("Selected entry", assert => {
    const element = document.createElement("DIV");
    const menu = Menu(element);
    assert.is(menu.getSelectedEntry().id, '0');
    assert.is(menu.getSelectedEntry().title, 'menu.main.entry.mabos');

    menu.setSelectedEntry('1')

    assert.is(menu.getSelectedEntry().id, '1');
    assert.is(menu.getSelectedEntry().title, 'menu.main.entry.persons');
})

util.run();
