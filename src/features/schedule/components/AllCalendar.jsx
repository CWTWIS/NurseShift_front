import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import {
  Button,
  Eventcalendar,
  formatDate,
  Popup,
  setOptions,
  Dropdown,
} from "@mobiscroll/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import profileImage from "../../../assets/profileImage.png";
import useAuth from "../../../hook/use-auth";
import useShift from "../../../hook/ีuse-shift";
import * as shiftApi from "../../../api/shift";
import ButtonComponent from "../../../components/Button";
import Avatar from "../../../components/Avatar";

setOptions({
  theme: "material",
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
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [headerText, setHeader] = useState("");
  const [shiftDate, setDate] = useState([]);

  //handle edit schedule button
  const [isHeadEdit, setIsHeadEdit] = useState(false);
  const handleHeadEdit = () => {
    setIsHeadEdit((prevState) => !prevState);
  };

  //handle change select shiftType
  const [selectedShiftType, setSelectedShiftType] = useState("");
  const handleShiftTypeChange = (e) => {
    setSelectedShiftType(e.target.value);
  };

  //handle navigate to profile
  const navigate = useNavigate();

  const getShiftTypeTitle = () => {
    const selectedType = shiftType.find((el) => el.id === +selectedShiftType);
    console.log("Selected shift type:", selectedType);
    return selectedType && selectedType.typeOfShift;
  };

  const saveEvent = useCallback(() => {
    //check if user is really select type of shift
    if (!selectedShiftType) {
      toast.error("Please select a shift type");
      return;
    }

    const start = new Date(shiftDate[0]);
    console.log(start);
    console.log(tempShift);
    const end = new Date(shiftDate[1]);
    const newEvent = {
      id: tempShift.id,
      title: getShiftTypeTitle(),
      start: tempShift.date || start,
      shiftTypeId: parseInt(selectedShiftType),
      resource: tempShift.resource,
      userId: tempShift.resource,
      color:
        parseInt(selectedShiftType) === 1
          ? "#FFF59D"
          : parseInt(selectedShiftType) === 2
          ? "orange"
          : "#1A237E",
    };
    if (isEdit) {
      editShift(newEvent.id, newEvent);
      setShifts((prevShifts) =>
        prevShifts.map((shift) =>
          shift.id === tempShift.id ? newEvent : shift
        )
      );
    } else {
      // add the new event to the list
      createShift(newEvent);
      setShifts((prevShifts) => [...prevShifts, newEvent]);
    }
    // close the popup
    setPopupOpen(false);
  }, [isEdit, shifts, tempShift, shiftDate, selectedShiftType]);

  const deleteEvent = useCallback(
    (event) => {
      setShifts(shifts.filter((item) => item.id !== event.id));
      setTempShift(event);
    },
    [shifts]
  );

  const loadPopupForm = useCallback((event) => {
    setDate([event.start, event.end]);
  }, []);

  const onDeleteClick = useCallback(() => {
    deleteEvent(tempShift);
    console.log("tempShift", tempShift);
    deleteShift(tempShift.id);
    setPopupOpen(false);
  }, [deleteEvent, tempShift]);

  // scheduler options
  const handleEventClick = useCallback(
    (args) => {
      const event = args.event;
      setHeader("<div>Edit " + "</div>");
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
      setHeader(
        '<div>New shift</div><div class="employee-shifts-day">' +
          formatDate("DDDD", new Date(event.start)) +
          " " +
          "," +
          formatDate("DD MMMM YYYY", new Date(event.start)) +
          "</div>"
      );
      setEdit(false);
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
      <div className="employee-shifts-cont gap-2">
        <div className="flex justify-center items-center">
          <Avatar
            className="employee-shifts-avatar"
            role="button"
            src={resource.profileImage || profileImage}
            alt="Avatar"
            onClick={() => {
              navigate(`/personal/${resource.id}`);
            }}
            onHover="hover:cursor-pointer"
          ></Avatar>
        </div>
        <div>
          <div
            className="employee-shifts-name hover:underline hover:cursor-pointer"
            onClick={() => {
              navigate(`/personal/${resource.id}`);
            }}
          >
            {resource.firstName} {resource.lastName}
          </div>
          <div className="employee-shifts-title">
            {resource.position.typeOfPosition} NURSE
          </div>
          <div className="employee-shifts-mobile">Tel: {resource.mobile}</div>
        </div>
      </div>
    ),
    []
  );

  useEffect(() => {
    const get = async () => {
      const shiftsData = await shiftApi.fetchShiftsByDepartmentId();
      const mappedShifts = shiftsData.data.shifts.map((shift) => ({
        id: shift.id,
        date: new Date(shift.date).setHours(0, 0, 0, 0),
        title: shift.shiftType.typeOfShift,
        color:
          shift.shiftType.id === 1
            ? "#FFF59D"
            : shift.shiftType.id === 2
            ? "orange"
            : "#1A237E",
        resource: shift.userId,
      }));
      setShifts(mappedShifts);
    };
    get();
  }, [nurses, selectedShiftType, shiftType, tempShift]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-end">
        {positionId === 1 && (
          <ButtonComponent
            bg={!isHeadEdit ? "blue" : "green"}
            onClick={handleHeadEdit}
            color="white"
          >
            {!isHeadEdit ? "Edit schedule" : "Complete"}
          </ButtonComponent>
        )}
      </div>
      <Eventcalendar
        view={viewSettings}
        data={shifts}
        resources={nurses}
        dragToCreate={false}
        dragToResize={false}
        dragToMove={false}
        clickToCreate={isHeadEdit && true}
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
    </div>
  );
}
