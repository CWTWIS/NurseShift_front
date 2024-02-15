import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import {
  Button,
  Datepicker,
  Eventcalendar,
  formatDate,
  Input,
  Popup,
  setOptions,
  Snackbar,
  Textarea,
} from "@mobiscroll/react";
import { useCallback, useMemo, useState } from "react";

import profileImage from "../../../assets/profileImage.png";
import useAuth from "../../../hook/use-auth";

setOptions({
  theme: "ios",
  themeVariant: "light",
});

const staff = [
  {
    id: 1,
    name: "Jane Doe",
    color: "#e20000",
    title: "HEAD",
    mobile: "0800000000",
    img: profileImage,
  },
  {
    id: 2,
    name: "John Doe",
    color: "#60e81a",
    title: "REGISTERED NURSE",
    img: profileImage,
  },
  {
    id: 3,
    name: "Jake Doe",
    color: "#3ba7ff",
    title: "REGISTERED NURSE",
    img: profileImage,
  },
  {
    id: 4,
    name: "Jay Doe",
    color: "#e25dd2",
    title: "REGISTERED NURSE",
    img: profileImage,
  },
  {
    id: 5,
    name: "Jai Doe",
    color: "#f1e920",
    title: "REGISTERED NURSE",
    img: profileImage,
  },
  {
    id: 6,
    name: "Juju Doe",
    color: "#1ac38d",
    title: "REGISTERED NURSE",
    img: profileImage,
  },
];

const defaultShifts = [
  {
    start: "2024-02-12T07:00",
    end: "2024-02-12T13:00",
    title: "07:00 - 13:00",
    resource: 2,
    slot: 1,
  },
  {
    start: "2024-02-12T07:00",
    end: "2024-02-12T13:00",
    title: "07:00 - 13:00",
    resource: 3,
    slot: 1,
  },
  {
    start: "2024-02-12T07:00",
    end: "2024-02-12T13:00",
    title: "07:00 - 13:00",
    resource: 6,
    slot: 1,
  },
  {
    start: "2024-02-12T12:00",
    end: "2024-02-12T18:00",
    title: "12:00 - 18:00",
    resource: 4,
    slot: 2,
  },
  {
    start: "2024-02-12T12:00",
    end: "2024-02-12T18:00",
    title: "12:00 - 18:00",
    resource: 5,
    slot: 2,
  },
  {
    start: "2024-02-13T07:00",
    end: "2024-02-13T13:00",
    title: "07:00 - 13:00",
    resource: 1,
    slot: 1,
  },
  {
    start: "2024-02-13T07:00",
    end: "2024-02-13T13:00",
    title: "07:00 - 13:00",
    resource: 2,
    slot: 1,
  },
  {
    start: "2024-02-13T07:00",
    end: "2024-02-13T13:00",
    title: "07:00 - 13:00",
    resource: 6,
    slot: 1,
  },
  {
    start: "2024-02-13T12:00",
    end: "2024-02-13T18:00",
    title: "12:00 - 18:00",
    resource: 3,
    slot: 2,
  },
  {
    start: "2024-02-13T12:00",
    end: "2024-02-13T18:00",
    title: "12:00 - 18:00",
    resource: 5,
    slot: 2,
  },
  {
    start: "2024-02-14T07:00",
    end: "2024-02-14T13:00",
    title: "07:00 - 13:00",
    resource: 1,
    slot: 1,
  },
  {
    start: "2024-02-14T07:00",
    end: "2024-02-14T13:00",
    title: "07:00 - 13:00",
    resource: 3,
    slot: 1,
  },
  {
    start: "2024-02-14T07:00",
    end: "2024-02-14T13:00",
    title: "07:00 - 13:00",
    resource: 4,
    slot: 1,
  },
  {
    start: "2024-02-14T12:00",
    end: "2024-02-14T18:00",
    title: "12:00 - 18:00",
    resource: 2,
    slot: 2,
  },
  {
    start: "2024-02-14T12:00",
    end: "2024-02-14T18:00",
    title: "12:00 - 18:00",
    resource: 6,
    slot: 2,
  },
  {
    start: "2024-02-15T07:00",
    end: "2024-02-15T13:00",
    title: "07:00 - 13:00",
    resource: 5,
    slot: 1,
  },
  {
    start: "2024-02-15T07:00",
    end: "2024-02-15T13:00",
    title: "07:00 - 13:00",
    resource: 6,
    slot: 1,
  },
  {
    start: "2024-02-15T12:00",
    end: "2024-02-15T18:00",
    title: "12:00 - 18:00",
    resource: 2,
    slot: 2,
  },
  {
    start: "2024-02-15T12:00",
    end: "2024-02-15T18:00",
    title: "12:00 - 18:00",
    resource: 4,
    slot: 2,
  },
  {
    start: "2024-02-16T07:00",
    end: "2024-02-16T13:00",
    title: "07:00 - 13:00",
    resource: 1,
    slot: 1,
  },
  {
    start: "2024-02-16T07:00",
    end: "2024-02-16T13:00",
    title: "07:00 - 13:00",
    resource: 5,
    slot: 1,
  },
  {
    start: "2024-02-16T12:00",
    end: "2024-02-16T18:00",
    title: "12:00 - 18:00",
    resource: 2,
    slot: 2,
  },
  {
    start: "2024-02-16T12:00",
    end: "2024-02-16T18:00",
    title: "12:00 - 18:00",
    resource: 3,
    slot: 2,
  },
  {
    start: "2024-02-16T12:00",
    end: "2024-02-16T18:00",
    title: "12:00 - 18:00",
    resource: 6,
    slot: 2,
  },
];

