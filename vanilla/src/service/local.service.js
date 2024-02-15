import {UUID} from "../assets/util/uuid.js";

export { vakansieService, uuidUser0, uuidUser1,uuidUser2, uuidUser3, uuidUser4, uuidUser5,uuidUser6, uuidUser7, uuidUser8, uuidUser9 }

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

const absoluteImgPath = "src/assets/img/avatars/svg"

/** @type Person[] */
const persons = [
    {id:uuidUser0, img:absoluteImgPath + "/018-gentleman.svg", firstname: "Leon", lastname: "Vance", job: "Director"},
    {id:uuidUser1, img:absoluteImgPath + "/001-devil.svg", firstname: "Leroy Jethro", lastname: "Gibbs", job: "Supervisory Special Agent "},
    {id:uuidUser2, img:absoluteImgPath + "/010-student.svg", firstname: "Ziva", lastname: "David", job: "Special Agent"},
    {id:uuidUser3, img:absoluteImgPath + "/016-boy.svg", firstname: "Anthony", lastname: "Dinozzo", job: "Senior Field Agent"},
    {id:uuidUser4, img:absoluteImgPath + "/024-viking.svg", firstname: "Timothy", lastname: "McGee", job: "Senior Field Agent"},
    {id:uuidUser5, img:absoluteImgPath + "/015-woman.svg", firstname: "Abby", lastname: "Sciuto", job: "Forensic Specialist"},
    {id:uuidUser6, img:absoluteImgPath + "/024-viking.svg", firstname: "Ducky", lastname: "Mallard", job: "Chief Medical Examiner"},
    {id:uuidUser7, img:absoluteImgPath + "/024-viking.svg", firstname: "Ellie", lastname: "Bishop", job: "Special Agent"},
    {id:uuidUser8, img:absoluteImgPath + "/019-graduated.svg", firstname: "Jimmy", lastname: "Palmer", job: "Assistant Medical Examiner"},
    {id:uuidUser9, img:absoluteImgPath + "/024-viking.svg", firstname: "Caitlin", lastname: "Todd", job: "Special Agent"},
];

/**
 * Concrete factory for local {@link VakansieService} functions.
 * @constructor
 * @returns {VakansieService}
 */
const vakansieService = () => {
    const loadPersons = withPersons => withPersons(persons);
    return { loadPersons }
};
