export async function getAllData() {
  const response = await fetch('https://next-fetch-80716-default-rtdb.firebaseio.com/event.json');
  const data = await response.json();

  const events = [];
  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
    });
  }
  return events;
}

export async function getFeaturedEvents() {
  const featured = await getAllData();
  return featured.filter((event) => event.isFeatured);
}

export async function getEventById(id) {
  const events = await getAllData();
  return events.find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter) {
  const {year, month} = dateFilter;
  const events = await getAllData();

  let filteredEvents = await events.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
  });
  return filteredEvents;
}