const mySlots = [
  {
    id: 1,
    name: "MORNING",
  },
  {
    id: 2,
    name: "AFTERNOON",
  },
  {
    id: 3,
    name: "MIDNIGHT",
  },
];

const myInvalid = [
  {
    start: "2024-02-15T00:00",
    end: "2024-02-15T23:59",
    resource: 4,
    slot: 1,
  },
  {
    start: "2024-02-13T00:00",
    end: "2024-02-13T23:59",
    resource: 2,
    slot: 2,
  },
];

const viewSettings = {
  timeline: {
    type: "month",
    eventList: true,
    size: 1,
    resolutionHorizontal: "day",
    maxEventStack: 3,
  },
};

const responsivePopup = {
  medium: {
    display: "center",
    width: 400,
    fullScreen: false,
    touchUi: false,
    showOverlay: false,
  },
};

export default function TestCalendar() {
  const [shifts, setShifts] = useState(defaultShifts);
  const [tempShift, setTempShift] = useState(null);
  const [start, startRef] = useState(null);
  const [end, endRef] = useState(null);
  const [min, setMinTime] = useState("");
  const [max, setMaxTime] = useState("");
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [headerText, setHeader] = useState("");
  const [shiftDate, setDate] = useState([]);
  const [shiftNotes, setNotes] = useState("");
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);

  //handle edit schedule button
  const [isHeadEdit, setIsHeadEdit] = useState(false);
  const handleHeadEdit = () => {
    setIsHeadEdit((prevState) => !prevState);
  };

  const {
    authUser: { positionId },
  } = useAuth();

  const saveEvent = useCallback(() => {
    const start = new Date(shiftDate[0]);
    const end = new Date(shiftDate[1]);
    const newEvent = {
      id: tempShift.id,
      title: formatDate("HH:mm", start) + " - " + formatDate("HH:mm", end),
      notes: shiftNotes,
      start: start,
      end: end,
      resource: tempShift.resource,
      slot: tempShift.slot,
    };
    if (isEdit) {
      // update the event in the list
      const index = shifts.findIndex((x) => x.id === tempShift.id);
      const newEventList = [...shifts];

      newEventList.splice(index, 1, newEvent);
      setShifts(newEventList);
    } else {
      // add the new event to the list
      setShifts([...shifts, newEvent]);
    }
    // close the popup
    setPopupOpen(false);
  }, [isEdit, shifts, shiftNotes, tempShift, shiftDate]);

  const deleteEvent = useCallback(
    (event) => {
      setShifts(shifts.filter((item) => item.id !== event.id));
      setTempShift(event);
    },
    [shifts]
  );

  const loadPopupForm = useCallback((event) => {
    setDate([event.start, event.end]);
    setNotes(event.notes);
  }, []);

  // handle popup form changes
  const notesChange = useCallback((ev) => {
    setNotes(ev.target.value);
  }, []);

  const onDeleteClick = useCallback(() => {
    deleteEvent(tempShift);
    setPopupOpen(false);
    setSnackbarOpen(true);
  }, [deleteEvent, tempShift]);

  // scheduler options
  const handleEventClick = useCallback(
    (args) => {
      const event = args.event;
      const resource = staff.find((r) => r.id === event.resource);
      const slot = mySlots.find((s) => s.id === event.slot);
      setHeader(
        "<div>Edit " +
          resource.name +
          '\'s hours</div><div class="employee-shifts-day">' +
          formatDate("DDDD", new Date(event.start)) +
          " " +
          slot.name +
          "," +
          formatDate("DD MMMM YYYY", new Date(event.start)) +
          "</div>"
      );
      setMinTime(event.slot === 1 ? "07:00" : "12:00");
      setMaxTime(event.slot === 1 ? "13:00" : "18:00");
      setEdit(true);
      setTempShift({ ...event });
      // fill popup form with event data
      loadPopupForm(event);
      setPopupOpen(true);
    },
    [loadPopupForm]
  );

  const handleEventCreated = useCallback(
    (args) => {
      const event = args.event;
      const slot = mySlots.find((s) => s.id === event.slot);
      setHeader(
        '<div>New shift</div><div class="employee-shifts-day">' +
          formatDate("DDDD", new Date(event.start)) +
          " " +
          slot.name +
          "," +
          formatDate("DD MMMM YYYY", new Date(event.start)) +
          "</div>"
      );
      setEdit(false);
      setMinTime(event.slot === 1 ? "07:00" : "12:00");
      setMaxTime(event.slot === 1 ? "13:00" : "18:00");
      setTempShift(event);
      // fill popup form with event data
      loadPopupForm(event);
      // open the popup
      setPopupOpen(true);
    },
    [loadPopupForm]
  );

  const handleEventDeleted = useCallback(
    (args) => {
      deleteEvent(args.event);
    },
    [deleteEvent]
  );

  // popup options
  const popupButtons = useMemo(() => {
    if (isEdit) {
      return [
        "cancel",
        {
          handler: () => {
            saveEvent();
          },
          keyCode: "enter",
          text: "Save",
          cssClass: "mbsc-popup-button-primary",
        },
      ];
    } else {
      return [
        "cancel",
        {
          handler: () => {
            saveEvent();
          },
          keyCode: "enter",
          text: "Add",
          cssClass: "mbsc-popup-button-primary",
        },
      ];
    }
  }, [isEdit, saveEvent]);

  const onPopupClose = useCallback(() => {
    if (!isEdit) {
      // refresh the list, if add popup was canceled, to remove the temporary event
      setShifts([...shifts]);
    }
    setPopupOpen(false);
  }, [isEdit, shifts]);

  const handleExtendDefaultEvent = useCallback((args) => {
    const d = args.start;
    const start = new Date(
      d.getFullYear(),
      d.getMonth(),
      d.getDate(),
      args.slot === 1 ? 7 : 12
    );
    const end = new Date(
      d.getFullYear(),
      d.getMonth(),
      d.getDate(),
      args.slot === 1 ? 13 : 18
    );

    return {
      title: formatDate("HH:mm", start) + " - " + formatDate("HH:mm", end),
      start: start,
      end: end,
      resource: args.resource,
    };
  }, []);

  const renderMyResource = useCallback(
    (resource) => (
      <div className="employee-shifts-cont">
        <div className="employee-shifts-name">{resource.name}</div>
        <div className="employee-shifts-title">{resource.title}</div>
        {/* <div className="employee-shifts-mobile">Tel: {resource.mobile}</div> */}
        <img
          className="employee-shifts-avatar"
          src={resource.img}
          alt="Avatar"
        />
      </div>
    ),
    []
  );

  const dateChange = useCallback((args) => {
    setDate(args.value);
  }, []);

  const handleSnackbarClose = useCallback(() => {
    setSnackbarOpen(false);
  }, []);

  return (
    <div>
      {positionId === 1 && (
        <Button
          color={!isHeadEdit ? "primary" : "success"}
          onClick={handleHeadEdit}
        >
          {!isHeadEdit ? "Edit schedule" : "Complete"}
        </Button>
      )}
      <Eventcalendar
        view={viewSettings}
        data={shifts}
        resources={staff}
        slots={mySlots}
        // invalid={myInvalid}
        dragToCreate={false}
        dragToResize={false}
        dragToMove={false}
        clickToCreate={isHeadEdit && true}
        extendDefaultEvent={handleExtendDefaultEvent}
        onEventClick={isHeadEdit && handleEventClick}
        onEventCreated={isHeadEdit && handleEventCreated}
        onEventDeleted={handleEventDeleted}
        renderResource={renderMyResource}
        cssClass="md-employee-shifts"
      />
      <Popup
        display="bottom"
        fullScreen={true}
        contentPadding={false}
        headerText={headerText}
        buttons={popupButtons}
        isOpen={isPopupOpen}
        onClose={onPopupClose}
        responsive={responsivePopup}
        cssClass="employee-shifts-popup"
      >
        <div className="mbsc-form-group">
          <Input ref={startRef} dropdown={true} label="Shift start"></Input>
          <Input ref={endRef} dropdown={true} label="Shift end"></Input>
          <Datepicker
            select="range"
            controls={["time"]}
            startInput={start}
            endInput={end}
            display="anchored"
            showRangeLabels={false}
            touchUi={false}
            onChange={dateChange}
            value={shiftDate}
            stepMinute={30}
            timeWheels="|h:mm A|"
            minTime={min}
            maxTime={max}
          />
        </div>
        <div className="mbsc-form-group">
          <Textarea label="Notes" value={shiftNotes} onChange={notesChange} />
        </div>
        {isEdit && (
          <div className="mbsc-button-group">
            <Button
              className="mbsc-button-block"
              color="danger"
              variant="outline"
              onClick={onDeleteClick}
            >
              Delete shift
            </Button>
          </div>
        )}
      </Popup>
      <Snackbar
        message="Event deleted"
        isOpen={isSnackbarOpen}
        onClose={handleSnackbarClose}
        button={{
          action: () => {
            setShifts((prevEvents) => [...prevEvents, tempShift]);
          },
          text: "Undo",
        }}
      />
    </div>
  );
}
