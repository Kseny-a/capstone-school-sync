import { Dropdown, Header, Menu } from "semantic-ui-react";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import { useState, useEffect, useCallback, useRef } from "react";
import { QueryOptions } from "../../../types/query";
import { useAppSelector } from "../../../store/store";

type Props = {
  setQuery: (query: QueryOptions[]) => void;
};

// Grade options for the dropdown
const gradeOptions = [
  { key: "kindergarten", text: "Kindergarten", value: "kindergarten" },
  { key: 1, text: "1st Grade", value: "1st" },
  { key: 2, text: "2nd Grade", value: "2nd" },
  { key: 3, text: "3rd Grade", value: "3rd" },
  { key: 4, text: "4th Grade", value: "4th" },
  { key: 5, text: "5th Grade", value: "5th" },
  { key: 6, text: "6th Grade", value: "6th" },
];

const EventFilter = ({ setQuery }: Props) => {
  const [filter, setFilter] = useState("all");
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
  const startDate = useRef(new Date())
  const {currentUser} = useAppSelector(state => state.auth)

  const updateQuery = useCallback(() => {
    let query: QueryOptions[] = [];

    if (filter === "grade" && selectedGrade) {
      query.push({ attribute: "grade", operator: "==", value: selectedGrade });
    }

    setQuery(query);
  }, [filter, selectedGrade, setQuery]);

  useEffect(() => {
    updateQuery();
  }, [selectedGrade, filter, updateQuery]);

  const handleSetFilter = (filter: string) => {
    if (!currentUser?.uid) return 
    let query: QueryOptions[]

    console.log(currentUser.uid)
    switch (filter) {
      case 'isGoing':
        query = [
          {attribute: 'attendeeIds', operator: 'array-contains', value: currentUser.uid},
          {attribute: 'date', operator: '>=', value: startDate.current}
        ] 
        break

        case 'isHost':
          query = [
            {attribute: 'hostUid', operator: '==', value: currentUser.uid},
            {attribute: 'date', operator: '>=', value: startDate.current}
          ]
          break

        default: 
          query = [
            {attribute: 'date', operator: '>=', value: startDate.current}
          ]
          break
    }
    setFilter(filter)
    setQuery(query)
    }

  return (
    <>
      <Menu style={{ width: "100%" }} vertical size="large">
        <Header attached color="teal" content="Filters" icon='filter'/>
        <Menu.Item 
          content="All events" 
          onClick={() => handleSetFilter("all")} 
          active={filter === 'all'}
        />

        <Menu.Item 
          content="Attending" 
          onClick={() => handleSetFilter("isGoing")} 
          active={filter === 'isGoing'}
        />

        <Menu.Item 
          content="Hosting" 
          onClick={() => handleSetFilter("isHost")} 
          active={filter === 'isHost'}
        />

      </Menu>
      <Menu style={{ width: "100%" }} vertical size="large">
        <Header icon="filter" attached color="teal" content="Grade" />       
          <Dropdown
            placeholder="Select Grade"
            clearable
            fluid
            selection
            options={gradeOptions}
            value={selectedGrade || ""}
            onChange={({}, { value }) => {
              setSelectedGrade(value as string) //update selected grade
              setFilter("grade") // set filter to grade
            }}
          />
        
        </Menu>

      <Header icon="calendar" attached color="teal" content="Select date" />
      <Calendar 
        onChange={date => {
          startDate.current = date as Date
          handleSetFilter(filter)
        }}
        value={startDate.current}
      />
    </>
  );
}

export default EventFilter