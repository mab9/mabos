export const ABOS: any = {
  1: {
    id: 12,
    title: 'Spotify Family',
    price: 15.00,
    period: 1,
    active: true,
    description: "Family Abo with 5 user",
  },
  2: {
    id: 13,
    title: 'Contabo V Server',
    price: 16.00,
    period: 12,
    active: true,
    description: "Contabo virtual server",
  },
  3: {
    id: 14,
    title: 'Mobile Abo',
    price: 18.00,
    period: 1,
    active: true,
    description: "Sunrise Mobile Abo",
  },
}




export function findCourseById(courseId: number) {
  return ABOS[courseId];
}


