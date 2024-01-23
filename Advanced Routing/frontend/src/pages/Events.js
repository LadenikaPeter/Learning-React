import { Await, defer, json, useLoaderData } from "react-router-dom";
import EventsList from "../components/EventsList";
import { Suspense } from "react";

function EventsPage() {
  const { events } = useLoaderData();
  // const fetchedEvents = data.events;
  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // throw new Response(JSON.stringify({ message: "Could not fetch events" }), {
    //   status: 500,
    // });

    throw json({ message: "Could not fetch events" }, { status: 500 });
    // throw { message: "could not fetch events " };
  } else {
    // useLoadeData hook can extract the data straight from responses so no need to transform the data or extract
    const resData = await response.json();
    console.log(resData);
    return resData.events;
  }
}

export const loaderFunc = async () => {
  return defer({
    events: loadEvents(),
  });
};
