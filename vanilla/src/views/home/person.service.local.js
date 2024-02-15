import {UUID} from "../../madjs/assets/util/uuid.js";

export { personService, uuidUser0, uuidUser1,uuidUser2, uuidUser3, uuidUser4, uuidUser5,uuidUser6, uuidUser7, uuidUser8, uuidUser9 }

const uuidUser0 = UUID();
const uuidUser1 = UUID();
const uuidUser2 = UUID();
const uuidUser3 = UUID();
const uuidUser4 = UUID();
const uuidUser5 = UUID();
const uuidUser6 = UUID();
const uuidUser7 = UUID();
const uuidUser8 = UUID();
const uuidUser9 = UUID();

const absoluteImgPath = "src/madjs/assets/img/avatars/svg"

/** @type Person[] */
const persons = [
    {id:uuidUser0, img:absoluteImgPath + "/018-gentleman.svg", firstname: "Leon", lastname: "Vance", email: "leon.vance@mabos.ch", joined: true, isAdmin: true, isSpacer: true, isApprover: true},
    {id:uuidUser1, img:absoluteImgPath + "/001-devil.svg", firstname: "Leroy Jethro", lastname: "Gibbs", email: "jethro.gibbs@mabos.ch", joined: true, isAdmin: true, isSpacer: true, isApprover: true},
    {id:uuidUser2, img:absoluteImgPath + "/010-student.svg", firstname: "Ziva", lastname: "David", email: "ziva.david@mabos.ch", joined: true, isAdmin: false, isSpacer: false, isApprover: false},
    {id:uuidUser3, img:absoluteImgPath + "/016-boy.svg", firstname: "Anthony", lastname: "Dinozzo", email: "anthony.dinozzo@mabos.ch", joined: false, isAdmin: false, isSpacer: false, isApprover: false},
    {id:uuidUser4, img:absoluteImgPath + "/024-viking.svg", firstname: "Timothy", lastname: "McGee", email: "timothy.mcgee@mabos.ch", joined: true, isAdmin: false, isSpacer: false, isApprover: false},
    {id:uuidUser5, img:absoluteImgPath + "/015-woman.svg", firstname: "Abby", lastname: "Sciuto", email: "abby.sciuto@mabos.ch", joined: false, isAdmin: false, isSpacer: false, isApprover: false},
    {id:uuidUser6, img:absoluteImgPath + "/024-viking.svg", firstname: "Ducky", lastname: "Mallard", email: "ducky.mallard@mabos.ch", joined: true, isAdmin: false, isSpacer: false, isApprover: false},
    {id:uuidUser7, img:absoluteImgPath + "/024-viking.svg", firstname: "Ellie", lastname: "Bishop", email: "ellie.bishop@mabos.ch", joined: true, isAdmin: false, isSpacer: false, isApprover: false},
    {id:uuidUser8, img:absoluteImgPath + "/019-graduated.svg", firstname: "Jimmy", lastname: "Palmer", email: "jimmy.palmer@mabos.ch", joined: false, isAdmin: false, isSpacer: false, isApprover: false},
    {id:uuidUser9, img:absoluteImgPath + "/024-viking.svg", firstname: "Caitlin", lastname: "Todd", email: "caitlin.todd@mabos.ch", joined: false, isAdmin: false, isSpacer: false, isApprover: false},
];

/**
 * Concrete factory for local {@link PersonService} functions.
 * @constructor
 * @returns {PersonService}
 */
const personService = () => {
    const loadPersons = withPersons => withPersons(persons);
    return { loadPersons }
};
