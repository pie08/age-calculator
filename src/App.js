import { useState } from "react";

export default function App() {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [age, setAge] = useState({});
  const [formError, setFormError] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    const curDate = new Date(Date.now());
    const userDate = new Date(year, month - 1, day);

    if (day > 31 || !day)
      return setFormError({
        type: "day",
        message: "Invalid day",
      });
    if (month > 12 || !month)
      return setFormError({
        type: "month",
        message: "Invalid month",
      });
    if (curDate - userDate <= 0 || !year)
      return setFormError({
        type: "year",
        message: "Invalid year",
      });

    // Calculate age
    const diffMs = curDate - userDate;
    // milliseconds from epoch
    const ageDate = new Date(diffMs);

    setAge({
      years: ageDate.getFullYear() - 1970,
      months: ageDate.getMonth(),
      days: ageDate.getDate(),
    });
    setFormError(null);
  }

  return (
    <div className="calculator">
      <InputForm onSubmit={handleSubmit}>
        <FormGroup
          type="day"
          state={day}
          onSetState={setDay}
          placeholder="DD"
          formError={formError}
        />

        <FormGroup
          type="month"
          state={month}
          onSetState={setMonth}
          placeholder="MM"
          formError={formError}
        />

        <FormGroup
          type="year"
          state={year}
          onSetState={setYear}
          placeholder="YYYY"
          formError={formError}
        />
      </InputForm>
      <DisplayAge age={age} />
    </div>
  );
}

function InputForm({ children, onSubmit }) {
  return (
    <form className="calculator__form" onSubmit={onSubmit}>
      {children}

      <span className="line">&nbsp;</span>

      <button className="btn">
        <img src="./assets/images/icon-arrow.svg" alt="arrow icon" />
      </button>
    </form>
  );
}

function FormGroup({ placeholder, formError, type, state, onSetState }) {
  return (
    <div className="form__group">
      <label for={type}>
        {type.slice(0, 1).toUpperCase().concat(type.slice(1))}
      </label>
      <input
        type="number"
        id={type}
        placeholder={placeholder}
        value={state}
        onChange={(e) =>
          onSetState(+e.target.value !== 0 ? e.target.value : "")
        }
        style={formError?.type === type ? { border: "1px solid red" } : {}}
      />
      {formError?.type === type && <p className="error">{formError.message}</p>}
    </div>
  );
}

function DisplayAge({ age }) {
  return (
    <div className="calculator__display-age">
      <h1>
        <span className="calculator__age-number">
          {age.years >= 0 ? age.years : "--"}
        </span>{" "}
        Years
      </h1>

      <h1>
        <span className="calculator__age-number">
          {age.months >= 0 ? age.months : "--"}
        </span>{" "}
        Months
      </h1>

      <h1>
        <span className="calculator__age-number">
          {age.days >= 0 ? age.days : "--"}
        </span>{" "}
        Days
      </h1>
    </div>
  );
}
