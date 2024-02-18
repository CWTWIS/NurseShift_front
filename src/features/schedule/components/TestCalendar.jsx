import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import {
  Button,
  Datepicker,
  Eventcalendar,
  formatDate,
  Input,
  OptionsProvider,
  Popup,
  Select,
  setOptions,
  Snackbar,
  Textarea,
  Dropdown,
} from "@mobiscroll/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

import profileImage from "../../../assets/profileImage.png";
import useAuth from "../../../hook/use-auth";
import useShift from "../../../hook/ีuse-shift";
import * as shiftApi from "../../../api/shift";

setOptions({
  theme: "ios",
  themeVariant: "light",
});

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
  const {
    authUser: { positionId },
  } = useAuth();
  const { shiftType, nurses, createShift, editShift, deleteShift } = useShift();

  const [shifts, setShifts] = useState([]);
  const [tempShift, setTempShift] = useState(null);
  // const [start, startRef] = useState(null);
  // const [end, endRef] = useState(null);
  // const [min, setMinTime] = useState("");
  // const [max, setMaxTime] = useState("");
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [headerText, setHeader] = useState("");
  const [shiftDate, setDate] = useState([]);
  // const [shiftNotes, setNotes] = useState("");
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);

  //handle edit schedule button
  const [isHeadEdit, setIsHeadEdit] = useState(false);
  const handleHeadEdit = () => {
    setIsHeadEdit((prevState) => !prevState);
  };

  //handle change select shiftType
  const [selectedShiftType, setSelectedShiftType] = useState("");
  const handleShiftTypeChange = (e) => {
    // console.log("option selected value", e.target.value);
    setSelectedShiftType(e.target.value);
  };

  const getShiftTypeTitle = () => {
    // console.log("shiftType", shiftType);
    // console.log("selectedShiftType", selectedShiftType);
    // console.log(selectedShiftType);
    // console.log(selectedShiftType);
    // if (!selectedShiftType) return "";
    const selectedType = shiftType.find((el) => el.id === +selectedShiftType);
    console.log("Selected shift type:", selectedType);
    return selectedType && selectedType.typeOfShift;
  };

  const saveEvent = useCallback(async () => {
    //check if user is really select type of shift
    if (!selectedShiftType) {
      toast.error("Please select a shift type");
      return;
    }

    const start = new Date(shiftDate[0]);
    const end = new Date(shiftDate[1]);
    const newEvent = {
      id: tempShift.id,
      title: getShiftTypeTitle(),
      // shiftType.find((el) => el.id === parseInt(selectedShiftType)).typeOfShift,
      // formatDate("HH:mm", start)
      // + " - "
      // + formatDate("HH:mm", end)
      // notes: shiftNotes,
      start: start,
      shiftTypeId: parseInt(selectedShiftType),
      // end: end,
      resource: tempShift.resource,
      userId: tempShift.resource,
      // slot: tempShift.slot,
    };
    if (isEdit) {
      const updatedShifts = shifts.map((shift) =>
        shift.id === tempShift.id ? newEvent : shift
      );
      setShifts(updatedShifts);

      // update the event in the list
      // const index = shifts.findIndex((x) => x.id === tempShift.id);
      // const newEventList = [...shifts];

      // newEventList.splice(index, 1, newEvent);
      // setShifts(newEventList);
      // console.log(shifts);
    } else {
      // add the new event to the list
      // setShifts([...shifts, newEvent]);

      console.log(newEvent);
      setShifts((prevShifts) => [...prevShifts, newEvent]);
      createShift(newEvent);
    }
    // close the popup
    setPopupOpen(false);
  }, [
    isEdit,
    shifts,
    // shiftNotes
    tempShift,
    shiftDate,
    selectedShiftType,
    // getShiftTypeTitle,
  ]);

  const deleteEvent = useCallback(
    (event) => {
      setShifts(shifts.filter((item) => item.id !== event.id));
      setTempShift(event);
    },
    [shifts]
  );

  const loadPopupForm = useCallback((event) => {
    setDate([event.start, event.end]);
    // setNotes(event.notes);
  }, []);

  // handle popup form changes
  const notesChange = useCallback((ev) => {
    // setNotes(ev.target.value);
  }, []);

  const onDeleteClick = useCallback(() => {
    deleteEvent(tempShift);
    console.log("tempShift", tempShift);
    deleteShift(tempShift.id);
    setPopupOpen(false);
    setSnackbarOpen(true);
  }, [deleteEvent, tempShift]);

  // scheduler options
  const handleEventClick = useCallback(
    (args) => {
      const event = args.event;
      // const resource = nurses.find((r) => r.id === event.resource);
      // const slot = mySlots.find((s) => s.id === event.slot);
      setHeader(
        "<div>Edit " +
          // resource.firstName +
          '</div><div class="employee-shifts-day">' +
          formatDate("DDDD", new Date(event.start)) +
          " " +
          // slot.name +
          "," +
          formatDate("DD MMMM YYYY", new Date(event.start)) +
          "</div>"
      );
      // setMinTime(event.slot === 1 ? "07:00" : "12:00");
      // setMaxTime(event.slot === 1 ? "13:00" : "18:00");
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
      // const slot = mySlots.find((s) => s.id === event.slot);
      setHeader(
        '<div>New shift</div><div class="employee-shifts-day">' +
          formatDate("DDDD", new Date(event.start)) +
          " " +
          // slot.name +
          "," +
          formatDate("DD MMMM YYYY", new Date(event.start)) +
          "</div>"
      );
      setEdit(false);
      // setMinTime(event.slot === 1 ? "07:00" : "12:00");
      // setMaxTime(event.slot === 1 ? "13:00" : "18:00");
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

  const renderMyResource = useCallback(
    (resource) => (
      <div className="employee-shifts-cont">
        <div className="employee-shifts-name">
          {resource.firstName} {resource.lastName}
        </div>
        <div className="employee-shifts-title">
          {resource.position.typeOfPosition} NURSE
        </div>
        {/* <div className="employee-shifts-mobile">Tel: {resource.mobile}</div> */}
        <img
          className="employee-shifts-avatar"
          src={resource.img || profileImage}
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

  useEffect(() => {
    const get = async () => {
      const shiftsData = await shiftApi.fetchShiftsByDepartmentId();
      const mappedShifts = shiftsData.data.shifts.map((shift) => ({
        id: shift.id,
        date: new Date(shift.date),
        title: shift.shiftType.typeOfShift,
        resource: shift.userId,
      }));
      setShifts(mappedShifts);
      console.log(shifts);
      // setShifts(shiftsData.data.shifts);
    };
    get();
  }, [nurses, selectedShiftType, shiftType]);

  return (
    <div>
      <div>
        <p className="underline">Shift type</p>{" "}
        {shiftType.map((el) => el.typeOfShift + " ")}
        <p className="underline">Nurses in the same department</p>{" "}
        {nurses.map((el) => el.firstName + " ")}
        <p className="underline">Shifts from same department</p>{" "}
        {shifts.map((el) => el.id + " ")}
      </div>
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
        resources={nurses}
        dragToCreate={false}
        dragToResize={false}
        dragToMove={false}
        clickToCreate={isHeadEdit && true}
        // extendDefaultEvent={handleExtendDefaultEvent}
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
          {/* <select onChange={handleShiftTypeChange} value={selectedShiftType}>
            {shiftType.map((el) => (
              <option key={el.id} value={el.id}>
                {el.typeOfShift}
              </option>
            ))}
          </select> */}
          <Dropdown
            label="Choose"
            onChange={handleShiftTypeChange}
            value={selectedShiftType}
          >
            <option disabled value="" />
            {shiftType.map((el) => (
              <option key={el.id} value={el.id}>
                {el.typeOfShift}
              </option>
            ))}
          </Dropdown>
          {/* <Input ref={startRef} dropdown={true} label="Shift start"></Input> */}
          {/* <Input ref={endRef} dropdown={true} label="Shift end"></Input> */}
          {/* <Datepicker
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
          /> */}
        </div>
        {/* <div className="mbsc-form-group">
          <Textarea label="Notes" value={shiftNotes} onChange={notesChange} />
        </div> */}
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
