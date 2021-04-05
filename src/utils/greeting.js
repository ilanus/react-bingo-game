export const getGreeting = () => {
  const now = new Date();
  const hours = now.getHours();

  const greetings = [
    {
      tod: 'latenight',
      greet: 'You`re still awake?',
      test: hours >= 24 || hours <= 4,
    },
    { tod: 'night', greet: 'Good Night!', test: hours >= 21 || hours <= 11 },
    { tod: 'evening', greet: 'Good Evening!', test: hours >= 18 && hours <= 20 },
    { tod: 'afternoon', greet: 'Good Afternoon!', test: hours >= 13 && hours <= 17 },
    { tod: 'noon', greet: 'Good Noon Visitor!', test: hours === 12 },
    {
      tod: 'morning',
      greet: 'Good Morning!',
      test: hours >= 5 && hours <= 11,
    },
  ];

  return greetings.find(el => el.test).greet;
};
