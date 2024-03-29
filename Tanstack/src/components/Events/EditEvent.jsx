import {
  Link,
  redirect,
  useNavigate,
  useNavigation,
  useParams,
  useSubmit,
} from "react-router-dom";
import LoadingIndicator from "../../components/UI/LoadingIndicator.jsx";

import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import { useMutation, useQuery } from "@tanstack/react-query";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import { fetchEvent, queryClient, updateEvent } from "../../util/http.js";

export default function EditEvent() {
  const navigate = useNavigate();
  const params = useParams();
  const submit = useSubmit();
  const { state } = useNavigation();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["event", { id: params.id }],
    queryFn: ({ signal }) => fetchEvent({ id: params.id, signal }),
    staleTime: 10000,
  });

  // const { mutate } = useMutation({
  //   mutationFn: updateEvent,
  //   onMutate: async (data) => {
  //     console.log(data);
  //     const newEvent = data.event;
  //     await queryClient.cancelQueries({
  //       queryKey: ["event", { id: params.id }],
  //     });
  //     const previousEvent = queryClient.getQueryData([
  //       "event",
  //       { id: params.id },
  //     ]);
  //     queryClient.setQueryData(["event", { id: params.id }], newEvent);
  //     return { previousEvent };
  //   },
  //   onError: (error, data, context) => {
  //     queryClient.setQueriesData(
  //       ["event", { id: params.id }],
  //       context.previousEvent
  //     );
  //   },
  //   onSettled: () =>
  //     queryClient.invalidateQueries(["event", { id: params.id }]),
  // });

  function handleSubmit(formData) {
    // mutate({ id: params.id, event: formData });
    // navigate("../");
    submit(formData, { method: "PUT" });
  }

  function handleClose() {
    navigate("../");
  }

  let content;

  if (isPending) {
    content = (
      <div className="center">
        <LoadingIndicator />
      </div>
    );
  }

  if (isError) {
    content = (
      <>
        <ErrorBlock
          title="failed to load event"
          message={error.info?.message || "Failed to load event"}
        />
        <div className="form-actions">
          <Link to="../" className="button">
            Okay
          </Link>
        </div>
      </>
    );
  }

  if (data) {
    content = (
      <EventForm inputData={data} onSubmit={handleSubmit}>
        {state === "submitting" ? (
          <p>Submitting...</p>
        ) : (
          <>
            <Link to="../" className="button-text">
              Cancel
            </Link>
            <button type="submit" className="button">
              Update
            </button>
          </>
        )}
      </EventForm>
    );
  }

  return <Modal onClose={handleClose}>{content}</Modal>;
}

export function loader({ params }) {
  return queryClient.fetchQuery({
    queryKey: ["event", { id: params.id }],
    queryFn: ({ signal }) => fetchEvent({ id: params.id, signal }),
  });
}

export async function action({ request, params }) {
  const formData = await request.formData();
  console.log(formData);
  const updatedEventData = Object.fromEntries(formData);
  await updateEvent({ id: params.id, event: updatedEventData });
  await queryClient.invalidateQueries(["event"]);
  return redirect("../");
}
