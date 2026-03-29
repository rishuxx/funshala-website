const programs = [
  {
    title: 'Playgroup',
    ageGroup: '1.8 - 2.5 Years',
    description: 'A gentle introduction to learning through sensory play and exploration in a safe, nurturing environment.',
    duration: '3 Hours / Day',
    fee: 5000
  },
  {
    title: 'Nursery',
    ageGroup: '2.5 - 3.5 Years',
    description: 'Building foundational skills with play-based activities that foster social development and creativity.',
    duration: '3 Hours / Day',
    fee: 6000
  },
  {
    title: 'LKG',
    ageGroup: '3.5 - 4.5 Years',
    description: 'Developing pre-academic skills and encouraging creative expression to build independence and confidence.',
    duration: '4 Hours / Day',
    fee: 7000
  },
  {
    title: 'UKG',
    ageGroup: '4.5 - 5.5 Years',
    description: 'Preparing children for formal schooling with advanced cognitive activities and leadership skill nurturing.',
    duration: '4 Hours / Day',
    fee: 7500
  },
  {
    title: 'Daycare',
    ageGroup: '1 - 10 Years',
    description: 'Flexible, extended care with engaging activities, nutritious meals, and safe transportation services.',
    duration: 'Flexible (Up to 8 hours)',
    fee: 10000
  },
];

const events = [
  {
    date: new Date('2024-10-25'),
    title: 'Diwali Celebration',
    description: 'A festival of lights where children will create crafts, enjoy stories, and share festive treats.',
  },
  {
    date: new Date('2024-11-14'),
    title: 'Annual Sports Day',
    description: 'A fun-filled day of games and friendly competitions for all our little athletes.',
  },
  {
    date: new Date('2024-12-20'),
    title: 'Winter Wonderland Gala',
    description: 'A magical winter-themed event with music, dance, and a special visit from a festive friend!',
  },
];


module.exports = { programs, events };
