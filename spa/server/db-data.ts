export const ABOS: any = {
  1: {
    id: 17,
    description: 'Reactive Angular Course',
    longDescription: 'How to build Angular applications in Reactive style using plain RxJs - Patterns and Anti-Patterns',
    iconUrl: 'https://angular-university.s3-us-west-1.amazonaws.com/course-images/reactive-angular-course.jpg',
    courseListIcon: 'https://angular-academy.s3.amazonaws.com/main-logo/main-page-logo-small-hat.png',
    category: 'BEGINNER',
    lessonsCount: 10,
    seqNo: 0,
    url: 'reactive-angular-course',
    price: 50

  },
}




export function findCourseById(courseId: number) {
  return ABOS[courseId];
}


