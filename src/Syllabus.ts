import syllabus from './assets/syllabus.json';

export interface General {
    course_title_japanese: string;
    course_title_english: string;
    course_code: string;
    year: number
    grade: number[]
    semester: string;
    faculty: string;
    teaching_method: string;
    credit: number
    category: string;
    department: string;
    lecturer: string;
    office: string;
    email: string;
    course_website: string;
    update_time: string;
    update_status: boolean | string;
}
export interface Description {
    course_goals: string;
    prerequisites: string;
    recommended_prerequisites: string;
    course_materials: string;
    course_outline: string;
    practical_experience: string;
    remote_details: string;
    extra_class_work: string;
    evaluation_standards: string;
    office_hours: string;
    messages: string;
    others: string;
    keywords: string;
}
export interface Syllabus {
  id: number;
  general: General;
  description: Description;
}


const SYLLABUSES: Syllabus[] = syllabus['syllabuses'];

function filterByCategory(category: string) {
  return SYLLABUSES.filter(
    (course) => course.general.category.toString() === category.toString()
  );
}
function filterByDepartment(department: string) {
  return SYLLABUSES.filter(
    (course) => course.general.department === department
  );
}

function getCourseById(id: string) {
  return SYLLABUSES.find((course) => course.id.toString() === id);
}

let categories = [...new Set(SYLLABUSES.map((course) => course.general.category))];
let departments = [...new Set(SYLLABUSES.map((course) => course.general.department))];

export { categories, departments, SYLLABUSES, filterByCategory, filterByDepartment, getCourseById };
