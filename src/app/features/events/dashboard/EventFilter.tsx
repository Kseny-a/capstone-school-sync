import { Dropdown, Header, Menu } from "semantic-ui-react";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import { useState, useEffect, useCallback } from "react";
import { QueryOptions } from "../../../types/query";

type Props = {
  setQuery: (query: QueryOptions[]) => void;
};

export default function EventFilter({ setQuery }: Props) {
  const [filter, setFilter] = useState("all");
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);

  const updateQuery = useCallback(() => {
    let q: QueryOptions[] = [];

    if (filter === "grade" && selectedGrade) {
      q.push({ attribute: "grade", operator: "==", value: selectedGrade });
    }

    setQuery(q);
  }, [filter, selectedGrade, setQuery]);

  useEffect(() => {
    updateQuery();
  }, [selectedGrade, filter, updateQuery]);

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

  return (
    <>
      <Menu style={{ width: "100%" }} vertical size="large">
        <Header attached color="teal" content="Filters" />
        <Menu.Item content="All events" onClick={() => setFilter("all")} />
        <Menu.Item content="Grade" onClick={() => setFilter("grade")} />
        {filter === "grade" && (
        <Dropdown
          placeholder="Select Grade"
          clearable
          fluid
          selection
          options={gradeOptions}
          value={selectedGrade || ""}
          onChange={({}, { value }) => setSelectedGrade(value as string)}
        />
      )}
      </Menu>

      

      <Header icon="calendar" attached color="teal" content="Select date" />
      <Calendar onChange={(date) => console.log(date)} />
    </>
  );
}
